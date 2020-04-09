import 'jest'
import { ProducerConnector } from '../../components/producer/producer.connector';

describe("Message consumer", () => {
    let producerConnector: ProducerConnector;

    beforeAll(() => {
        producerConnector = new ProducerConnector();
    })

    it("Should fail without a rabbit server setup", async () => {
        await expect(producerConnector.connect())
            .rejects.toMatchObject({ code: "ECONNREFUSED" });
    })

    it('Shoudld have sendMessage method', () => {
        expect(producerConnector.sendMessage).toBeDefined()
    })

    it('Shoudld fail to sendMessage method with no rabbit server', async () => {
        await expect(producerConnector.sendMessage('test1', 'test2'))
            .rejects.toEqual("Queue service not connected");
    })
});