const Kafka = require("node-rdkafka");
const Joi = require('joi');
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
};
const prefix = process.env.CLOUDKARAFKA_USERNAME;
const topics = [`${prefix}.updateStatus`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});
// console.log("fgrdfgt");
// Flowing mode

 
consumer.on("ready", function(arg) {
  
  consumer.subscribe(topics);
  consumer.consume();
  console.log(`Consumer ${arg.name} ready`);
});

consumer.on('data', function(data) {
    console.log(
      "gdfgb"
    );
    // Output the actual message contents
    var temp = JSON.parse(data.value.toString());
    console.log(temp, data.value.toString());
  });
  consumer.on('error', function (err) {
    console.log("Kafka Error: Consumer - " + err);
  });
  consumer.on('event.log', function(log) {
    console.log(log);
  });
  consumer.connect();