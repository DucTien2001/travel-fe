import {User} from "./user";

export interface Tour {
    id?: number;
    title: string;
    description: string;
    businessHours: string[];
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
    altText: string;
    caption: string;
    key: number;
    src: string;
}

export interface HistoryBookTour {
    id: number;
    date: Date;
    tourId: number;
  }
  