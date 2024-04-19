import React, { useState, useEffect } from 'react'
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
    const userEemail = useSelector(state => state.signup.email)
    const accessToken = useSelector(state => state.signup.accessToken)

    const FoodItems = [
        { name: 'Rice', price: 10 },
        { name: 'Cake', price: 20 },
        { name: 'Noodles', price: 15 },
    ];

    const [address, setAddress] = useState('');
    const [orderStatus, setOrderStatus] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const handleCheckboxChange = (e, index) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedItems((prevItems) => [...prevItems, { ...FoodItems[index], quantity: 1 }]);
        } else {
            setSelectedItems((prevItems) =>
                prevItems.filter((item) => item.name !== FoodItems[index].name)
            );
        }
    };

    const handleQuantityChange = (index, action) => {
        setSelectedItems((prevItems) =>
            prevItems.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        quantity: action === 'inc' ? item.quantity + 1 : Math.max(item.quantity - 1, 0),
                    }
                    : item
            )
        );
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/addToCart', {
                    params: {
                        userEemail: userEemail
                    }
                });
                if (response.status === 200) {
                    setCartItems(response.data);
                    console.log("cartItems", response.data);
                } else {
                    console.error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const currentTime = new Date();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send selectedItems, address, orderStatus, and restaurantName to backend
        try {
            await axios.post('/api/addToCart', {
                items: selectedItems,
                address,
                orderStatus,
                restaurantName,
                userEmail: userEemail,
                orderTime: currentTime,
                totalAmt: 100
            },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
        } catch (error) {
            console.error('Error adding items to cart:', error);
        }
        console.log(selectedItems, address, orderStatus, restaurantName, userEemail);
    };

    return (
        <div>
            hi {userName} with {userEemail} <br />
            <h2 className='mt-8 mb-2 ml-2'>Order Form</h2>
            <form onSubmit={handleSubmit} className='flex justify-center space-x-10 bg-slate-200 absolute p-6 rounded-lg ml-2'>
                <div className='space-y-4 mt-4'>
                    {FoodItems.map((item, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`food-${index}`}
                                onChange={(e) => handleCheckboxChange(e, index)}
                            />
                            <label htmlFor={`food-${index}`}>
                                {item.name} - ${item.price}
                            </label>
                            {selectedItems.some((selectedItem) => selectedItem.name === item.name) && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(index, 'dec')}
                                    >
                                        -
                                    </button>
                                    <span>
                                        {selectedItems.find((selectedItem) => selectedItem.name === item.name)
                                            .quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleQuantityChange(index, 'inc')}
                                    >
                                        +
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex flex-col space-y-4 mt-4'>

                    <div>
                        <label>Address:</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <label>Order Status:</label>
                        <input
                            type="text"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Restaurant Name:</label>
                        <input
                            type="text"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit Order</button>
                </div>
            </form>
            <p className='absolute mt-52 ml-2 mb-2'> Showing cart items  </p>

        </div>
    )
}

export default restaurants