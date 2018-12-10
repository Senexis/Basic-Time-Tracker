export class User {
    _id: string;
    method: string;
    local: {
        email: string,
        password: string
    };
    name: string;
    color: string;
    token?: string;
}
