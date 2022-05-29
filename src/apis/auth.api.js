import axios from 'axios';
const url = process.env.VUE_APP_BACKEND_URL + '/api/auth';
export default class Auth {

    static async signUp(body, key) {
        try {
            const res = await axios.post(`${url}`, body, {
                params: {
                    key,
                }
            });
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async secret() {
        try {
            const res = await axios.get(`${url}/secret`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

    static async signIn(body, key) {
        try {
            const res = await axios.patch(`${url}/signIn`, body, {
                params: {
                    key,
                }
            });
            return res.data;
        } catch (error) {
            return error.response.data;
        }
    }

}