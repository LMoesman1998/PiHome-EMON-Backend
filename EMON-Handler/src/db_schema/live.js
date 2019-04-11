import mongoose from 'mongoose';

const { Schema } = mongoose;

const liveSchema = new Schema({
  'power delivered': {
    type: Number
  },
  'power returned': {
    type: Number
  },
  'identifier': {
    type: String
  },
  'timestamp': {
    type: Date
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

const liveModel = mongoose.model("live", liveSchema, "live");
module.exports = {
  liveModel
}