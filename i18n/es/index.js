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
    PRODUCT: "Producto",
    MOVEMENTS: "Movimientos",
    CURRENCIES: "Divisas",
    LOG_OUT: "Cerrar sesión",
    USER: "Usuarios",
    FAVORITE_ACCOUNTS: "Cuentas Favoritas",
    PRODUCT_ADMIN: "Productos Admin",
    USER_ADMIN: "Usuario Admin",
    SERVICES_ADMIN: "Servicios Admin",
    TRANSFERENCE: "Transferencias",
    PURCHASES: "Compradores",
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
      PASSWORD: "Contraseña",
      LAST_NAME: "Apellido",
      ADDRESS: "Dirección",
      DPI: "DPI",
      PHONE_NUMBER: "Numero de telefono",
      JOB_NAME: "Nombre del trabajo",
      MONTHLY_INCOME: "Ingreso Mensual",
      CURRENCY_INCOME: "Ingreso Divisas",
    },
    FAVORITE_ACCOUNT: {
      ACCOUNT: "Cuenta",
      OWNER: "Propietario",
      ALIAS: "Alias",
    },
    PRODUCT: {
      NAME: "Nombre",
      DESCRIPTION: "Descripción",
      PRICE: "Precio",
      STOCK: "Existencias",
    },
    ACCOUNT: {
      NAME: "Nombre",
      BALANCE: "Balance",
    },
    PURCHASE: {
      PURCHASER: "Comprador",
      PRODUCT: "Prodcuto",
      QUANTITY: "Cantidad",
      TOTAL: "Total",
      BUY_NOW: "Comprar Ahora",
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
    PRODUCT: {
      NAME: "Nombre",
      DESCRIPTION: "Descripción",
      PRICE: "Precio",
      STOCK: "Existencias",
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default es;
