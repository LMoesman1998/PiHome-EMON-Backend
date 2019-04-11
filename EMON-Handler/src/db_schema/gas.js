import mongoose from 'mongoose';

const { Schema } = mongoose;

const gasSchema = new Schema({
  'device type': {
    type: String
  },
  'identifier gas': {
    type: Date
  },
  'value': {
    type: String
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