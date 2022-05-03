import {firebaseService} from "../Services/FirebaseService";
import UserModel from "./UserModel";

export default class TicketModel {
    private _ID!: number | undefined;
    private _listUser!: string[] | undefined;
    private database: FirebaseFirestore.Firestore;

    constructor(ID?: number, listUser?: string[]) {
        this._ID = ID;
        this._listUser = listUser;
        this.database = firebaseService.firestore();
    }


    get ID(): number | undefined {
        return this._ID;
    }

    set ID(value: number | undefined) {
        this._ID = value;
    }

    get listUser(): string[] | undefined {
        return this._listUser;
    }

    set listUser(value: string[] | undefined) {
        this._listUser = value;
    }

    public toJson() {
        return {
            'id': this.ID,
            'listUser': this.listUser,
        };
    }

    public async create(ticket: TicketModel) {

        await this.database.collection('tickets')
            .doc()
            .set(ticket.toJson())
            .catch(console.error);

        new UserModel().abortions(ticket)
    }
}