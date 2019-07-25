import moment from 'moment';

import { obis } from './emon-obis';
import { insertObject } from './db';
import { gasModel } from './db_schema/gas';
import { meterModel } from './db_schema/meter';
import { liveModel } from './db_schema/live';

const gasItems = ['device_type', 'identifier_gas', 'timestampGas' ,'value'];
const liveItems = ['power_delivered', 'power_returned']

const processLine = (line) => {
  const indexValue = line.indexOf('(');
  const code = line.slice(0, indexValue);
  const value = line.slice(indexValue)
  const info = obis[code];
  if (info === undefined) return;
  const processedLine = info.function(info.functionInfo, value)
  return { key: info.name, value: processedLine };
};

const processTelegram = async (message) => {
  const lines = message.split('\r');
  let telegram = {};
  let gas = {};
  let live = {};
  lines.forEach((line, index) => {
    const value = processLine(line);
    if (value !== undefined && typeof value.value != 'object') telegram[value.key] = value.value;
    else if (value !== undefined && typeof value.value == 'object') telegram = {...telegram, ...value.value};
  });
  delete telegram.undefined;

  gasItems.forEach((item) => {
    gas[item] = telegram[item];
    delete telegram[item];
  });

  gas['timestamp'] = gas['timestampGas'];
  delete gas['timestampGas'];

  liveItems.forEach((item) => {
    live[item] = telegram[item];
    delete telegram[item];
  });

  live['identifier'] = telegram.identifier;
  live['timestamp'] = telegram.timestamp;
  gas['identifier'] = telegram.identifier;
  //console.log(moment(telegram.timestamp).seconds());
  const updateLive = (moment(telegram.timestamp).seconds() % 10 == 2);
  const updateMeter = (moment(telegram.timestamp).seconds() % 30 == 0);
  const updateGas = (moment(telegram.timestamp).minutes() % 5 == 1) && (moment(telegram.timestamp).seconds() == 1);

  if (updateLive) {
    console.log(telegram.timestamp + ' Update Live!');
    
    await saveData(new liveModel(live));
  }

  if (updateMeter) {
    console.log(telegram.timestamp + ' Update Meter!');
    await saveData(new meterModel(telegram));
  }

  if (updateGas) {
    console.log(telegram.timestamp + ' Update Gas!');
    await saveData(new gasModel(gas));
  }

  return { telegram, gas };
};

const saveData = async (model) => {
  const result = await insertObject(model)
    .catch(error => {
      throw new Error(error.message);
    });
}

module.exports = {
  processTelegram
};