import { connect as rabbitMq } from 'amqplib';

export class RabbitConnector {
    protected channel: rabbitMq

    constructor(private rabbitHost) { }

    protected async connect(): Promise<rabbitMq> {
        const connection = await rabbitMq(this.rabbitHost)

        this.channel = await connection.createChannel()
    }
}