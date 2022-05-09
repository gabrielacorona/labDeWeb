export async function getMoldes() {
    return fetch('/moldes', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJiNTgzMTBhLWU1ZjUtNGY4MS05ZmIwLWZlOTYxZjEyZmM2NSIsImZpcnN0TmFtZSI6InJpY2FyZG8iLCJsYXN0TmFtZSI6ImNvcm9uYSIsImVtYWlsIjoicmlja3lAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDUkWldNc0NwZEsvbVNrajJJN1BVd1lBLk84YUpoNExla1UxTXFpandBZ0ZvdTBUZHU2SkI5VVciLCJjb21wYW55IjoiZ2FiYWNvIiwidGVsZXBob25lIjoiODE4MjY2MjIwMyIsInVzZXJQaWN0dXJlIjoicGVuZGllbnRlIiwiY29tcGFueVBpY3R1cmUiOiJwZW5kaWVudGUiLCJsYXN0UmVwb3J0RGF0ZSI6IiBheWVyICIsIm1lbWJlclNpbmNlIjoiYXllciAiLCJ1c2VyVHlwZSI6ImEiLCJpYXQiOjE2NTIxMTYzNjUsImV4cCI6MTY1MjExOTk2NX0.bDs5NobltWHg_mtGRnc-daOkN4eQoK8_BAu76QVImsY'
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