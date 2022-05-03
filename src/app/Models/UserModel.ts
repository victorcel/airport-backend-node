import {firebaseService} from "../Services/FirebaseService";
import {firestore} from "firebase-admin";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import TicketModel from "./TicketModel";

export default class UserModel {
    private _ID!: string;
    private _name!: string;
    private _email!: string;
    private _ega!: number;
    private database: FirebaseFirestore.Firestore;

    public WAITING_FOR_FLIGHT = "waiting_for_flight"


    constructor() {
        this.database = firebaseService.firestore();
    }

    get ID(): string {
        return this._ID;
    }

    set ID(value: string) {
        this._ID = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get ega(): number {
        return this._ega;
    }

    set ega(value: number) {
        this._ega = value;
    }

    public toJson() {
        return {
            'id': this._ID,
            'name': this._name,
            'ega': this._ega,
            'email': this._email,
            'isBoarded': false,
        };
    }

    public async save(userModel: UserModel): Promise<boolean> {

        await this.database.collection('users')
            .doc()
            .set(userModel.toJson())
            .catch((error) => {
                console.log('ERROR SAVE USERS: ' + error.message);
                return false;
            });

        return true
    }

    public async waitingForFlight(userModel: UserModel[]) {
        return userModel.map((data) => {
            return this.database.collection(this.WAITING_FOR_FLIGHT).doc().set(data.toJson())
        });
    }

    public async listWaitingForFlight(): Promise<UserModel[]> {
        let userModel: UserModel[] = []
        let data = await this.database.collection(this.WAITING_FOR_FLIGHT).get()

        data.forEach((value: QueryDocumentSnapshot) => {
            let user = new UserModel()
            user.ID = value.data().id;
            user.name = value.data().name;
            user.ega = value.data().ega;
            user.email = value.data().email;
            userModel.push(user)
            value.ref.delete()
        });
        return userModel;
    }

    public abortions(ticket: TicketModel){
       return ticket.listUser?.forEach((id) => {
           this.database.collection('users').where("id", "==", id).get().then((data) => {
               data.forEach((result) => {
                   result.ref.update({
                       isBoarded: true
                   })
               })
           })
       });
    }
}