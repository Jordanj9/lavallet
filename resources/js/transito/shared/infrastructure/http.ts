import axios from "axios";
import { Response } from "../domain/response";

enum STATUS {
  OK = 200,
  CREATED = 201,
  ERROR = 500
}

const get = async <T>(url: string) => {
  const res = await axios.get(url);
  return res.data as T;
};

const post = async (url: string, body: any) => {
  const response = await axios.post(url, body);

  //return response.status as unknown as T;
  if (response.status == STATUS.ERROR)
    return new Response(
      null,
      "Ha ocurrido un error desconocido. Codigo de error: " + response.status
    );
  else return (await response.data) as Response;
};

const put = async (url: string, body: any) => {
  const response = await axios.put(url, body);
  //return response.status as unknown as T
  if (response.status == STATUS.ERROR)
    return new Response(
      null,
      "Ha ocurrido un error desconocido. Codigo de error: " + response.status
    );
  else return (await response.data) as Response;
};

const _delete = async (url: string) => {
  const response = await axios.delete(url);
  //return response.status as unknown as T
  if (response.status == STATUS.ERROR)
    return new Response(
      null,
      "Ha ocurrido un error desconocido. Codigo de error: " + response.status
    );
  else return (await response.data) as Response;
};

export const http = {
  get,
  post,
  put,
  delete: _delete
};
