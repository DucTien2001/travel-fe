export interface ETour {
  id?: number;
  title: string;
  description: string;
  city?: string;
  district?: string;
  commune?: string;
  moreLocation?: string;
  highlight?: string;
  termsAndCondition?: string;
  suitablePerson?: [];
  quantity?: number;
  numberOfDays?: number;
  numberOfNight?: number;
  rate?: number;
  images: string[];
  creator: number;
  contact: string;
  isDeleted?: boolean;
  schedule?: CreateMultipleSchedule[];
  priceRange?: CreatePrice[];
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
export interface EUpdateTour {
  id?: number;
  title: string;
  description: string;
  businessHours: string[];
  location: string;
  price: number;
  discount: number;
  tags: string[];
  images: string[];
  contact: string;
  isTemporarilyStopWorking?: boolean;
}

export interface AdminGetTours {
  take: number;
  page: number;
  keyword?: string;
}

export interface EGetRoomsAvailable {
  hotelId: number;
  startDate: Date;
  endDate: Date;
}
export interface EGetAllRoomBillsAnyDate {
  hotelId: number;
  date: Date;
}

export interface IHotel {
  id?: number;
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  contact?: string;
  tags: string[];
  images: string[];
  creator?: number;
  isTemporarilyStopWorking?: boolean;
}


// ======================== v1.2 ===================
export interface TourInformation {
  id?: number;
  title: string;
  quantity: string;
  numberOfDays: number;
  numberOfNights: number;
  city: string;
  district: string;
  commune: string;
  moreLocation: string;
  contact: string;
  description: string;
  suitablePerson: string;
  highlight: string;
  termsAndCondition: string;
}