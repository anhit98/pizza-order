const update = require('../../../services/product');

jest.mock('../../../models/product', () => ({
    updateProduct: data => Promise.resolve({
        
            "name": "5c6d066ec13e6e002cd89a86",
            "image": [
              "5cdf36731c9d440000fe2a1e"
            ],
            "categoryId": "5c64o43ue13e6e002cd894re6",
            "ingredients": "onion, beef, letucce",
            "description": "nothing",
            "styles": [
              "5cdf36731c9d440000fe2a1e"
            ],
            "toppings": [
              "5cdf36731c9d440000fe2a1e"
            ]
          
    })
  }));

  
  describe('Product Service - Test the update product service', () => {
    it('Should update', async () => {
      const id = '5c6d066ec13e6e002cd89a86';
      const res = await update({
        params: { id },
        payload: {
            "name": "5c6d066ec13e6e002cd89a86",
            "image": [
              "5cdf36731c9d440000fe2a1e"
            ],
            "categoryId": "5c64o43ue13e6e002cd894re6",
            "ingredients": "onion, beef, letucce",
            "description": "nothing",
            "styles": [
              "5cdf36731c9d440000fe2a1e"
            ],
            "toppings": [
              "5cdf36731c9d440000fe2a1e"
            ]
        }
      });
      expect(res).toBeInstanceOf(Object);
    });
  });
  