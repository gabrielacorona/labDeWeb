export function getList() {
    return fetch('http://localhost:3333/users')
      .then(data => data.json())
}