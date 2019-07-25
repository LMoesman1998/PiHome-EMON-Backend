const SCHEMA = `
type Query {
  getGas(from: String!, to: String!, unit: Unit!): GasData
  getLive(from: String!, to: String!, unit: Unit!): LiveData
  getMeter(from: String!, to: String!, unit: Unit!): MeterData
}

enum Unit {
  MINUTE
  HOUR
  DAY
  MONTH
  YEAR
}

type GasData {
  device_type: String!
  identifier_gas: String!
  identifier: String!
  timestamp: String!
  value: String!
}

type LiveData {
  power_delivered: Float!
  power_returned: Float!
  identifier: String!
  timestamp: String!
}

type MeterData {
  version: String!
  timestamp: String!
  identifier: String!
  energy_delivered_tariff1: Data!
  energy_delivered_tariff2: Data!
  energy_returned_tariff1: Data!
  energy_returned_tariff2: Data!
  tariff: Float!
  power_failures: Float!
  long_power_failures: Float!
  power_failure_log_timestamp: String!
  power_failure_log_value: Float!
  voltage_sags_l1: Float!
  voltage_sags_l2: Float!
  voltage_sags_l3: Float!
  voltage_swells_l1: Float!
  voltage_swells_l2: Float!
  voltage_swells_l3: Float!
  message: String!
  instantaneous_voltage_l1: Float!
  instantaneous_voltage_l2: Float!
  instantaneous_voltage_l3: Float!
  instantaneous_current_l1: Float!
  instantaneous_current_l2: Float!
  instantaneous_current_l3: Float!
  instantaneous_power_l1_p: Float!
  instantaneous_power_l2_p: Float!
  instantaneous_power_l3_p: Float!
  instantaneous_power_l1_n: Float!
  instantaneous_power_l2_n: Float!
  instantaneous_power_l3_n: Float!
}

type Data {
  min: Float!
  max: Float!
  change: Float!
  raw: Float!
}

schema
  query: Query
}
`;

module.exports = SCHEMA;