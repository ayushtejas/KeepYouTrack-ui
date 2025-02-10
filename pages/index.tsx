import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { getUser } from "./api/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  getUser().then((res)=>{

      }).catch((err)=>{
        window.location.href='/auth'
        localStorage.removeItem("token")
      })
  return (
    <>

    </>
  );
}
