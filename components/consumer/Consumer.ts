import { RabbitConnector } from "../core/rabbit.connector";

export class Consumer extends RabbitConnector {
    constructor(queueHost) {
        super(queueHost);
    }

    public async connectToQueueService() {
        await super.connect();
    }

    private createListener(consumeMethod): () => void {

        return consumeMethod.bind({ channel: this.channel })
    }

    public async attatchConsumer(queue: string, consumeMethod: (message: any) => void): Promise<void> {
        if (!this.channel) {

            return Promise.reject('Que service not connected');
        }

        await this.channel.assertQueue(queue, {autoDelete: true});

        this.channel.consume(queue, this.createListener(consumeMethod));
    }
}