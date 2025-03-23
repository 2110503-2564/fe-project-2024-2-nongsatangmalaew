import Link from "next/link";
import Card from "./Card";
import { CarItem, CarsJson } from "../../interface";


export default async function CarCatalog({CarsJson}: {CarsJson:Promise<CarsJson>}) {

    const CarsJsonReady = await CarsJson;

    return (
        <>
        <h1>Select Your Car In Our Catalog</h1>
        <div style={{margin: "20px", display: "flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                CarsJsonReady.data.map((CarItem:CarItem) => (
                    <Link href={`/car/${CarItem.id}`} className="w-1/5">
                        <Card carName={CarItem.model} imgSrc={CarItem.picture}/>
                    </Link>
                ))
            }
        </div>
        
        </>
    );

}