"use client";

import Image from "next/image";
import { Rating } from '@mui/material'
import InteractiveCard from "./InteractiveCard";
import { useState } from 'react';

export default function Card( { carName, imgSrc, onRatingChange } : { carName: string, imgSrc: string, onRatingChange?: Function } ) {

    const [value, setValue] = useState<number | null>(0);


    return(
        <InteractiveCard Element={ carName }>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc} alt="Product Picture" fill={true} className="object-cover rounded-lg"/>
            </div>
            <div className="w-full h-[15%] p-[10px]">
                {carName}
                <div className="mt-2">
                    {
                        onRatingChange? <div onClick={ (e) => { e.stopPropagation(); }}>
                            <Rating
                                id={`${carName} Rating`}
                                name={`${carName} Rating`}
                                data-testid={`${carName} Rating`}
                                value={value}
                                onChange={(event, newValue) => {
                                    event.stopPropagation();
                                    setValue(newValue);
                                    onRatingChange(carName,newValue);
                                }}
                            />
                        </div> : ''
                    }
                </div>
            </div>
        </InteractiveCard>
    );
}