// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPrinter = `query GetPrinter($id: ID!) {
  getPrinter(id: $id) {
    id
    name
    ip_address
    status
  }
}
`;
export const listPrinters = `query ListPrinters(
  $filter: ModelPrinterFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrinters(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      ip_address
      status
    }
    nextToken
  }
}
`;
