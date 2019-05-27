

const create = require('../../../src/services/product.js').createProduct;
jest.mock('../../../src/models/product.js', () => ({
    createProduct: (data) => Promise.resolve({
        "_id": '5c6d066ec13e6e002cd89a86',
        "name": "string",
        "image": [
          "string"
        ],
        "categoryId": "string",
        "ingredients": "string",
        "description": "string",
        "styles": [
          "string"
        ],
        "toppings": [
          "string"
        ]
  })
}));

describe('User Route - Test the create user service', () => {
  it('Should create', async () => {
    // jest.setTimeout(30000);
    const res = await create({
      payload: {
        "name": "string",
        "image": [
          "string"
        ],
        "categoryId": "string",
        "ingredients": "string",
        "description": "string",
        "styles": [
          "string"
        ],
        "toppings": [
          "string"
        ]
      }
    });
    expect(res._id).toEqual('5c6d066ec13e6e002cd89a86');
  });
});
