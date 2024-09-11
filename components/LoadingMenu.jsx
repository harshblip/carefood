import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { BadgeIndianRupee } from "lucide-react";

export default function LoadingMenu() {
    return (
        <>
            <Carousel className="max-w-xl sm:max-w-4xl ml-6 sm:ml-32 mb-4">
                <CarouselContent>
                    <CarouselItem className="basis-1/4 sm:basis-1/3 sm:w-32 mt-12 mr-4 sm:mr-24 rounded-md">
                        <div>
                            <Card className="hover:bg-transparent hover:text-white hover:cursor-pointer transition-all text-white w-[12rem] h-[13rem] ">
                                <CardContent className="flex flex-col text-start p-4">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src='/food/food-img.png'
                                            className="w-24 h-24 object-cover rounded-md"
                                            alt='fooditem-image'
                                        />
                                        <div className="w-full flex justify-center truncate">
                                            <p className="text-sm font-semibold mt-2"> loading... </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center absolute bottom-0 -ml-2">
                                        <BadgeIndianRupee
                                            className="w-4 text-white -mt-6 mr-1"
                                        />
                                        <p className="mb-6 mr-2 text-base"> 0.00 </p>
                                    </div>
                                    <button
                                        className="rounded-md bg-white text-gray-600 absolute bottom-0 mb-5 ml-14 font-medium w-24 text-xs"
                                    > <p className="p-2"> Add to cart </p> </button>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </>
    )
}