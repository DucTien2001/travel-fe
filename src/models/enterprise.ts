export interface ETour {
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