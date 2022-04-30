import Queue from "bull";
import UserModel from "../Models/UserModel";

export default class QueueService {

    private readonly queue;

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
                    duration: 60000
                }
            });
    }

    public handler() {
        this.queue.process((job) => {
            console.log(job);
        });
    }

    public addQueue(userModel: UserModel[]) {
        this.queue.add(userModel);
    }
}