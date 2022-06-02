import { getToken } from './token';

export function postFoto(data) {
    return fetch('/fotos', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + getToken()
        },
        body: data
      })
        .then(data => data.json()) 
}