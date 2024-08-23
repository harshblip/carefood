<div className="font-extralight">
    {
        menu.length > 0 ? menu.map((x, i) => <div key={i}>
            {
                x.card.card.carousel ? x.card.card.carousel.map((y, j) => {
                    q = q + 1
                    return (
                        <div className="flex flex-col">
                            {
                                (x.card.card.title !== title ? <p className="font-bold mt-2"> {title = x.card.card.title} </p> : ''
                                )
                            }
                            <div className="flex">
                                <p className="mt-2"> {y.title} </p>
                                <p className="ml-2 mt-2 mr-2"> {y.dish.info.price / 100} </p>
                                <div className="flex space-x-2">
                                    <Minus onClick={() => cart(j, 'minus', y.title, y.dish.info.price / 100)}
                                        className="hover:cursor-pointer"
                                    />
                                    <p> {count[p + j]} </p>
                                    <Plus onClick={() => cart(j, 'add', y.title, y.dish.info.price / 100)}
                                        className="hover:cursor-pointer"
                                    />
                                    <p> {y.dish.info.price / 100} </p>
                                </div>
                            </div>
                        </div>)
                }
                ) : ''
            }
        </div>) : 'menu length zero brdr'
    }
    {
        p = q
    }
    {
        menu.length > 0 ? menu.map((x, i) => {
            p = q + 1
            return (
                x.card.card.itemCards ? x.card.card.itemCards.map((y, j) => {
                    q = q + 1
                    var ok = j + p;
                    return (
                        <div className="flex flex-col">
                            {(x.card.card.title !== title ?
                                <p className="font-bold mt-2"> {title = x.card.card.title} </p> : ''
                            )}
                            <div className="flex space-x-2 mt-4">
                                <p className="mt-2"> {y.card.info.name} </p>
                                <Minus onClick={() => cart(ok, 'minus', y.card.info.name, y.card.info.price / 100)}
                                    className="hover:cursor-pointer"
                                />
                                <p> {count[p + j]} </p>
                                <Plus onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100)}
                                    className="hover:cursor-pointer"
                                />
                                <p> {y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100} </p>
                                {/* <p className="ml-2 font-bold"> {x.card.card.title} </p> */}
                            </div>
                        </div>
                    )
                }) : ''
            )
        }) : ''
    }
    {
        p = q
    }
    {
        menu.length > 0 ? menu.map(x => <div>
            {
                x.card.card.categories ? x.card.card.categories.map(y => {
                    p = q + 1
                    return (
                        y.itemCards ? y.itemCards.map((z, i) => {
                            q = q + 1
                            var ok = i + p;
                            return (
                                <div className="flex space-x-4 mt-2">
                                    {
                                        (z.card.info.category !== title ?
                                            <p className="font-bold"> {title = z.card.info.category} </p> : ''
                                        )
                                    }
                                    <div className="space-x-2 flex">
                                        <p> {z.card.info.name} </p>
                                        <Minus onClick={() => cart(ok, 'minus', z.card.info.name, z.card.info.name, z.card.info.price / 100)}
                                            className="hover:cursor-pointer"
                                        />
                                        <p> {count[p + i]} daddy </p>
                                        <Plus onClick={() => cart(ok, 'add', z.card.info.name, z.card.info.price ? z.card.info.price / 100 : z.card.info.defaultPrice / 100)}
                                            className="hover:cursor-pointer"
                                        />
                                        <p> {z.card.info.price ? z.card.info.price / 100 : z.card.info.defaultPrice / 100} </p>
                                    </div>
                                </div>)
                        }) : '')
                }) : ''
            }
        </div>) : 'menu length zero brdr'
    }
    <button
        className="bg-transparent p-2 w-24 border rounded-md"
        onClick={() => addCart()}
    > add to cart </button>
</div>


{
    menu.length > 0 ? menu.map((x, i) => {
        p = q + 1
        return <div>
            <Carousel
                opts={{
                    align: "start"
                }}
                className="w-full max-w-4xl ml-32 mb-4"
            >
                <CarouselContent>
                    {x.card.card.itemCards ? x.card.card.itemCards.map((y, j) => {
                        q = q + 1
                        var ok = j + p;
                        return (
                            <div className="flex flex-col mt-12">
                                {(x.card.card.title !== title ?
                                    <p className="font-bold mt-2"> {title = x.card.card.title} </p> : ''
                                )}
                                <CarouselItem key={j} className="md:basis-1/2 lg:basis-1/3 w-32 mt-12 mr-16 rounded-md">
                                    <div>
                                        <Card className="hover:bg-transparent hover:text-white hover:cursor-pointer transition-all text-white w-[11rem] h-[13rem] ">
                                            <CardContent className="flex flex-col text-start p-4">
                                                <Image
                                                    src={CDN_URL + y.card.info.imageId}
                                                    height={0}
                                                    width={80}
                                                    alt='item-image'
                                                    className="ml-8 rounded-md"
                                                />
                                                <p className="text-sm font-medium mt-2"> {y.card.info.name} </p>
                                                <div className="flex items-center absolute bottom-0 -ml-2">
                                                    <BadgeIndianRupee
                                                        className="w-4 text-white -mt-6 mr-1"
                                                    />
                                                    <p className="mb-6 mr-2 text-base"> {y.card.info.price / 100} </p>
                                                </div>
                                                {
                                                    count[p + j] > 0 ? <div className="flex space-x-2 text-xs text-green-500 font-medium"><Minus onClick={() => cart(ok, 'minus', y.card.info.name, y.card.info.price / 100)}
                                                        className="hover:cursor-pointer"
                                                    />
                                                        <p> {count[p + j]} </p>
                                                        <Plus onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100)}
                                                            className="hover:cursor-pointer"
                                                        /></div> : <button
                                                            className="rounded-md bg-white text-gray-600 absolute bottom-0 mb-5 ml-14 font-medium w-24 text-xs"
                                                            onClick={() => cart(ok, 'add', y.card.info.name, y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100)}
                                                        >

                                                    </button>
                                                }

                                                <p> {y.card.info.price ? y.card.info.price / 100 : y.card.info.defaultPrice / 100} </p>
                                                {/* <p className="ml-2 font-bold"> {x.card.card.title} </p> */}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            </div>
                        )
                    }) : ''
                    }
                </CarouselContent>
            </Carousel>
        </div>
    }) : ''
}