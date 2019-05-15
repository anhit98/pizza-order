
const service = require('../services/order.js');

module.exports =[ {
    method: 'POST',
    path: '/order/create',
    config: {
      tags: ['api'],
      // auth: ,
      handler: service.createOrder,
      validate: {
        payload: service.validateOrder
    }
    }
  },
  {
  method: 'PUT',
  path: `/bookings/update/{id}`,
  config: {
    tags: ['api'],
    handler: service.updateBooking
  }},
  {
    method: 'GET',
    path: `/bookings/findByStatus`,
    config: {
      tags: ['api'],
      handler: service.findBookingByStatus
    }},
    {
      method: 'GET',
      path: `/bookings/{bookingId}`,
      config: {
        tags: ['api'],
        handler: service.findBookingById
      }}
]