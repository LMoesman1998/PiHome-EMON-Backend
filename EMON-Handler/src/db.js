import mongoose from 'mongoose';

import { mongoURL } from './config';

const mongoOptions = {
    useNewUrlParser: true
};

const connectMongo = async () => {
    return await mongoose.connect(mongoURL, mongoOptions)
    .catch(error => {
      throw new Error("PIHOME-ERROR: Connecting to cluster failed!");
    });
};

const insertObject = async (model) => {
    const result = await model.save()
    .catch(error => {
        throw new Error(error.message);
    });
    return result;
}
  
  module.exports = {
    connectMongo,
    insertObject
  };