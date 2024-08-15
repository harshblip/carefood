import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

function restaurants() {

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
    const [Ngos, setNgos] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [selectedNgo, setSelectedNgo] = useState('');

    const handleItemChange = (e) => {
        const { value, checked } = e.target;
        const order = cartItems.orders.find((order) => order.id === value);

        if (order && checked) {
            const selectedItem = order.items.find((item) => item.id === value);
            setSelectedFoods((prevSelected) => [
                ...prevSelected,
                {
                    id: selectedItem.id,
                    name: selectedItem.name,
                    price: selectedItem.price,
                    quantity: selectedItem.quantity,
                },
            ]);
        } else {
            console.log("nahi mila")
            setSelectedFoods((prevSelected) =>
                prevSelected.filter((food) => food.id !== value)
            );
        }
    };

    const handleNgoChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedNgo((prevNgos) => [...prevNgos, value]);
        } else {
            setSelectedNgo((prevNgos) => prevNgos.filter((ngo) => ngo !== value));
        }
    };

    const handleSubmi = async () => {
        try {
            const response = await axios.post('/api/donate', {
                email: userEemail,
                items: selectedFoods,
                ngos: selectedNgo,
                totalAmt: 200,
                date: currentTime
            });
            console.log('Donation successful:', response.data);
            // Reset selected items and ngos after successful donation
            setSelectedItems([]);
            setSelectedNgo('');
        } catch (error) {
            console.error('Error donating items:', error);
        }
    };

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
            try {
                const response = await axios.get('/api/addNGO');
                if (response.status === 200) {
                    setNgos(response.data.ngos);
                    console.log("NGOs:", response.data.ngos);
                } else {
                    console.error('Failed to fetch NGOs');
                }
            } catch (error) {
                console.error('Error fetching NGOs:', error);
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
        <div className='flex mt-4'>
            <div>
                <h2 className='mb-2 ml-8'>Order Form</h2>
                <form onSubmit={handleSubmit} className='flex flex-col p-10 rounded-lg ml-8 border-2 border-green-300'>
                    <div className='space-y-4 mt-1'>
                        {FoodItems.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`food-${index}`}
                                    onChange={(e) => handleCheckboxChange(e, index)}
                                    className='mr-4'
                                />
                                <label htmlFor={`food-${index}`} className='mr-8'>
                                    {item.name} - ${item.price}
                                </label>
                                {selectedItems.some((selectedItem) => selectedItem.name === item.name) && (
                                    <div className='flex justify-end -mt-4 ml-8 space-x-4'>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(index, 'dec')}
                                            className='border border-slate-300 shadow-sm rounded-md p-1 w-6 h-6 -mt-1'
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
                                            className='border border-slate-300 shadow-sm rounded-md p-1 w-6 h-6 -mt-1'
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='text-start flex flex-col space-y-4 mt-6'>

                        <div className='flex flex-col space-y-2'>
                            <label>Address:</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='border border-slate-200 w-52 p-1 focus:border-2 focus:bg-slate-100 focus:outline-none transition-all ' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label>Order Status:</label>
                            <input
                                type="text"
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                                className='border border-slate-200 w-52 p-1 focus:border-2 focus:bg-slate-100 focus:outline-none transition-all'
                            />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label>Restaurant Name:</label>
                            <input
                                type="text"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className='border border-slate-200 w-52 p-1 focus:border-2 focus:bg-slate-100 focus:outline-none transition-all'
                            />
                        </div>
                        <button type="submit" className=' p-2 bg-green-400 text-white rounded-lg outline-none'>Submit Order</button>
                    </div>
                </form>
            </div>
            <div className='flex'>
                <div className='flex flex-col'>

                    <div className='ml-56'>
                        {cartItems.orders && cartItems.orders.length > 0 ? (
                            <div>
                                <h2>Orders in Cart:</h2>
                                <ul>
                                    {cartItems.orders.map((order) => (
                                        <li key={order.id} className='mt-4 border border-slate-400 p-4 rounded-lg'>
                                            <p className='mt-1'>Order ID: {order.id}</p>
                                            <p className='mt-1'>User Email: {order.userEmail}</p>
                                            <p className='mt-1'>Restaurant: {order.restaurantName}</p>
                                            <p className='mt-1'>Order Status: {order.orderStatus}</p>
                                            <h4 className='mt-2'>Items:</h4>
                                            <ul>
                                                {order.items.map((item) => (
                                                    <li key={item.id} className='flex space-x-4'>
                                                        <label>
                                                            {item.name}
                                                        </label>
                                                        <label>
                                                            x{item.quantity}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No orders in cart</p>
                        )}
                    </div>
                    <button onClick={handleSubmi}>post</button>
                </div>
            </div>
            
        </div>
    )
}

export default restaurants