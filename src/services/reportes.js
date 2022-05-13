import { getToken } from './token';

export function postReporte(data) {
    return fetch('/reportes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(data)
      })
        .then(data => data.json()) 
}

export function getReporte(data) {
  return fetch('/reportes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    })
      .then(data => data.json()) 
}