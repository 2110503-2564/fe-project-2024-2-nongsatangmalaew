export default async function getCar(id:string){
    // const response = await fetch(`https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues/${id}`);
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${id}`);
    if(!response.ok){
        throw new Error("Failed to fetch car");
    }
    return await response.json();
}