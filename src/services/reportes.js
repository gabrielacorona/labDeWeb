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
  .then(data => data.json())
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