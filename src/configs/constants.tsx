export const API = {
  CONFIG: {
    DEFAULT: '/v1.0/config',
  },
  AUTH: {
    ME: '/v1.0/user/me',
    LOGIN: '/v1.0/user/login',
    LOGIN_SOCIAL: '/v1.0/user/login/social',
    SEND_VERIFY_SIGNUP: '/v1.0/user/verify-signup',
    RESEND_VERIFY_SIGNUP: '/v1.0/user/re-send-email-verify-signup',
    REGISTER: '/v1.0/user/register',
    PROFILE: '/v1.0/user/profile/:id',
    ACTIVE: '/v1.0/user/active',
    SEND_EMAIL_FORGOT_PASSWORD: '/v1.0/user/send-email-forgot-password',
    FORGOT_PASSWORD: '/v1.0/user/change-forgot-password',
    CHECK_ISVALID_CODE: '/v1.0/user/check-isvalid-code',
    CHECK_EMPTY_PASSWORD: '/v1.0/user/check-empty-password',
    CHANGE_LANGUAGE: '/v1.0/user/change-language',
  },
  USER: {
    DEFAULT: '/v1.0/user',
    PAYMENT_INFO: '/v1.0/user/payment-info',
    UPDATE_PAYMENT_INFO: '/v1.0/user/update-payment-info',
    UPDATE_PROFILE: '/v1.0/user/update-profile/:id',
    CHANGE_PASSWORD: '/v1.0/user/change-password',
    UPDATE_AVATAR: '/v1.0/user/update-avatar',
  },
  NORMAL: {
    TOUR: { 
      DEFAULT: '/v1.0/tour',
      ALL_TOURS: '/v1.0/tour/get-all-tours',
      DETAIL_TOUR: '/v1.0/tour/get-tour/:id',
    },
    TOURBILL: { 
      CREATE: '/v1.0/tour-bill/create',
    },
    HOTEL: { 
      ALL_HOTELS: '/v1.0/hotel/get-all-hotels',
      DETAIL_HOTEL: '/v1.0/hotel/get-hotel/:id',
    },
    ROOM: {
      GET_ROOMS: '/v1.0/room/get-all-rooms/:id',
    }
  },
  ENTERPRISE: {
    TOUR: {
      CREATE_TOUR: '/v1.0/tour/create',
      UPDATE_TOUR: '/v1.0/tour/update/:id',
      DELETE_TOUR: '/v1.0/tour/delete/:id',
      GET_TOURS: '/v1.0/tour/get-tours/:id',
    },
    HOTEL: {
      CREATE_HOTEL: '/v1.0/hotel/create',
      UPDATE_HOTEL: '/v1.0/hotel/update/:id',
      GET_HOTELS: '/v1.0/hotel/get-hotels/:id',
    },
    ROOM: {
      CREATE_ROOM: '/v1.0/room/create',
    }
  }
}

export const VALIDATION = {
  password: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/,
  phone: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
};
