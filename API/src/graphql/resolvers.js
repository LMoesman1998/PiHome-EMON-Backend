const test = async (parent, {}, context, info) => {

  return "Hello World"
};

const RESOLVERS = {
  Query: {
    test
  }
}

module.exports = RESOLVERS;