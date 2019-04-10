import moment from 'moment';

import { obis } from './emon-obis';

const gasItems = ['device type', 'identifier gas', 'value'];

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
  lastSaved = JSON.parse(lastSaved);

  lines.forEach((line, index) => {
    const value = processLine(line);
    if (value !== undefined) telegram[value.key] = value.value;
  });
  delete telegram.undefined;

  gasItems.forEach((item) => {
    gas[item] = telegram[item];
    delete telegram[item];
  });

  const updateMeter = (moment(telegram.timestamp).seconds() % 30  == 0);
  const updateGas = (moment(telegram.timestamp).minutes() % 5  == 1) && (moment(telegram.timestamp).seconds() == 1);
 
  if (updateMeter) {
    console.log('Update Meter!');
  }

  if (updateGas) {
     console.log('Update Gas!')
  }

  return { telegram, gas };
};

module.exports = {
  processTelegram
};