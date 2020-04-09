import { RabbitConnector } from '../core';

export class ProducerConnector extends RabbitConnector {

    constructor() {
        super();
    }

    public connect() {
        return super.connect();
    }

    public async sendMessage(queue: string, message: any) {
        if (!this.channel) {

            return Promise.reject('Queue service not connected');
        }

        await this.channel.assertQueue(queue, { autoDelete: true });

        return this.channel.sendToQueue(queue, Buffer.from(message));
    }
}