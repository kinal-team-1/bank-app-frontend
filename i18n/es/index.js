// @ts-check

/**
 * @typedef { import('../i18n-types.js').Translation } Translation
 */

/** @satisfies { Translation } */
const es = {
  // TODO: your translations go here
  HI: "Hola {name}!",
  TITLE: "Hola mundo",
  NAVBAR: {
    HOME: "Inicio",
    SERVICES: "Servicios",
    MOVEMENTS: "Movimientos",
    CURRENCIES: "Divisas",
    LOG_OUT: "Cerrar sesión",
    USER: "Usuarios",
    FAVORITE_ACCOUNTS: "Cuentas Favoritas",
  },
  ERROR: {
    SOMETHING_WENT_WRONG: "Algo salió mal",
    PLEASE_TRY_AGAIN_LATER: "Por favor, inténtalo de nuevo más tarde",
  },
  TOAST: {
    SUCCESS: "Éxito",
  },
  PAGES: {
    SERVICE: {
      NAME: "Nombre",
      DESCRIPTION: "Descripción",
      PRICE: "Precio",
    },
    USER: {
      EMAIL: "Correo",
      USERNAME: "Nombre de usuario",
      NAME: "Nombre",
    },
    FAVORITE_ACCOUNT: {
      ACCOUNT: "Cuenta",
      OWNER: "Propietario",
      ALIAS: "Alias",
    },
  },
  FORMS: {
    FAVORITE_ACCOUNT: {
      TITLE: "Crear Alias",
      OWNER: "Propietario",
    },
    SERVICE: {
      VALIDATION: {
        NAME_REQUIRED: "Name is required, and must be 3 characters long",
      },
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default es;
