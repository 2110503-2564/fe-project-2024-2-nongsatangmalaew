import styles from "./footer.module.css";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

export default async function Footer() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.menucontainer}>
    © 2025 All rights reserved
    </div>
  );
}
