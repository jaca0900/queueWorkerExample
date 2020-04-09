import { ProducerConnector } from './producer.connector';

export class ProducerController {
    constructor(private connector: ProducerConnector) { }

    public async sendMessage(queue: string, message: any) {
        await this.connector.connect(); 

        return this.connector.sendMessage(queue, message);
    }
}