import { EServicePolicyType } from "models/general";

export const getCurrency = (currency) => {
    switch (currency) {
      case "vi":
        return { id: 1, name: "VND", value: "vi" };
      case "en":
        return { id: 2, name: "USD", value: "en" };
    }
  };

  export const getPolicyType = (policy) => {
    switch (policy) {
      case EServicePolicyType.RESCHEDULE:
        return { id: 1, name: "RESCHEDULE", value: EServicePolicyType.RESCHEDULE };
      case EServicePolicyType.REFUND:
        return { id: 2, name: "REFUND", value: EServicePolicyType.REFUND };
    }
  };