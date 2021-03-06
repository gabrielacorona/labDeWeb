import { getToken } from './token';

export function postReporte(data) {
  return fetch('/reportes', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    body: data  
  })
  .then((response) => { 
      return response.json().then((data) => {
          return data;
      }).catch((err) => {
          console.log(err);
      }) 
  });
}

export function editReporte(data) {
  return fetch('/reportes', {
      method: 'PATCH',
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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    })
      .then(data => data.json()) 
}

export function addReporteToMolde(data){
  return fetch('/moldes/addReporte', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ',Bearer ' + getToken()
    },
      body: JSON.stringify(data)
  })
  .then(data => data.json())
}

export function getReportesByMolde(moldeId){
  return fetch('/moldes/getReportes/'+ moldeId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ',Bearer ' + getToken()
    }
  })
  .then(function(response) {
    if (!response.ok) {
        // make the promise be rejected if we didn't get a 2xx response
        const err = new Error("Not 2xx response");
        err.response = response;
        throw err;
    } else {
      return response.json()
         // got the desired response
    }
}).catch(function(err) {
    // some error here
});

}

export function getReportesByID(reporteId){
  return fetch('/reportes/id/'+ reporteId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ',Bearer ' + getToken()
    }
  })
  .then(data => data.json())
}

export function getReportesByCompany(company){
  return fetch('/reportes/company/'+ company, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ',Bearer ' + getToken()
    }
  })
  .then(data => data.json())
}

export function deleteReporte(data){
  return fetch('/reportes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify(data)
  })
}

export function getReportePicture(id) {
  return fetch('/fotos/id/' + id, {
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