import {User} from "./user";

export interface Tour {
    id?: number;
    title: string;
    description: string;
    priceAdult?: number;
    priceChild?: [];
    childOldRangeFrom?: [];
    childOldRangeTo?: [];
    city?: string;
    district?: string;
    commune?: string;
    moreLocation?: string;
    highlight?: string;
    termsAndCondition?: string;
    languages?: [];
    suitablePerson?: [];
    totalTicket?: [];
    startDate?: [];
    endDate?: [];
    businessHours?: string[];
    location?: string;
    price?: number;
    discount: number;
    tags?: string[];
    rate?: number;
    images: string[];
    creator: number;
    contact: string;
    isTemporarilyStopWorking?: boolean;
}
export interface ScheduleItem {
    id?: number
    startTime: Date;
    endTime: Date;
    description: string;
  }
  export interface CreateMultipleSchedule {
    id?: number
    tourId: number;
    day: number;
    schedule: ScheduleItem[];
  }
  interface Price {
    title: string;
    minOld: number;
    maxOld: number;
    price: number;
  }
  
  export interface CreatePrice {
    tourId: number;
    discount: number;
    quantity: number;
    startDate: Date;
    prices: Price[];
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
  