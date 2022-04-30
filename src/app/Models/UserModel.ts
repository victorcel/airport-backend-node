import {firebaseService} from "../Services/FirebaseService";
import {firestore} from "firebase-admin";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export default class UserModel {
    private _ID!: string;
    private _name!: string;
    private _email!: string;
    private _ega!: number;
    private database: FirebaseFirestore.Firestore;


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
            'id': this.ID,
            'name': this._name,
            'ega': this._ega,
            'email': this._email,
            'isBoarded': false,
        };
    }

    public save(userModel: UserModel): boolean {

        this.database.collection('users')
            .doc()
            .set(userModel.toJson())
            .catch((error) => {
                console.log('ERROR SAVE USERS: ' + error.message);
                return false;
            });

        return true
    }

    public async createTicket() {
        const countTicket = 20;

        this.database.collection('users')
            .where("isBoarded", "==", false)
            .limitToLast(10)
            .onSnapshot((data) => {

                let listTickets: { user: UserModel; docID: string; }[][] = [];
                let datos = data.docs.map((value: QueryDocumentSnapshot) => {

                    let user = new UserModel();
                    user.name = value.data().name;
                    user.email = value.data().email;
                    user.ega = value.data().ega;

                    return {
                        user,
                        docID: value.ref.id
                    };

                });
                //
                // const groupTicket = Math.ceil(datos.length / countTicket)
                //
                // data.forEach((value)=>{
                //     console.log(value.ref.id)
                // })

                // for (let i = 0; i < groupTicket; i++) {
                //
                //     let initial = 0
                //     let interval = countTicket;
                //     listTickets.push(datos.slice(initial, interval));
                //    //  let ram = Math.floor(Math.random() * (1000 - 1)) + 1;
                //    //
                //    //  let tickets = datos.slice(initial, interval);
                //    //
                //    // await this.database.collection('tickets').doc().set({
                //    //      ID: ram,
                //    //      users: tickets.map((users) => {
                //    //          return users.docID
                //    //      })
                //    //  })
                //    //  console.log(tickets)
                //     initial += countTicket
                //     interval += countTicket;
                // }

                // console.log(listTickets)
                // listTickets.forEach((tickets) => {
                //
                //     console.log(ram)
                //
                // })

                // data.forEach((doc: QueryDocumentSnapshot) => {
                //     doc.ref.update({
                //         isBoarded: true
                //     })
                // })
            });

    }

}