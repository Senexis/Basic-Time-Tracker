import { Client } from './client';
import { Tag } from './tag';
import { User } from './user';

export class TimeEntry {
    _id: string;
    author: User;
    client: Client;
    tags: [Tag];
    started_at: Date;
    is_running: Boolean;
    paused_at: Date;
    resumed_at: Date;
    ended_at: Date;
    time_worked: number;
    notes: string;
    locked_at: Date;
}
