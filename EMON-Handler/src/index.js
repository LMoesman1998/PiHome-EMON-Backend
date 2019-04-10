import mqtt from 'mqtt';
import moment from 'moment';

import { brokerUrl, brokerOptions, meterTopic } from './config';

const client = mqtt.connect(brokerUrl, brokerOptions);
let proceedMQTT = false;

const init = async () => {
    // Connect to DB then set proceedMQTT to true
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
            // Handle message
            // Publish on topic
            // Break
        }
        default: {
            throw new Error('PIHOME-ERROR: This topic isn\'t implemented yet!');
        }
    }
});


