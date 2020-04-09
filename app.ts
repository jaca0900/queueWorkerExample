import * as express from 'express';
import { ConsumerConnector } from './components/consumer/consumer.connector';
import { Router } from './routing/router/router';
import { ThreadUtils } from './components/core';
import { ProducerConnector, ProducerController } from './components/producer';

const app = express();

app.set('port', process.env.PORT || 3000);

const consumerConnector = new ConsumerConnector();
const producerConnector = new ProducerConnector();
const producerController = new ProducerController(producerConnector);

const router = new Router(app, producerConnector);

router.register();

// create async consumer connector since rabbitMq container might not start before the app container
const connectAndAttachConsumer = async () => {
    let attemps = 0;

    while (1) {
        attemps++;
        try {
            await consumerConnector.connect();

            break;
        } catch (err) {
            console.error(`Attempt ${attemps}: Unable to connecto to rabbit mq: ${err.message}`);
            console.error('Connection retry in 5 seconds');

            await ThreadUtils.sleep(5000);
        }
    }

    await consumerConnector.attatchConsumer('mainQueue', function (message) {
        console.log(message.content.toString());

        this.channel.ack(message)
    });
}

const generateMessages = async () => {
    let msgNo = 0
    const interval = parseInt(process.env.GENERATOR_INTERVAL) || 5000;

    while (1) {
        try {
            await producerController.sendMessage('mainQueue', `Message no ${++msgNo}`)

            await ThreadUtils.sleep(interval);
        } catch (err) {
            break;
        }
    }
}

const server = app.listen(app.get('port'), async function () {
    console.log('Express server listening on port ' + server.address().port);

    connectAndAttachConsumer()
        .then(generateMessages)
});
