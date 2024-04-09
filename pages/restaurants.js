import React from 'react'
import axios from 'axios';

function restaurants() {
    axios.get('https://foodfire.onrender.com/api/restaurants?lat=21.250048&lng=81.63491840000001&page_type=DESKTOP_WEB_LISTING').then(
        (response) => {
            // console.log(response)
        },
        (error) => {
            console.log(error);
        }
    )

  return (
    <div>
        hi restus
    </div>
  )
}

export default restaurants