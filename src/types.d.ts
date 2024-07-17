import {
  ClientError,
  FetchError,
  ServerError,
} from "./application/actions/GET/get-services";

export type CustomError = ClientError | ServerError | FetchError;

export type User = {
  _id: string;
  email: string;
  username: string;
  password: string;
  name: string;
  last_name: string;
  address: string;
  DPI: string;
  phone_number: string;
  job_name: string;
  monthly_income: number;
  currency_income: string;
  main_account: string;
  accounts: string[];
  created_at: string;
  updated_at: string;
  tp_status: "ACTIVE" | "INACTIVE";
};
