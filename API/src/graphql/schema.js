const SCHEMA = `
type Query {
  test: String!
}


schema {
  query: Query
}
`;

module.exports = SCHEMA;