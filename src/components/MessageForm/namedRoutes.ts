const namedRoutes = {
  home: {
    map: 'home-map',
    parkingList: 'home-parking-list',
    checkinTutorial: 'checkin-tutorial',
  },
  auth: {
    signIn: 'auth-sign-in',
    signUp: {
      form: 'auth-sign-up',
      success: 'success-sign-up',
    },
    finishRegister: 'auth-finish-register',
    manager: 'auth-manager',
    personalInfoEdit: 'auth-personal-info-edit',
    securityInfoManager: 'security-info-manager',
    changePassword: 'auth-change-password',
    forgetPassword: {
      principal: 'auth-forget-password',
      userNotFound: 'user-not-found',
    },
    forgetEmail: 'auth-forget-email',
    changeEmail: 'auth-change-email',
    updateEmail: 'auth-update-email',
    validateAccount: 'auth-validate-account',
    notReceivedEmailInfo: 'auth-not-received-email-info',
  },
  splashScreen: 'splash-screen',
  updateApp: 'update-app',
  landing: 'landing',
  terms: 'terms',
  wallet: {
    cards: {
      add: 'form-card-add',
      success: 'success-card-add',
      list: 'card-list',
    },
  },
  activeStayDetails: {
    beePass: 'active-stay-details-bee-pass',
    beeMoving: 'active-stay-details-bee-moving',
  },
  growth: {
    blackFriday: 'growth-black-friday',
  },
  hubeesPass: {
    about: 'hubees-pass-about',
    successSigned: 'hubees-pass-success-signed',
    successCheckOut: 'hubees-pass-success-check-out',
    warnAlreadyCheckedIn: 'warn-already-checked-in',
    remeberToCheckin: 'hubees-pass-remember-to-checkin',
    howToUse: 'hubees-pass-how-to-use',
    signUp: 'hubees-pass-sign-up',
    retryFailedPayment: 'retry-failed-payment',
    activeStayDetails: 'hubees-pass-active-stay-details',
    activeStayDetailsOldVersion: 'hubees-pass-active-stay-details-old-version',
    unsubscribeHubeesPass: {
      unsubscribe: 'hubees-pass-unsubscribe',
      review: 'hubees-pass-unsubscribe-review',
      success: 'hubees-pass-unsubscribe-success',
    },
    central: 'hubees-pass-subscription-central',
    digitalTicket: {
      page1: 'digital-ticket-hubees-pass-info-page1',
      page2: 'digital-ticket-hubees-pass-info-page2',
      talkToValetParking: 'digital-ticket-hubees-pass-info-valet-parking',
      typeTicket: 'digital-ticket-type-ticket',
    },
    promotionalScreen: {
      versionOne: 'payment-promotion-v1',
      versionTwo: 'payment-promotion-v2',
    },
    paidSingleTicket: 'paid-single-ticket',
  },
  singlePayment: {
    about: 'single-payment-about',
    checkOutSuccess: 'single-payment-check-out-success',
    activeStayDetails: 'single-payment-active-stay-details',
    modals: {
      checkinConfirm: 'checkin-confirm',
      showHubeesPassAd: 'show-hubees-pass-ad',
      remeberToSignUp: 'single-payment-remember-to-signup',
    },
    singleTicket: {
      selectInsertTicket: 'single-ticket-select-insert-ticket',
      activeStaysDetails: 'single-ticket-active-stays-details',
      enterTicket: 'single-ticket-enter-ticket',
      modalAlertCheckin: 'modal-alert-checkin',
    },
    digitalTicket: {
      page1: 'digital-ticket-info-page1',
      page2: 'digital-ticket-info-page2',
      talkToValetParking: 'digital-ticket-info-valet-parking',
    },
  },
  qrScan: {
    qrScanHubeesPassPage: 'qr-scan-hubees-pass-page',
    qrScanModalSinglePaymentPage: 'qr-scan-single-payment-page',
    wrongTicketScanned: 'qr-wrong-ticket-scanned',
    shouldScanBoardFirst: 'should-scan-board',
  },
  vehicle: {
    manager: 'vehicle-manager',
    add: 'vehicle-add',
    selectVehicle: 'select-vehicle',
  },
  notification: 'notification',
  notificationRequest: 'notification-request',
  news: 'news',
  extract: 'extract',
  help: {
    success: 'help-success',
    home: 'help',
    helpRequest: 'help-request',
    serviceHistory: 'service-history',
    frequentlyAsked: 'frequently-asked',
    categoryDetails: 'category-details',
    helpChatLog: 'help-log',
  },
  geolocation: {
    askForAccess: 'geolocation-ask-for-access',
  },
  device: {
    forbiddenAccess: 'device-forbidden-access',
    changeDeviceIsRequired: 'change-device-is-required',
  },
  coupon: 'coupon',
  reviewRate: 'review-rate',
  pendingPayments: 'pending-payments',
  emotional: 'emotional',
  retrospective: 'retrospective',
} as const;

export type NamedRoutes = typeof namedRoutes;

export { namedRoutes };
