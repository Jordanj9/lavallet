import { Response } from "../domain/response";

// /src/infrastructure/http/http.ts
const headers = {
    'Content-Type': 'application/json'
}

enum STATUS {
    OK = 200,
    CREATED = 201,
    ERROR = 500
}

/*const get = async <T>(url: string) => {

    const response = await fetch(url, {
        method: 'GET',
        headers
    });

    return await response.json() as T;  
}*/

const get = async <T>(url: string) => {

    const response = await fetch(url, {
        method: 'GET',
        headers
    });
    
    return await response.json() as T;
}

const post = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body : JSON.stringify(body)
    })

    //return response.status as unknown as T;
    if(response.status == STATUS.ERROR)
        return new Response(null, 'Ha ocurrido un error desconocido. Codigo de error: '+ response.status);
    else
        return await response.json() as Response;
}

const put = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers,
        body : JSON.stringify(body)
    })
    //return response.status as unknown as T    
    if(response.status == STATUS.ERROR)
        return new Response(null, 'Ha ocurrido un error desconocido. Codigo de error: '+ response.status);
    else
        return await response.json() as Response;
}

const _delete = async (url: string) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers
    })
    //return response.status as unknown as T    
    if(response.status == STATUS.ERROR)
        return new Response(null, 'Ha ocurrido un error desconocido. Codigo de error: '+ response.status);
    else
        return await response.json() as Response;
}

export const http = {
    get,
    post,
    put,
    delete: _delete
}
