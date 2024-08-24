{
    count[p + j] > 0 ? <div className="flex space-x-2 text-xs text-green-500 font-medium">
        <Minus onClick={() => cart(ok, 'minus', y.card.info.name, y.card.info.price / 100)}
            className="hover:cursor-pointer"
        />
        <p> {count[p + j]} </p>
        <Plus onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100)}
            className="hover:cursor-pointer"
        />
    </div> : <button
        className="rounded-md bg-white text-gray-600 absolute bottom-0 mb-5 ml-14 font-medium w-24 text-xs"
        onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100)}
    > <p className="p-2"> Add to cart </p> </button>
}