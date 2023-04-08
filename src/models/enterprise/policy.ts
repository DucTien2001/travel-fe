export interface FindAll {
    serviceId: number;
    serviceType: EServiceType;
  }
export interface Policy {
    id?: number;
    serviceId: number;
    serviceType: number;
    policyType: number;
    dayRange: number;
    moneyRate: number;
  }
  