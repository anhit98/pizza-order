
const create = require('../../../src/services/product.js').createProduct;
jest.mock('../../../src/models/product.js', () => ({
    createProduct: (data) => Promise.resolve({
        "_id": '5c6d066ec13e6e002cd89a86',
        "name": "seafood",
        "image": [
          "pizza.jpg"
        ],
        "categoryId": "5c6d066dc33e6e002cd89a86",
        "ingredients": "shrimp, lettuce",
        "description": "nothing",
        "styles": [
          "5c6d066dc33e6e002cd89a86"
        ],
        "toppings": [
          "5c6d066dc33e6e002cd89a86"
        ]
  })
}));

describe('Product Route - Test the create product service', () => {
  it('Should create', async () => {
    // jest.setTimeout(30000);
    const res = await create({
      payload: {
        "name": "5c6d066ec13e6e002cd89a86",
        "image": [
          "string"
        ],
        "categoryId": "5c6d066ec13e6e002cd89a86",
        "ingredients": "shrimp, lettuce",
        "description": "nothing",
        "styles": [
          "5c6d066dc33e6e002cd89a86"
        ],
        "toppings": [
          "5c6d066dc33e6e002cd89a86"
        ]
      }
    });
    expect(res._id).toEqual('5c6d066ec13e6e002cd89a86');
  });
});
