
const getGas = async (parent, {}, context, info) => {

  return null;
};

const getLive = async (parent, {}, context, info) => {

  return null;
};

const getMeter = async (parent, {}, context, info) => {

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