import Queue from "bull";
import UserModel from "../Models/UserModel";
import milliseconds from "milliseconds";
import CreateTicket from "../UseCases/CreateTicket";
import TicketModel from "../Models/TicketModel";

export default class QueueService {

    private readonly queue;
    private DELAY_DURATION = milliseconds.minutes(1)

    constructor(nameQueue: string) {
        const {REDIS_HOST, REDIS_PORT} = process.env;

        this.queue = new Queue(nameQueue,
            {
                redis: {
                    host: REDIS_HOST,
                    port: Number(REDIS_PORT)
                },
                limiter: {
                    max: 1,
                    duration: 10000
                },
                defaultJobOptions: {
                    removeOnComplete: true
                }
            });
    }

    public process() {
        console.log("inicio");
        this.queue.process((job, done) => {
           let listUser = [];
            for (const user of job.data){
                listUser.push(user._ID)
            }

            let uuid = Math.floor(Math.random() * (99999999 - 99999)) + 1;
            CreateTicket.handler(new TicketModel(uuid,listUser))
            done();
        });
    }

    public addQueue(userModel: UserModel[]) {
        return this.queue.add(userModel);
    }
}