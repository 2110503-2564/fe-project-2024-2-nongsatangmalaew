"use client"

import { useReducer } from "react";
import Card from "./Card";
import Link from "next/link";

export default function CardPanel() {

    let defaultCar = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]);

    const cardReducer = (
        carList: Map<string, number>, action: { type: string; carName: string; rating?: number }
    ) => {
        const newCarList = new Map(carList);
        switch(action.type) {
            case 'add' : {
                newCarList.set(action.carName, action.rating??0);
                return newCarList;
            }
            case 'remove' : {
                newCarList.delete(action.carName);
                return newCarList
            }
            default: return carList;
        }
    }

    const [ carList, dispatchCompare ] = useReducer(cardReducer, defaultCar);

    const mockCarRepo = [
        {cid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
        {cid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
        {cid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"},

    ]

    return (
        <div>
            <div className="m-[20px] flex flex-row flew-wrap justify-around content-around">
                {
                    mockCarRepo.map((carItem) => (
                        <Link href={`/car/${carItem.cid}`} className="w-1/5">
                            <Card carName={carItem.model} imgSrc={carItem.image} onRatingChange={(car : string, rate : number) => dispatchCompare({type : 'add', carName : car, rating : rate})}/>
                        </Link>
                    ))
                }
            </div>
            <div className="pl-[20px]">
                <div className="w-full text-xl font-medium">Car List with Rating: {carList.size}</div>
                {Array.from(carList).map(([carName, rating]) => (
                    <div 
                        key={carName} 
                        data-testid={carName} 
                        onClick={() => dispatchCompare({ type: "remove", carName })}
                    >
                        {carName} Rating: {rating}
                    </div>
                ))}
            </div>
        </div>
    );
}