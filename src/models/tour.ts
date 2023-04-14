import { OptionItem } from "./general";
import {User} from "./user";

export interface Tour {
  id?: number;
  title: string;
  description: string;
  city?: OptionItem;
  district?: OptionItem;
  commune?: OptionItem;
  moreLocation?: string;
  highlight?: string;
  termsAndCondition?: string;
  suitablePerson?: string;
  numberOfDays?: number;
  numberOfNights?: number;
  rate?: number;
  images: string[];
  creator: number;
  contact: string;
  isDeleted?: boolean;
  tourOnSales?: TourPrice[];
  languages?: Tour[];
  parentLanguage: number,
  language: string;
  numberOfReviewer: number;
}

export interface TourPrice {
  id?:number;
  tourId?: number;
  discount: number;
  quantity: number;
  startDate: Date;
  childrenAgeMin: number;
  childrenAgeMax: number;
  childrenPrice: number;
  adultPrice: number;
  currency: string;
}

export interface ScheduleItem {
    id?: number
    startTime: number;
    endTime: number;
    description: string;
  }
  export interface Schedule {
    id?: number
    tourId: number;
    day: number;
    schedule: ScheduleItem[];
  }

  export interface NormalGetTours {
    take: number;
    page: number;
    keyword?: string;
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

  
export enum DETAIL_SECTION {
  section_overview = 'section_overview',
  section_term_condition = 'section_term_condition',
  section_reschedule_refund = 'section_reschedule_refund',
}