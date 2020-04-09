import { connect as rabbitMq } from 'amqplib';

export class RabbitConnector {
    protected channel: rabbitMq

    constructor() { }

    protected async connect(): Promise<rabbitMq> {
        const rabbitUrl = `${process.env.RABBIT_HOST || 'amqp://192.168.99.100'}:${process.env.RABBIT_PORT || 5672}`;
        const connection = await rabbitMq(rabbitUrl);

        this.channel = await connection.createChannel()
    }
}