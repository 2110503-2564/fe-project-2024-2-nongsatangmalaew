import Link from "next/link";
import Card from "./Card";
import { CarItem, CarsJson } from "../../interface";


export default async function CarCatalog({carsJson}: {carsJson:CarsJson}) {

    const carsJsonReady = await carsJson;

    return (
        <>
        <h1>Select Your Car In Our Catalog</h1>
        <div style={{margin: "20px", display: "flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                carsJsonReady.data.map((CarItem:CarItem) => (
                    <Link href={`/car/${CarItem.id}`} 
                    className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] 
                    p-2 sm:p-4 md:p-4 lg:p-8">
                        <Card carName={CarItem.name} imgSrc={CarItem.picture}/>
                    </Link>
                ))
            }
        </div>
        
        </>
    );

}