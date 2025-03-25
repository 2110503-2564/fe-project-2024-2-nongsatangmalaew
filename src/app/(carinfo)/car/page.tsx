import getCars from "@/libs/getCars";
import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import CarCatalog from "@/components/CarCatalog";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
// import CardPanel from "@/components/CardPanel";

export default async function Car() {
  const carsPromise = await getCars();
  console.log(carsPromise)
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);
  return (
    <main className="text-center p-10">
      <h1 className="text-3xl font-medium">Select your car</h1>
      <Suspense fallback={<p> Loading...  <LinearProgress /> </p>} >
        <CarCatalog carsJson={carsPromise} />
      </Suspense>
      {/* <hr className="my-10" />
      <h1 className="text-xl font-medium">TRY Client-dise Car Panel</h1>
      <CardPanel /> */}
      {
        (profile.data.role == "admin") ?
          <Link href={'/car/manage'} >
            <button className="bg-black text-white border border-blue-900
      font-semibold py-2 px-2 m-5 rounded z-30 absolute bottom-0 right-0 
      hover:bg-blue-900 hover:text-white hover:boder-transparent" >
              Manage Car
            </button>
            </Link>:null
      }
          </main>
  

  );
}
