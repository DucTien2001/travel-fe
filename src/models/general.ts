import { images } from "configs/images";

export enum EKey {
  TOKEN = "token",
  REFRESH_TOKEN = "refresh_token",
}
export interface SortItem {
  sortedField: string;
  isDescending: boolean;
}
export interface Meta {
  take: number;
  itemCount: number;
  page: number;
  pageCount: number;
}
export interface DataPagination<T> {
  data: T[];
  meta: Meta;
}
export interface OptionItem<T = number> {
  id?: T | string;
  name: string;
  translation?: string;
  img?: string;
  value?: T | string;
}

export interface OptionItemT<T> {
  id: T;
  name: string;
  translation?: string;
}

export const sortType: OptionItem[] = [
  { id: 1, name: "Lowest price", value: "Lowest price" },
  { id: 2, name: "Highest price", value: "Highest price" },
  { id: 3, name: "Highest rating", value: "Highest rating" },
];

export const languagesType: OptionItem[] = [
  { id: 1, name: "English", value: "English" },
  { id: 2, name: "Vietnamese", value: "Vietnamese" },
];

export const currencyType: OptionItem[] = [
  { id: 1, name: "VND", value: "vi" },
  { id: 2, name: "USD", value: "en" },
]

export enum EServicePolicyType {
  RESCHEDULE = 1,
  REFUND = 2
}

export enum EServiceType {
  TOUR = 1,
  HOTEL = 2
}


export const policyType = [
  { id: 1, name: "RESCHEDULE", value: EServicePolicyType.RESCHEDULE },
  { id: 2, name: "REFUND", value: EServicePolicyType.REFUND},
]

export const serviceType = [
  { id: 1, name: "TOUR", value: EServiceType.TOUR },
  { id: 2, name: "HOTEL", value: EServiceType.HOTEL},
]




export const userType = [
  { id: 1, name: "Super Admin" },
  { id: 2, name: "Admin" },
  { id: 3, name: "Enterprise" },
  { id: 4, name: "Staff" },
  { id: 5, name: "User" },
]

export enum EPaymentStatus {
  NOT_PAID = 0,
  PAID = 1,
  CANCEL = 3,
  FAILED = 4,
}

export enum EBillStatus {
  RESCHEDULED = 0,
  CANCELED = 1,
  NOT_CONTACTED_YET = 2,
  CONTACTED = 3,
  USED = 4,
  NOT_USE =5,
}


export enum EDiscountType {
  MONEY = 1,
  PERCENT = 2
}

export const discountType = [
  { id: 1, name: "MONEY", value: EDiscountType.MONEY },
  { id: 2, name: "PERCENT", value: EDiscountType.PERCENT},
]

export enum Lang {
  VI = 'vi',
  EN = 'en'
}
export interface LangSupport {
  key: Lang,
  name: string,
  img: string
}

export const langSupports: LangSupport[] = [
  {
    key: Lang.VI,
    name: 'Tiếng Việt',
    img: images.vietnam.src
  },
  {
    key: Lang.EN,
    name: 'English',
    img: images.anh.src
  }
]

export const langOptions: OptionItem<string>[] = [
  {
    id: Lang.VI,
    name: 'Tiếng Việt',
    img: images.vietnam.src,
  },
  {
    id: Lang.EN,
    name: 'English',
    img: images.anh.src,
  }
]

export interface SortItem {
  sortedField: string;
  isDescending: boolean;
}

export interface TableHeaderLabel {
  name: string;
  label: string;
  sortable: boolean;
  align?: 'center'
  | 'inherit'
  | 'justify'
  | 'left'
  | 'right'
}

