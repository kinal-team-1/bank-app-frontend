// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  HI: "Hi {name:string}!",
  TITLE: "Hello World!",
  NAVBAR: {
    HOME: "Home",
    SERVICES: "Services",
    MOVEMENTS: "Movements",
    CURRENCIES: "Currencies",
    LOG_OUT: "Log out",
    USER: "users",
    FAVORITE_ACCOUNTS: "Favorite Accounts",
  },
  ERROR: {
    SOMETHING_WENT_WRONG: "Something went wrong",
    PLEASE_TRY_AGAIN_LATER: "Please try again later",
  },
  TOAST: {
    SUCCESS: "Success",
  },
  PAGES: {
    SERVICE: {
      NAME: "Name",
      DESCRIPTION: "Description",
      PRICE: "Price",
    },
    USER: {
      EMAIL: "Email",
      USERNAME: "Username",
      PASSWORD: "password",
      NAME: "Name",
      LAST_NAME: "Last Name",
      ADDRESS: "Address",
      DPI: "DPI",
      PHONE_NUMBER: "Phone number",
      JOB_NAME: "Job name",
      MONTHLY_INCOME: "Monthly income",
      CURRENCY_INCOME: "Currency income",
    },
    FAVORITE_ACCOUNT: {
      ACCOUNT: "Account",
      OWNER: "Owner",
      ALIAS: "alias",
    },
  },
  FORMS: {
    FAVORITE_ACCOUNT: {
      TITLE: "New Account",
      OWNER: "owner",
    },
    SERVICE: {
      VALIDATION: {
        NAME_REQUIRED: "Name is required, and must be 3 characters long",
      },
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
