import { getToken } from './token';

export function getMoldes() {
    return fetch('/moldes', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        }
      })
      .then((response) => { 
          return response.json().then((data) => {
              return data;
          }).catch((err) => {
              console.log(err);
          }) 
      });
}