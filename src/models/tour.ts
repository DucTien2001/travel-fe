import {User} from "./user";

export interface Image {
    src: string;
    alt?: string;
}

export interface Comment {
    user: User;
    comment: string;
    date: Date;
}