import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";
export default async function CarDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const carDetail = await getCar(params.cid);

    return (
    <main className="text-center p-5">
      {/* model */}
      <h1 className="text-lg font-medium">{carDetail.data.model}</h1>
      <div className="flex my-5">
        <Image
          src={carDetail.data.picture}
          alt="Car Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="grid grid-cols-1 gap-x-4 text-left mx-5">
          <div className="font-medium">Doors: {carDetail.data.doors}</div>
          <div className="font-medium"> Seats: {carDetail.data.seats} </div>
          <div className="font-medium"> Large Bags: {carDetail.data.largebags}</div>
          <div className="font-medium"> Small Bags: {carDetail.data.smallbags} </div>
          <div className="font-medium"> Daily Rate: {carDetail.data.dayRate} (insurance included)</div>
          <Link href={`/booking?id=${params.cid}&model=${carDetail.data.model}`} >
            <button
              className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
              name="Book Car" >
             Make Booking 
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
