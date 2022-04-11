import {firebaseService} from "../Services/FirebaseService";

export default class UserModel {
    private _name!: string;
    private _email!: string;
    private _ega!: number;

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
            'name': this._name,
            'ega': this._ega,
            'email': this._email
        };
    }

    public save(userModel: UserModel): boolean {
        const database = firebaseService.firestore();
        database.collection('users')
            .doc()
            .set(userModel.toJson())
            .then((response) => {
                return true;
            }).catch((error) => {
            console.log('ERROR SAVE USERS: ' + error.message);
            return false;
        });
        return false
    }

}