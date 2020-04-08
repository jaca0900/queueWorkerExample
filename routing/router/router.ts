import { Application } from 'express';
import { ProducerRouter } from '../../components/producer/producer.router'

export class Router {
    constructor(private app: Application) { }

    register() {
        const producerRoutes = new ProducerRouter(this.app);

        producerRoutes.register();
    }
}