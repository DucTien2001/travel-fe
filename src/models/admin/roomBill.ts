import { Room } from "models/room";
import { User } from "models/user";

export enum ESortRoomBillOption {
    LOWEST_REVENUE = 0,
    HIGHEST_REVENUE,
  }

  export const sortRevenueOption = [
    { id: 0, name: "LOWEST REVENUE", value: -1, translation: "common_select_all" },
    { id: 1, name: "LOWEST REVENUE", value: ESortRoomBillOption.LOWEST_REVENUE, translation: "admin_management_section_tour_bill_sort_option_title_lowest_revenue" },
    { id: 2, name: "HIGHEST REVENUE", value: ESortRoomBillOption.HIGHEST_REVENUE, translation: "admin_management_section_tour_bill_sort_option_title_highest_revenue"},
  ]
  export interface StatisticAllUsers {
    take: number;
    page: number;
    month: number;
    year: number;
    keyword?: string;
    sort?: number; //ESortRoomBillOption
  }
  
  export interface StatisticOneUser {
    take: number;
    page: number;
    keyword?: string;
    month: number;
    year: number;
  }
  
  export interface StatisticOneStay {
    take: number;
    page: number;
    month: number;
    year: number;
  }
  
  export interface StatisticOneRoom {
    month: number;
    year: number;
  }


  export interface ListRoomDetails {
    commission:number;
    numberOfBookings: number;
    revenue: number;
    totalNumberOfRoom: number;
  }

  export interface IStatisticAllUser {
    id?: number;
    username: string;
    address: string;
    phoneNumber: string;
    listRoomBillDetails: ListRoomDetails[];
    createdAt: Date;
  }

  export interface StayInfo {
    id?: number;
    name?: string;
    type?: number;
  }

  export interface IStatisticOneUser {
    commission:number;
    numberOfBookings: number;
    revenue: number;
    totalNumberOfRoom: number;
    stayInfo: StayInfo;
  }

  export interface IStatisticOneStay {
    commission:number;
    numberOfBookings: number;
    revenue: number;
    totalNumberOfRoom: number;
    roomInfo: Room;
  }

  export interface IStatisticOneRoom {
    commission:number;
    numberOfBookings: number;
    revenue: number;
    totalNumberOfRoom: number;
    bookedDate: Date;
  }