// @ts-check

/**
 * @typedef { import('../i18n-types.js').BaseTranslation } BaseTranslation
 */

/** @satisfies { BaseTranslation } */
const en = {
  // TODO: your translations go here
  HI: "Hi {name:string}!",
  TITLE: "Hello World!",
  BOTTOM_NAVBAR: {
    HOME: "Home",
    SERVICES: "Services",
    MOVEMENTS: "Movements",
    CURRENCIES: "Currencies",
  },
  ERROR: {
    SOMETHING_WENT_WRONG: "Something went wrong",
    PLEASE_TRY_AGAIN_LATER: "Please try again later",
  },
  TOAST: {
    SUCCESS: "Success",
  },
};

// eslint-disable-next-line import/no-default-export
export default en;
