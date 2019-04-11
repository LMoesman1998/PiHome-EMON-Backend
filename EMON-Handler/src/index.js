import mqtt from 'mqtt';
import moment from 'moment';

import { brokerUrl, brokerOptions, meterTopic} from './../../config';
import { connectMongo } from './db';
import { processTelegram } from './emon-handler';

const client = mqtt.connect(brokerUrl, brokerOptions);
let proceedMQTT = false;

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
            console.log(processedData);
            // Handle message
            // Publish on topic
            break;
        }
        default: {
            throw new Error('PIHOME-ERROR: This topic isn\'t implemented yet!');
        }
    }
});


