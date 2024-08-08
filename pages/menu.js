import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux"

export default function menu() {
    const restId = useSelector(state => state.location.restId)
    const x = useSelector(state => state.location.x);
    const y = useSelector(state => state.location.y);

    console.log(restId, x, y);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get(`https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=${y}&lng=${x}&&submitAction=ENTER&restaurantId=${restId}`)

                if (response.status === 200) {
                    console.log(response.data);
                }
            }
        )()
    })

    return (
        <>

        </>
    )
}