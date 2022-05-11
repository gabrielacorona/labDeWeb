import { getToken } from './token';

import { useState } from 'react';

export function getUserId() {
    const userString = localStorage.getItem('userId');
    const currUser = JSON.parse(userString);
    return currUser?.userId
}

export function useUserId() {    
    const [userId, setUserId] = useState(getUserId());

    const saveUserId = userId => {
        console.log("Settingid")
        localStorage.setItem('userId', JSON.stringify(userId));
        setUserId(userId.userID);
    };

    return {
        setUserId: saveUserId,
        userId
    }
    
}

export function loginUser(credentials) {
    return fetch('/users/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => data.json()) 
}

export function getUserById(id){
  return fetch('/users/id/'+id, {
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

export function getUserMoldes(id){
  return fetch('/users/getMoldes/'+id, {
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


export function registerMockAdmin(credentials) {
    let mockAdmin = {
        id: "9f64452b-6b16-406e-b5a0-cf688bb00e0e",
        firstName: "mockAdmin",
        lastName: "mockAdmin",
        email: credentials.email,
        company: "mockComp",
        telephone: "8182662203",
        password: credentials.password,
        userPicture: "pendiente",
        companyPicture: "pendiente",
        lastReportDate: " ayer ",
        memberSince: "ayer ",
        userType: "a"
    }

    return fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockAdmin)
      })
        .then(data => data.json()) 
}