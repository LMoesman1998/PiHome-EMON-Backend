import mongoose from 'mongoose';

const { Schema } = mongoose;

const meterSchema = new Schema({
  'version': {
    type: String
  },
  'timestamp': {
    type: Date
  },
  'identifier': {
    type: String
  },
  'energy delivered tariff1': {
    type: Number
  },
  'energy delivered tariff2': {
    type: Number
  },
  'energy returned tariff1': {
    type: Number
  },
  'energy returned tariff2': {
    type: Number
  },
  'tariff': {
    type: Number
  },
  'power failures': {
    type: Number
  },
  'long power failures': {
    type: Number
  },
  'power failure log': {
    type: String
  },
  'voltage sags l1': {
    type: Number
  },
  'voltage sags l2': {
    type: Number
  },
  'voltage sags l3': {
    type: Number
  },
  'voltage swells l1': {
    type: Number
  },
  'voltage swells l2': {
    type: Number
  },
  'voltage swells l3': {
    type: Number
  },
  'message': {
    type: String
  },
  'instantaneous voltage l1': {
    type: Number
  },
  'instantaneous voltage l2': {
    type: Number
  },
  'instantaneous voltage l3': {
    type: Number
  },
  'instantaneous current l1': {
    type: Number
  },
  'instantaneous current l2': {
    type: Number
  },
  'instantaneous current l3': {
    type: Number
  },
  'instantaneous power l1 p': {
    type: Number
  },
  'instantaneous power l2 p': {
    type: Number
  },
  'instantaneous power l3 p': {
    type: Number
  },
  'instantaneous power l1 n': {
    type: Number
  },
  'instantaneous power l2 n': {
    type: Number
  },
  'instantaneous power l3 n': {
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

const meterModel = mongoose.model("meter", meterSchema, "meter");
module.exports = {
  meterModel
}