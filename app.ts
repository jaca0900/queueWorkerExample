import * as express from 'express';
import { Consumer } from './components/consumer/consumer';
import { Router } from './routing/router/router';

const app = express();

app.set('port', process.env.PORT || 3000);

const router = new Router(app)
const consumer = new Consumer(process.env.RABBIT_HOST || 'amqp://192.168.99.100');

router.register();

const server = app.listen(app.get('port'), async function () {
    console.log('Express server listening on port ' + server.address().port);

    await consumer.connectToQueueService();

    await consumer.attatchConsumer('test', function (message) {
        console.log(message.content.toString())

        this.channel.ack(message)
    });
});
