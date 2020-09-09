
const getGas = async (parent, {from, to, unit}, context, info) => {

  return null;
};

const getLive = async (parent, {from, to, unit}, context, info) => {

  return null;
};

const getMeter = async (parent, {from, to, unit}, context, info) => {

  return null;
};

const RESOLVERS = {
  Query: {
    getGas,
    getLive,
    getMeter
  }
}

module.exports = RESOLVERS;