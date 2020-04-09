import 'jest';
import { ProducerConnector } from '../../components/producer/producer.connector';
import { ProducerController } from '../../components/producer/producer.controller';
import { ConsumerConnector } from '../../components/consumer/consumer.connector';
import { ThreadUtils } from '../../components/core/thread.utils';

describe('producer-consumer queue', () => {
    let consumer: ConsumerConnector;
    let producer: ProducerConnector;
    let producerController: ProducerController;

    beforeAll(async () => {
        consumer = new ConsumerConnector();
        producer = new ProducerConnector();
        producerController = new ProducerController(producer);

        let attemps = 0;
        let max = 5

        while (1) {
            attemps++;
            try {
                await consumer.connect();

                break;
            } catch (err) {
                console.error(err.message)
                console.log(attemps, max)
                if (attemps === max) {
                    console.log('break', attemps, max)
                    break;
                }

                await ThreadUtils.sleep(5000);
            }
        }
    });

    it('Should properly send a message and receive one', async () => {
        await consumer.connect()

        await consumer.attatchConsumer('test1', (message) => {
            const content = message.content.toString()

            expect(content).toEqual('IT WORKS');
        })

        await producerController.sendMessage('test1', 'IT WORKS')
    });
})