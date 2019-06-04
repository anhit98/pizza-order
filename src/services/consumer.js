const Kafka = require("node-rdkafka");
const Joi = require('joi');
const orderService = require('../services/order.js');
require('dotenv').config();
var kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  "debug": "generic,broker,security",
  "enable.partition.eof": false
};
const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topics = [`${prefix}updateOrder`];
console.log(topics)
const consumer = new Kafka.KafkaConsumer(kafkaConf);
// console.log("fgrdfgt");
// Flowing mode

// Flowing mode
consumer.connect();
consumer
  .on('ready', function() {
    // Subscribe to the librdtesting-01 topic
    // This makes subsequent consumes read from that topic.
    consumer.subscribe([topics]);
    console.log("grdf");
    // Read one message every 1000 milliseconds
    setInterval(function() {
      consumer.consume(1);
    }, 1000);
  })
  consumer.on('data', async function(data) {
    console.log('Message found!  Contents below.');
        const stringData = data.value.toString();
        const objData = JSON.parse(stringData);

    const updateOrder = await orderService.updateOrderStatus(objData);
    return updateOrder;
    console.log(data.value.toString());
  });
