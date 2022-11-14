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
  TOUR: { 
    DEFAULT: '/v1.0/tour',
    ALL_TOUR: '/v1.0/tour/get-all-tours',
  },
  ENTERPRISE: {
    TOUR: {
      CREATE_TOUR: '/v1.0/tour/create',
      UPDATE_TOUR: '/v1.0/tour/update/:id',
      GET_TOUR: '/v1.0/tour/get-tours/:id',
    }
  }
}

export const VALIDATION = {
  password: /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/,
  phone: /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/,
};
