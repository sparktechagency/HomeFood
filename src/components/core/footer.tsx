import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { siFacebook, siInstagram, siTiktok } from "simple-icons";
import Image from "next/image";

const socialIcons = [
  { title: "Tiktok", path: siTiktok.path },
  { title: "Instagram", path: siInstagram.path },
  { title: "Facebook", path: siFacebook.path },
  {
    title: "LinkedIn",
    image: true,
    src: "/svg/LinkedIn.svg",
  },
];

const linkSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Imprint", href: "/imprint" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "FAQ", href: "/faq" },
      { label: "Jobs", href: "/jobs" },
      { label: "Terms and conditions", href: "/tnc" },
      { label: "Data Privacy", href: "/data-privacy" },
    ],
  },
  {
    title: "Contact Us",
    links: [{ label: "support123@homefood.com", href: "#" }],
  },
];

function SocialIconButton({ icon }: { icon: (typeof socialIcons)[number] }) {
  return (
    <Button size="icon" className="rounded-full bg-black hover:bg-black/80">
      {icon.image ? (
        <Image
          src={icon.src!}
          height={64}
          width={64}
          alt={icon.title}
          className="size-4"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <title>{icon.title}</title>
          <path d={icon.path!} />
        </svg>
      )}
    </Button>
  );
}

export default function Footer() {
  return (
    <footer className="!py-12 bg-secondary !px-4 md:!px-12">
      <h2 className="text-3xl font-bold">HomeFood</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 !pt-8">
        <div>
          <h3 className="font-bold">Social Media</h3>
          <div className="!pt-4 flex flex-wrap items-center gap-3">
            {socialIcons.map((icon, idx) => (
              <SocialIconButton icon={icon} key={idx} />
            ))}
          </div>
        </div>
        {linkSections.map((section, i) => (
          <div key={i}>
            <h3 className="font-bold">{section.title}</h3>
            <div className="flex flex-col items-start gap-2 !pt-4 font-semibold text-black/70">
              {section.links.map((link, j) => (
                <Link href={link.href} key={j}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
