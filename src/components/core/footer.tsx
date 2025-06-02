import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { siFacebook, siInstagram, siTiktok } from "simple-icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="!py-12 bg-secondary !px-4 md:!px-12">
      <h2 className="text-3xl font-bold">HomeFood</h2>
      <div className="w-full grid grid-cols-4 gap-12 !pt-8">
        <div className="">
          <h3 className="font-bold">Social Media</h3>
          <div className="!pt-4 flex flex-row justify-start items-center gap-2">
            <Button
              size="icon"
              className="rounded-full bg-black hover:bg-black/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <title>Tiktok</title>
                <path d={siTiktok.path} />
              </svg>
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-black hover:bg-black/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <title>Instagram</title>
                <path d={siInstagram.path} />
              </svg>
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-black hover:bg-black/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <title>Facebook</title>
                <path d={siFacebook.path} />
              </svg>
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-black hover:bg-black/80"
            >
              <Image
                src={"/svg/LinkedIn.svg"}
                height={64}
                width={64}
                alt="LinkedIn"
                className="size-4"
              />
            </Button>
          </div>
        </div>
        <div className="">
          <h3 className="font-bold">Quick Links</h3>
          <div className="flex flex-col justify-start items-start gap-2 !pt-4 font-semibold text-black/70">
            <Link href={"/login"}>Log in</Link>
            <Link href={"/register"}>Register</Link>
            <Link href={"/imprint"}>Imprint</Link>
          </div>
        </div>
        <div className="">
          <h3 className="font-bold">Company</h3>
          <div className="flex flex-col justify-start items-start gap-2 !pt-4 font-semibold text-black/70">
            <Link href={"/about"}>About Us</Link>
            <Link href={"/how-it-works"}>How it works</Link>
            <Link href={"/jobs"}>Jobs</Link>
            <Link href={"/tnc"}>Terms and conditions</Link>
            <Link href={"/data-privacy"}>Data Privacy</Link>
          </div>
        </div>
        <div className="">
          <h3 className="font-bold">Contact Us</h3>
          <div className="flex flex-col justify-start items-start gap-2 !pt-4 font-semibold text-black/70">
            <Link href={"#"}>support123@homefood.com</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
