export interface ICreateHotel {
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  tags: string[];
  images: string[];
  creator: number;
}
