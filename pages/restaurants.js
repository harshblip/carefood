import React from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

function restaurants() {
    axios.get('https://foodfire.onrender.com/api/restaurants?lat=21.250048&lng=81.63491840000001&page_type=DESKTOP_WEB_LISTING').then(
        (response) => {
            // console.log(response)
        },
        (error) => {
            console.log(error);
        }
    )

    const userName = useSelector(state => state.signup.name)
    const userEmail = useSelector(state => state.signup.email)

    console.log(userName);

  return (
    <div>
        hi restus <br/>
        hi {userName} with {userEmail}
    </div>
  )
}

export default restaurants