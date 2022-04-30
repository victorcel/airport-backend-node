import Queue from "bull";
import UserModel from "../Models/UserModel";

export default class QueueService {

    private readonly queue;
    private DELAY_DURATION = 60000

    constructor(nameQueue: string) {
        const {REDIS_HOST, REDIS_PORT} = process.env;

        this.queue = new Queue(nameQueue,
            {
                redis: {
                    host: REDIS_HOST,
                    port: Number(REDIS_PORT)
                },
                limiter: {
                    max: 1000,
                    duration:this.DELAY_DURATION
                }
            });
    }

    public handler() {
        this.queue.process((job) => {
            console.log(job);
        });
    }

    public addQueue(userModel: UserModel[]) {
       return  this.queue.add(userModel, {delay: this.DELAY_DURATION});
    }
}