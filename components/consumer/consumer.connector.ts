import { RabbitConnector } from '../core';

export class ConsumerConnector extends RabbitConnector {
    constructor() {
        super();
    }

    public connect() {
        return super.connect();
    }

    private createListener(consumeMethod): () => void {

        return consumeMethod.bind({ channel: this.channel })
    }

    public async attatchConsumer(queue: string, consumeMethod: (message: any) => void): Promise<void> {
        if (!this.channel) {

            return Promise.reject('Queue service not connected');
        }

        await this.channel.assertQueue(queue, {autoDelete: true});

        this.channel.consume(queue, this.createListener(consumeMethod));
    }
}