import React, { useState } from 'react'
import axios from 'axios';

function Ngoregister() {
    const [formData, setFormData] = useState({
        name: '',
        directorName: '',
        address: '',
        email: '',
        city: '',
        description: '',
        workforce: 0,
        phoneNumber: 0,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

        try {
            const response = await axios.post('/api/addNGO', formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                console.log('NGO registered successfully');
            } else {
                console.error('Error registering NGO');
            }
        } catch (error) {
            console.error('Error registering NGO:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4 w-[24rem] ml-6'>
            <input name="name" placeholder="Name" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="directorName" placeholder="Director's Name" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="address" placeholder="Address" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="city" placeholder="City" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="description" placeholder="Vision and Mission" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="workforce" type='number' placeholder="Total Workforce" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <input name="phoneNumber" type='number' placeholder="Phone Number" onChange={handleChange} className='p-2 border  rounded-md transition-all' />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default Ngoregister