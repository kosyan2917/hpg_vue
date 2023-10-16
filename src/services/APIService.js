import axios from "axios";

class ApiService {
    _apiBase = "http://localhost:8080/"
    config = {}

    constructor() {
        this.api = axios.create()
        this.api.interceptors.request.use(
            (config) => {
                if (localStorage.getItem('token') !== null) {
                    config.headers.token = localStorage.getItem('token')
                }
                return config
            })
        this.api.interceptors.response.use((response) => {
            const originalRequest = response.config;
            let refresh = localStorage.getItem('refresh')
            if (response.status === 205 && !originalRequest._retry && refresh !== null) {
                originalRequest._retry = true;
                const tokens = this.refresh();
                console.log(tokens)
                localStorage.setItem('token', tokens.token);
                localStorage.setItem('refresh', tokens.refresh);
                return this.api(originalRequest);
            }
            // console.log(response.data.user.role)
            // if (response.data.user.role === "GUEST" && localStorage.getItem('refresh_token') !== null) {
            //     const originalRequest = response.config;
            //     originalRequest._retry = true;
            //     const tokens = this.refresh();
            //     localStorage.setItem('token', tokens.token);
            //     localStorage.setItem('refresh', tokens.refresh);
            //     return this.api(originalRequest);
            // }
            return response
        }, async error => {
            const originalRequest = error.config;
            let refresh = localStorage.getItem('refresh')
            if (error.response.status === 403 && !originalRequest._retry && refresh !== null) {
                originalRequest._retry = true;
                const tokens = await this.refresh();
                localStorage.setItem('token', tokens.token);
                localStorage.setItem('refresh', tokens.refresh);
                return this.api(originalRequest);
            }
            return Promise.reject(error);
        });
    }

    makeConfig() {
        let token = localStorage.getItem('token')
        if (token !== null) {
            this.config = {
                headers: {
                    token: token,
                }

            }
        }
    }

    async getResource(url) {
        // this.makeConfig()
        return this.api.get(`${this._apiBase}${url}`, this.config)
    }

    async postResource(url, data) {
        // this.makeConfig()
        return this.api.post(`${this._apiBase}${url}`, data, this.config)
    }

    async getBoard() {
        let token = localStorage.getItem('token')
        console.log(token)
        return this.getResource('board')
    }

    async login(email, password) {
        return this.postResource('users/login', {
            email: email,
            password: password
        })
    }

    async register(email, username, password) {
        return this.postResource('users/signup', {
            email: email,
            username: username,
            password: password
        })
    }

    async refresh() {
        let config = {
                headers: {
                    refresh_token: localStorage.getItem('refresh'),
                }
        }

        return await axios.create().get(this._apiBase+"users/refresh", config).then((response) => {
            return {
                token: response.data.token,
                refresh: response.data.refresh_token
            }
        }).catch((error) => {
            if (error.response.status === 403) {
                localStorage.removeItem('token')
                localStorage.removeItem('refresh')
                window.location.reload()
            }
        })
    }

    async getMe() {
        return this.getResource('users/me')
    }

    async changeAvatar(avatar) {
        return this.api.put(`${this._apiBase}users/change-avatar`, avatar)
    }

    async changeColor(color) {
        return this.api.put(`${this._apiBase}users/change-color`, color)
    }

    async getUsers() {
        return this.getResource('users')
    }

    async roll() {
        return this.getResource('roll')
    }

    async setCurrentGame(game) {
        return this.api.put(`${this._apiBase}game`, game)
    }

    async getCurrentGame() {
        return this.getResource('game')
    }

    async getField(id) {
        return this.getResource(`field/${id}`)
    }

}

export const apiService = new ApiService()