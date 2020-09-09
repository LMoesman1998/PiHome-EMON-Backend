import mqtt from 'mqtt';
import moment from 'moment';

import * as fs from 'fs';
import { brokerUrl, brokerOptions, meterTopic} from './../../config';
import { connectMongo } from './db';
import { processTelegram } from './emon-handler';

const KEY = fs.readFileSync('../certs/client.key')
const CERT = fs.readFileSync('../certs/client.crt')
const TRUSTED_CA_LIST = fs.readFileSync('../certs/ca.crt')

const tlsOptions = {
    key: KEY,
    cert: CERT,
    ca: TRUSTED_CA_LIST,
    protocol: 'mqtts'
  };
  
  console.log("start")
  
  const client = mqtt.connect(brokerUrl, { ...brokerOptions, ...tlsOptions });
 
let proceedMQTT = true;

const init = async () => {
    await connectMongo()
        .then(result => {
            console.log('PIHOME: Connected to mongodb!');
            proceedMQTT = true;
        })
        .catch(error => {
            throw new Error(error.message);
        });
};

init();

client.on('connect', () => {
    client.subscribe(meterTopic, (error) => {
        if (error) throw new Error(error.message);
    });
});

client.on('message', async (topic, message) => {
    
    if (!proceedMQTT) return;
    switch (topic) {
        case meterTopic: {
            const jsonMessage = JSON.parse(message.toString());
            const processedData = await processTelegram(jsonMessage.telegram);
            //console.log(processedData);
            // Handle message
            // Publish on topic
            break;
        }
        default: {
            throw new Error('PIHOME-ERROR: This topic isn\'t implemented yet!');
        }
    }
});


