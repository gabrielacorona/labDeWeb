import { getToken } from './token';

export function getPagos() {
    return fetch('/pagos', {
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

export function postPago(data) {
    return fetch('/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(data)
      })
      .then((response) => { 
          return response.json().then((data) => {
              return data;
          }).catch((err) => {
              console.log(err);
          }) 
      });
}

export function addPagoToUser(data) {
    return fetch('/users/addPago', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(data)
      })
      .then((response) => { 
          return response.json().then((data) => {
              return data;
          }).catch((err) => {
              console.log(err);
          }) 
      });
}

export function getPagoById(id) {
    return fetch('/pagos/id/' + id, {
        method: 'GET',
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
