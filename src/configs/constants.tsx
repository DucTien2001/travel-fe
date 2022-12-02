export const API = {
  CONFIG: {
    DEFAULT: "/v1.0/config",
  },
  AUTH: {
    ME: "/v1.0/user/me",
    LOGIN: "/v1.0/user/login",
    LOGIN_SOCIAL: "/v1.0/user/login/social",
    SEND_VERIFY_SIGNUP: "/v1.0/user/verify-signup",
    RESEND_VERIFY_SIGNUP: "/v1.0/user/re-send-email-verify-signup",
    REGISTER: "/v1.0/user/register",
    PROFILE: "/v1.0/user/profile/:id",
    ACTIVE: "/v1.0/user/active",
    SEND_EMAIL_FORGOT_PASSWORD: "/v1.0/user/send-email-forgot-password",
    FORGOT_PASSWORD: "/v1.0/user/change-forgot-password",
    CHECK_ISVALID_CODE: "/v1.0/user/check-isvalid-code",
    CHECK_EMPTY_PASSWORD: "/v1.0/user/check-empty-password",
    CHANGE_LANGUAGE: "/v1.0/user/change-language",
  },
  USER: {
    DEFAULT: "/v1.0/user",
    PAYMENT_INFO: "/v1.0/user/payment-info",
    UPDATE_PAYMENT_INFO: "/v1.0/user/update-payment-info",
    UPDATE_PROFILE: "/v1.0/user/update-profile/:id",
    CHANGE_PASSWORD: "/v1.0/user/change-password",
    UPDATE_AVATAR: "/v1.0/user/update-avatar",
  },
  NORMAL: {
    TOUR: {
      DEFAULT: "/v1.0/tour",
      ALL_TOURS: "/v1.0/tour/get-all-tours",
      DETAIL_TOUR: "/v1.0/tour/get-tour/:id",
      SEARCH_TOURS: "/v1.0/tour/search-tours/:name",
    },
    COMMENT: {
      TOUR_COMMENT: {
        GET_COMMENT: "/v1.0/tour-comment/get-tours-comment/:id",
        CREATE: "/v1.0/tour-comment/create",
        UPDATE: "/v1.0/tour-comment/update/:id",
        DELETE: "/v1.0/tour-comment/delete/:id",
        REPLY: "/v1.0/tour-comment/reply/:id",
      },
      HOTEL_COMMENT: {
        GET_COMMENT: "/v1.0/hotel-comment/get-hotels-comment/:id",
        CREATE: "/v1.0/hotel-comment/create",
        UPDATE: "/v1.0/hotel-comment/update/:id",
        DELETE: "/v1.0/hotel-comment/delete/:id",
        REPLY: "/v1.0/hotel-comment/reply/:id",
      },
    },
    ROOMBILL: {
      CREATE: "/v1.0/room-bill/create",
      GET_ALL_ROOMBILL: "/v1.0/room-bill/get-all-user-room-bills/:id",
      VERIFY_BOOKROOM: "/v1.0/room-bill/verify-book-room",
    },
    TOURBILL: {
      CREATE: "/v1.0/tour-bill/create",
      GET_ALL_TOURBILL: "/v1.0/tour-bill/get-all-user-tour-bills/:id",
      GET_TOURBILL: "/v1.0/tour-bill/get-tour-bill/:id",
      VERIFY_BOOKTOUR: "/v1.0/tour-bill/verify-book-tour",
    },
    HOTEL: {
      ALL_HOTELS: "/v1.0/hotel/get-all-hotels",
      DETAIL_HOTEL: "/v1.0/hotel/get-hotel/:id",
      SEARCH_HOTELS: "/v1.0/hotel/search-hotels/:name",
    },
    ROOM: {
      GET_ROOMS: "/v1.0/room/get-all-rooms/:id",
      GET_ROOMS_AVAILABLE: "/v1.0/room/get-rooms-available",
      GET_PRICE: "/v1.0/room-other-price/get-price",
    },
  },
  ENTERPRISE: {
    COMMENT: {
      TOUR_COMMENT: {
        GET_All_COMMENTS: "/v1.0/tour-comment/get-all-tour-comments",
        REPLY: "/v1.0/tour-comment/reply/:id",
        DELETE: "/v1.0/tour-comment/delete/:id",
      },
      HOTEL_COMMENT: {
        GET_All_COMMENTS: "/v1.0/hotel-comment/get-all-hotel-comments",
        REPLY: "/v1.0/hotel-comment/reply/:id",
        DELETE: "/v1.0/hotel-comment/delete/:id",
      },
    },
    TOUR: {
      CREATE_TOUR: "/v1.0/tour/create",
      UPDATE_TOUR: "/v1.0/tour/update/:id",
      DELETE_TOUR: "/v1.0/tour/delete/:id",
      GET_TOURS: "/v1.0/tour/get-tours/:id",
      STOP_WORKING: "/v1.0/tour/temporarily-stop-working/:id"
    },
    HOTEL: {
      CREATE_HOTEL: "/v1.0/hotel/create",
      UPDATE_HOTEL: "/v1.0/hotel/update/:id",
      DELETE_HOTEL: "/v1.0/hotel/delete/:id",
      GET_HOTELS: "/v1.0/hotel/get-hotels/:id",
      STOP_WORKING: "/v1.0/hotel/temporarily-stop-working/:id"
    },
    ROOM: {
      CREATE_ROOM: "/v1.0/room/create",
      GET_ALL_ROOM:"/v1.0/room/get-all-rooms/:id",
      UPDATE_INFORMATION:"/v1.0/room/update-information/:id",
      UPDATE_PRICE:"/v1.0/room/update-price/:id",
      DELETE:"/v1.0/room/delete/:id",
      STOP_WORKING:"/v1.0/room/temporarily-stop-working/:id",
    },
    TOURBILL: {
      GET_TOURS_REVENUE_BY_MONTH: "/v1.0/tour-bill/get-tours-revenue-by-month",
      GET_TOURS_REVENUE_BY_YEAR: "/v1.0/tour-bill/get-tours-revenue-by-year",
    },
    ROOMBILL: {
      GET_HOTELS_REVENUE_BY_MONTH: "/v1.0/room-bill/get-hotels-revenue-by-month",
      GET_HOTELS_REVENUE_BY_YEAR: "/v1.0/room-bill/get-hotels-revenue-by-year",
    },
  },
};

export const VALIDATION = {
  password: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/,
  phone: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
};

