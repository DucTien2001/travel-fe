export enum EKey {
  TOKEN = "token",
  REFRESH_TOKEN = "refresh_token",
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
