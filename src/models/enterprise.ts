export interface ETour {
    id?: number;
    title: string;
    description: string;
    businessHours: string;
    location: string;
    price: number;
    discount: number;
    tags: string[];
    images: string[];
    creator: number;
    isTemporarilyStopWorking?: boolean;
  }

  export interface EUpdateTour {
    id?: number;
    title: string;
    description: string;
    businessHours: string;
    location: string;
    price: number;
    discount: number;
    tags: string;
    images: string[]; 
    isTemporarilyStopWorking?: boolean;
  }
  