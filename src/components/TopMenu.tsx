import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
    <div className={styles.menucontainer}>
      <Image
        src={"/img/logo.png"}
        className={styles.logoimg}
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
      />

      <TopMenuItem title="Select Car" pageRef="/car" />
      <TopMenuItem title="Home" pageRef="/" />




      <div className="flex flex-row absolute right-0 h-full">
        <div className="flex items-center ml-auto">
          {session ? <TopMenuItem title={session.user.role === "admin" ? 'Bookings' : 'My Bookings'} pageRef='/mybooking' /> : null}
          <TopMenuItem title='Select Car' pageRef='/car' />
        </div>
        <TopMenuItem title='Cart' pageRef='/cart' />
        {session ? (
          <Link href="/api/auth/signout">
            <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
              Sign-Out {session.user?.name}
            </div>
          </Link>
        ) : (
          <>
            <Link href="/register">
              <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
                Register
              </div>
            </Link>
            <Link href="/api/auth/signin">
              <div className="flex items-center h-full px-2 text-cyan-600 text-sm">
                Sign-In
              </div>
            </Link>
          </>
        )}

      </div>

    </div>
  );
}
