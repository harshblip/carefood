{
data.orders ? data.orders.map((x, i) => data.orders[i].items.map(
    (y, j) => <div className="w-full bg-white rounded-md flex justify-between p-4">
        <div className="text-gray-600">
            {y.name}
        </div>
        <div className="flex space-x-4">
            <div className="flex space-x-2 border border-gray-300 rounded-md text-green-500 font-bold">
                <Minus
                    className="w-6  hover:bg-green-300 hover:text-white hover:cursor-pointer text-lg transition-all p-[0.4rem] rounded-md hover:border hover:border-white"
                    onClick={() => adjustItem(j, data, 'minus', y.name, y.quantity, i)}
                />
                {
                    !click[j] ? <p> {y.quantity} </p> : <p> {click[j]}  </p>
                }
                <Plus
                    className="w-6 hover:bg-green-300 hover:text-white transition-all p-[0.4rem] hover:cursor-pointer rounded-md
                    hover:border hover:border-white"
                    onClick={() => adjustItem(j, data, 'add', y.name, y.quantity, i)}
                />
            </div>
            <div className="h-4 border-r-2  mt-[5px] ml-2">
            </div>
            <OctagonX
                className="w-5 text-red-400 hover:cursor-pointer"
                onClick={() => deleteOrdur(x.id, y.id, 'item')}
            />
            <div className="h-4 border-r-2  mt-[5px] ml-2">
            </div>
            <p> {Math.round(y.price)} </p>
        </div>
    </div>)
) : ''
}
<hr
className="w-full border-dashed border-2"
/>
<div className="flex space-x-2 ml-1">
<PlusCircle
    className="w-4 text-gray-400"
/>
<p className="text-gray-400 text-sm mt-[0.5px]"> Add more items </p>
</div>
<hr
className="w-full border-dashed border-2"
/>
{
data.orders ? data.orders.map(x => <div className="flex flex-col">
    <div className="flex justify-between text-[#8ac4a7] font-semibold text-end mt-4">
        <div className="flex space-x-2 text-sm text-start">
            <div className="flex flex-col space-y-2">
                <div className="flex">
                    <BadgeIndianRupee className="w-5 text-green-400" />
                    <p className="text-2xl -mt-1 ml-2"> {x.totalAmt} </p>
                </div>
                <p className="text-[#8ac4a7] font-semibold opacity-40 text-start"> {x.orderTime} </p>
            </div>
        </div>
        <div className="flex flex-col space-x-2 justify-end">
            <p className="text-4xl"> {x.restaurantName} </p>
            <div className="flex">
                <p className="text-[0.7rem] mt-0"> {x.address} </p>
                <Pin className="w-4 text-emerald-500" />
            </div>
        </div>
    </div>
</div>) : ''
}