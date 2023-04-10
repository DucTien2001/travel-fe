export interface IEvent {
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  banner: string;
  code: string;
  policy: string;
  hotelIds: number[];
  tourIds: number[];
  numberOfCodes: number;
  numberOfCodesUsed: number;
  creator: number;
  owner: number;
  image: string;
  isDeleted: boolean;
  parentLanguage: number;
  language: string;
  languages?: IEvent[];
}

export interface FindAll {
  take: number;
  page: number;
  keyword?: string;
}


export interface Create {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  code: string;
  policy: string;
  hotelIds: number[];
  tourIds: number[];
  numberOfCodes: number;
}

export interface Update {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  code: string;
  policy: string;
  hotelIds: number[];
  tourIds: number[];
  numberOfCodes: number;
  language?: string;
}
