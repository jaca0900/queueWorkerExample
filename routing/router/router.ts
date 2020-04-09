import { Application } from 'express';
import { ProducerRouter, ProducerController, ProducerConnector } from '../../components/producer';

export class Router {
    constructor(private app: Application, private producerConnector: ProducerConnector) { }

    register() {
        const producerController = new ProducerController(this.producerConnector);

        const producerRoutes = new ProducerRouter(this.app, producerController);

        producerRoutes.register();
    }
}