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
  value?: string;
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

export const policyType = [
  { id: 1, name: "RESCHEDULE" },
  { id: 2, name: "REFUND"},
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

export enum EServiceType {
  TOUR = 1,
  HOTEL = 2
}

export enum EServicePolicyType {
  RESCHEDULE = 1,
  REFUND = 2
}