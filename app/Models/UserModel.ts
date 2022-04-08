class UserModel {
    private _name: string;
    private _email: string;
    private _ega: number;

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
}