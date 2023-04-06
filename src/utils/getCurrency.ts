export const getCurrency = (currency) => {
    switch (currency) {
      case "vi":
        return { id: 1, name: "VND", value: "vi" };
      case "en":
        return { id: 2, name: "USD", value: "en" };
    }
  };