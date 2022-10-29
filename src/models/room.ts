export interface HistoryBookRoom {
    id: number;
    date: Date;
    roomId: number;
}

export interface Room {
    id: number;
    src: string;
    roomNumber: string;
    description: string;
    location: string;   
    tags?: string;
    price: RoomPrice;
    rate: number;
    creator: string;
    isTemporarilyStopWorking?: boolean;
    bookDates: string;
}

export interface RoomPrice {
    id: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
    other: string;
    roomId: string;
}