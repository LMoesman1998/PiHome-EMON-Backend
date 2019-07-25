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
  'energy_delivered_tariff1': {
    type: Number
  },
  'energy_delivered_tariff2': {
    type: Number
  },
  'energy_returned_tariff1': {
    type: Number
  },
  'energy_returned_tariff2': {
    type: Number
  },
  'tariff': {
    type: Number
  },
  'power_failures': {
    type: Number
  },
  'long_power_failures': {
    type: Number
  },
  'power_failure_log_timestamp': {
    type: Date
  },
  'power_failure_log_value': {
    type: Number
  },
  'voltage_sags_l1': {
    type: Number
  },
  'voltage_sags_l2': {
    type: Number
  },
  'voltage_sags_l3': {
    type: Number
  },
  'voltage_swells_l1': {
    type: Number
  },
  'voltage_swells_l2': {
    type: Number
  },
  'voltage_swells_l3': {
    type: Number
  },
  'message': {
    type: String
  },
  'instantaneous_voltage_l1': {
    type: Number
  },
  'instantaneous_voltage_l2': {
    type: Number
  },
  'instantaneous_voltage_l3': {
    type: Number
  },
  'instantaneous_current_l1': {
    type: Number
  },
  'instantaneous_current_l2': {
    type: Number
  },
  'instantaneous_current_l3': {
    type: Number
  },
  'instantaneous_power_l1_p': {
    type: Number
  },
  'instantaneous_power_l2_p': {
    type: Number
  },
  'instantaneous_power_l3_p': {
    type: Number
  },
  'instantaneous_power_l1_n': {
    type: Number
  },
  'instantaneous_power_l2_n': {
    type: Number
  },
  'instantaneous_power_l3_n': {
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