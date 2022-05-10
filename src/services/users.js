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