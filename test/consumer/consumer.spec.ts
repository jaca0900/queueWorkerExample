import 'jest'
import { ConsumerConnector } from '../../components/consumer/consumer.connector';
 
describe("Message consumer", () => {
    let consumerConnector: ConsumerConnector;

    beforeAll(() => {
        consumerConnector = new ConsumerConnector();
    });

    it("Should fail without a rabbit server setup", async () => {
        await expect(consumerConnector.connect())
            .rejects.toMatchObject({ code: "ECONNREFUSED" });
    });

    it('shoudld have attatchConsumer method', () => {
        expect(consumerConnector.attatchConsumer).toBeDefined();
    });

    it('shoudld fail to attatchConsumer method with no rabbit server', async () => {
        await expect(consumerConnector.attatchConsumer('test1', (message) => message))
            .rejects.toEqual('Queue service not connected');
    });
});