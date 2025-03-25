"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import {useSession} from 'next-auth/react'


export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg", "/img/cover4.jpg"];
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const {data:session} = useSession()
  console.log(session);
  // console.log(session?.user.token);

  return (
    <div
      className={styles.banner}
      onClick={() => {
        setIndex(index + 1);
        alert(index % 4);
      }}
    >
      <Image
        src={covers[index % 4]}
        alt="cover"
        fill={true}
        priority
        objectFit="cover"
      />

      <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium">
          where every event finds its car
        </h1>
        <h3 className="text-xl font-serif">
          Renting the perfect car has never been easier. Whether it's a
          wedding corporate event, or private party, we are always connecting people to the
          perfect place.
        </h3>
      </div>
      {
        session?<div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl">Welcome {session.user?.name}</div>:null
      }
      <button className='bg-white text-blue-900 border border-blue-900
      font-semibold py-2 px-2 m-5 rounded z-30 absolute bottom-0 right-0 
      hover:bg-blue-900 hover:text-white hover:boder-transparent' onClick={(e) => { e.stopPropagation(); router.push('/car') }}>
        Select Your Car@@
      </button>
    </div>
  );
}
