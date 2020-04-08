import { RabbitConnector } from '../core/rabbit.connector';

export class Producer extends RabbitConnector {

    constructor(queueHost) {
        super(queueHost);
    }

    public async connectToQueueService() {
        await super.connect();
    }

    public async sendMessage(queue: string, message: any) {
        if (!this.channel) {

            return Promise.reject('Queue service not connected');
        }

        await this.channel.assertQueue(queue, { autoDelete: true });

        return this.channel.sendToQueue(queue, Buffer.from(message));
    }
}