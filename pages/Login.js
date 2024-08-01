// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginSuccess } from '../slices/signupSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(email, password);
        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const user = response.data; // Access response data
                dispatch(loginSuccess({ 
                    email: user.user.email, 
                    name: user.user.name, 
                    accessToken: user.accessToken 
                }));
                router.push('/restaurants');
                // console.log(user);
                console.log('User logged in successfully');
            } else {
                console.error('Error logging in user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
