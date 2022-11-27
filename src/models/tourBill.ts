export interface TourBill {
  userId: number;
  userMail: string;
  tourId: number;
  amount: number;
  price: number;
  discount: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface IVerifyBookTour {
  code: string;
  billId: number;
}

export interface IToursRevenueByMonth {
  tourIds: number[];
  month: number;
}
