export interface ICreateHotel {
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  rate?: number;
  contact: string;
  tags: string[];
  images: string[];
  creator: number;
}

export interface IHotel {
  id?: number;
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  contact: string;
  tags: string[];
  images: string[];
  creator: number;
  isTemporarilyStopWorking?: boolean;
}

export interface IUpdateHotel {
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  contact: string;
  tags: string[];
  images: string[];
}

export enum HOTEL_SECTION {
  section_information = 'section_information',
  section_check_room = 'section_check_room',
}