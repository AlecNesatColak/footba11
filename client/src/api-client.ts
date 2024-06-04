import {RegisterFormData} from "./pages/Register"

import {LoginFormData} from "./pages/Login"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!responseBody.ok) {
        throw new Error(responseBody.message);
    }
}

export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!responseBody.ok) {
        throw new Error(responseBody.message);
    }


}

