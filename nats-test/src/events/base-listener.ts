import { Message, Stan } from "node-nats-streaming";
import {Subjects} from './subjects';

// event interface 
interface Event {
    subject: string; 
    data: any;
}
// listener abstract class 
export abstract class Listener <T extends Event>{
/**
 * abstract: 
 *  subject - T['subject']
 *  queueGroupName - string;
 *  onMessage - param (data, msg) - return void 
 *  client 
 *  actWait
 */
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data:T['data'], msg: Message): void;
    private client: Stan; 
    protected ackWait = 5*1000;
/**
 * construtor
 */
    constructor(client:Stan){
        this.client = client;
    }
/**
 * subscriptionOptions
 */
    subscriptionOptions(){
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName)
    }

/**
 * listen - subscribe to a channel 
 */
    listen(){
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );
        subscription.on('message',(msg:Message)=>{
            console.log(`Messagereceived: ${this.subject} / ${this.queueGroupName}`);
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData,msg)
        });

    }
/**
 * parseMessage - extract the message 
 */
parseMessage(msg:Message) {
    const data = msg.getData();
    return typeof data === 'string'
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'));
}

}