import {User} from "./user";

export interface Tour {
    id?: number;
    title: string;
    description: string;
    businessHours: string;
    location: string;
    price: number;
    discount: number;
    tags: string[];
    images: string[];
    creator: number;
    contact: string;
    isTemporarilyStopWorking?: boolean;
}

export interface Image {
    src: string;
    altText?: string;
    caption?: string;
}

export interface Comment {
    user: User;
    comment: string;
    date: Date;
}