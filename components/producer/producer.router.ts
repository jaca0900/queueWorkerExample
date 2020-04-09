import { Router, Application, Response, Request } from 'express';
import { json as jsonParser } from 'body-parser';
import { ProducerController } from './producer.controller';

export class ProducerRouter {
    private router: Router;

    constructor(private app: Application, private controller: ProducerController) {
        this.router = Router();
    }

    register() {
        const parser = jsonParser();

        this.router.post('/send', parser, async (req: Request, res: Response) => {
            const { queue, message } = req.body

            try {
                this.controller.sendMessage(queue, message);
            } catch (err) {
                return res.status(500).send(err.message)
            }

            return res.status(200).send('message queued');
        });

        this.app.use('/producer', this.router)
    }
}