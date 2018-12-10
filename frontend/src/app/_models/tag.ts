import { User } from './user';

export class Tag {
    _id: string;
    author: User;
    linked_users: [User];
    name: string;
    color: string;
}
