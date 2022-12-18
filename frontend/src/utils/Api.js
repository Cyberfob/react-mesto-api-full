class Api {
    constructor (options) {
        this._url = options.url
        this._headers = options.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }   else {
                return Promise.reject(`Ошибка: ${res}`);
        }       
    }

    getUserInfo() {
        const request = {
            method: "GET",
            headers: this._headers,
        } 
        return fetch(`${this._url}/users/me`,request)
            .then(this._checkResponse)
    }

    setUserInfo({name,about}) {
        const request = {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name,about})
        }
        return fetch(`${this._url}/users/me`,request)
            .then(this._checkResponse)
    }
    

    getInitCards() {
        const request = {
            method: "GET",
            headers: this._headers,
        } 
        return fetch(`${this._url}/cards`,request)
        .then((res) => {console.log(res)})
    }


    addCard({name,link}) {
        const request = {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name,link})
        } 
        return fetch(`${this._url}/cards`,request)
        .then(this._checkResponse)
    }


    setLike(_id, state) {
        const request = {
            method: `${state ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        } 
        return fetch(`${this._url}/cards/${_id}/likes`,request)
        .then(this._checkResponse)
    }

    removeCard(_id) {
        
            const request = {
                method: "DELETE",
                headers: this._headers,
            } 
            return fetch(`${this._url}/cards/${_id}`,request)
            .then(this._checkResponse)
        
    }

    setProfileAvatar(link) {
        
            const request = {
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: link
                })
            } 
            return fetch(`${this._url}/users/me/avatar`,request)
            .then(this._checkResponse)
            
    }
}

const api = new Api ({
    url: 'http://api.apetruhin.nomoredomains.club',
        headers: {
            authorization: localStorage.getItem("jwt"),
            'Content-Type': 'application/json'
        }
    }
);

export default api;