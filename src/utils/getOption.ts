import { EServicePolicyType } from "models/general";
import { EUserType } from "models/user";

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

  export const getRoleUser = (role) => {
    switch (role) {
      case EUserType.SUPER_ADMIN:
        return "Super Admin";
      case EUserType.ADMIN:
        return "Admin";
      case EUserType.ENTERPRISE:
        return "Enterprise";
      case EUserType.STAFF:
        return "Staff";
      case EUserType.USER:
        return "User";
    }
  };

  export const getOptionRoleUser = (role) => {
    switch (role) {
      case EUserType.SUPER_ADMIN:
        return { id: 1, name: "Super Admin", value: 1 };
      case EUserType.ADMIN:
        return{ id: 2, name: "Admin", value: 2 };
      case EUserType.ENTERPRISE:
        return { id: 3, name: "Enterprise", value: 3  };
      case EUserType.STAFF:
        return { id: 4, name: "Staff", value: 4 };;
      case EUserType.USER:
        return { id: 5, name: "User", value: 5 };;
    }
  };