const kafka = require('kafka-node');
const bp = require('body-parser');
const Joi = require('joi');
const Boom = require('boom');
const validatePayload = {
    status: Joi.string().valid(["submitted", "processed", "delivered", "cancelled"]).required(),
  }
const sendMes = function(req, reply){
    return new Promise(function(resolve, reject) {
    try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient("localhost:2181");
    const producer = new Producer(client);
    const kafka_topic =  req.params.id;
    console.log(kafka_topic);
    const sentMessage = JSON.stringify(req.payload);
    console.log(kafka_topic,sentMessage );
    let payloads = [
        {
        topic: kafka_topic,
        messages: sentMessage
        }
    ];
    producer.on('ready', async function() {
        let push_status = producer.send(payloads, (err, data) => {
        if (err) {
            throw Boom.badRequest(err);
        } else {
            resolve(reply.response(data))
        }
        });
    });

    producer.on('error', function(err) {
        console.log(err);
        console.log('[kafka-producer -> '+kafka_topic+']: connection errored');
        throw err;
    });
    }
    catch(e) {
    console.log(e);
    }
});
}

module.exports = {
    sendMes
  }