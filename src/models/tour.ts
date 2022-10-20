import {User} from "./user";

export interface Tour {
    id: number;
    src: string;
    title: string;
    description: string;
    businessHours: string;
    location: string;
    contact: string;
    price: number;
    discount?: number;
    tags?: string;
    rate: number;
    creator: string;
    isTemporarilyStopWorking?: boolean;
}

export interface Image {
    src: string;
    alt?: string;
}

export interface Comment {
    user: User;
    comment: string;
    date: Date;
}