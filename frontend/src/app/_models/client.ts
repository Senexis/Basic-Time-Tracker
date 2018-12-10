import { User } from './user';

export class Client {
    _id: string;
    author: User;
    linked_users: [User];
    name: string;
    color: string;

    constructor(name: string, color?: string) {
        this.name = name;
        if (color) { this.color = color; }
    }
}
