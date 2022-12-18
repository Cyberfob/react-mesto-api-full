const API_URL = "https://api.apetruhin.nomoredomains.club";

export const register = (password, email) => {
    return fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    }).then(checkResponse)
        .catch(err => {
            console.log(err);
        });
};

export const login = (password, email) => {
    return fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email })
    })
        .then(checkResponse);
};

export const checkToken = token => {
    return fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    }).then(checkResponse)
        .catch(err => {
            console.log(err);
        });
};

export const checkResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};
