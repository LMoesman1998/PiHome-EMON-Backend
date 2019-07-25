import mongoose from 'mongoose';

const { Schema } = mongoose;

const gasSchema = new Schema({
  'device_type': {
    type: String
  },
  'identifier_gas': {
    type: String
  },
  'identifier': {
    type: String
  },
  'timestamp': {
    type: Date
  },
  'value': {
    type: Number
  }
},
{
  timestamps: false,
  toJSON: {
     transform: (_, item) => {
       delete item._id;
       delete item.__v;
     }
   }
}
);

const gasModel = mongoose.model("gas", gasSchema, "gas");
module.exports = {
  gasModel
}