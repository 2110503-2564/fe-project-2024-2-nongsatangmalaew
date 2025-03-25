export default async function getCar(id:string){
    // const response = await fetch(`https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues/${id}`);
    const token = process.env.TOKEN;
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${id}`,
    {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache'
        }
    }
    );
    if(!response.ok){
        throw new Error("Failed to fetch cars");
    }
    return await response.json() ;
}