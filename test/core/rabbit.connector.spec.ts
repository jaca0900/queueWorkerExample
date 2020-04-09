import 'jest'
import { RabbitConnector } from '../../components/core/rabbit.connector';

describe("Message consumer", () => {
    let connector;

    beforeAll(() => {
        connector = new RabbitConnector();
    });

    it('shoudld have connect method', () => {
        expect(connector.connect).toBeDefined()
    });
});