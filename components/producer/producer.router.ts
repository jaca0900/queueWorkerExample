import { Router, Application, Response, Request } from 'express';
import { Producer } from './producer'
import { json as jsonParser } from 'body-parser';

export class ProducerRouter {
    private router: Router;
    private producer: Producer;

    constructor(private app: Application) {
        this.router = Router();
        this.producer = new Producer(process.env.RABBIT_HOST || 'amqp://192.168.99.100');
    }

    register() {
        const parser = jsonParser();

        this.router.post('/send', parser, async (req: Request, res: Response) => {
            const { message } = req.body
            try {
                await this.producer.connectToQueueService();

                await this.producer.sendMessage('test', message);
            } catch (err) {
                return res.status(500).send(err.message)
            }

            return res.status(200).send('message queued');
        });

        this.app.use('/producer', this.router)
    }
}