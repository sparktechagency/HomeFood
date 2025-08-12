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




// varient tow-----------------------------------------------

// import React from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { siFacebook, siInstagram, siTiktok } from "simple-icons";
// import Image from "next/image";

// const socialIcons = [
//   { title: "Tiktok", path: siTiktok.path, color: siTiktok.hex },
//   { title: "Instagram", path: siInstagram.path, color: siInstagram.hex },
//   { title: "Facebook", path: siFacebook.path, color: siFacebook.hex },
//   // { title: "LinkedIn", path: siLinkedin.path, color: siLinkedin.hex },
// ];

// const linkSections = [
//   {
//     title: "Quick Links",
//     links: [
//       { label: "Log in", href: "/login" },
//       { label: "Register", href: "/register" },
//       { label: "Imprint", href: "/imprint" },
//     ],
//   },
//   {
//     title: "Company",
//     links: [
//       { label: "About Us", href: "/about" },
//       { label: "How it works", href: "/how-it-works" },
//       { label: "FAQ", href: "/faq" },
//       { label: "Careers", href: "/careers" },
//       { label: "Terms and conditions", href: "/terms" },
//       { label: "Privacy Policy", href: "/privacy" },
//     ],
//   },
//   {
//     title: "Contact",
//     links: [
//       { label: "support@homefood.com", href: "mailto:support@homefood.com" },
//       { label: "+1 (555) 123-4567", href: "tel:+15551234567" },
//       { label: "123 Food St, San Francisco, CA", href: "#" },
//     ],
//   },
// ];

// function SocialIconButton({ icon }: { icon: (typeof socialIcons)[number] }) {
//   return (
//     <Button
//       size="icon"
//       variant="ghost"
//       className="rounded-full hover:bg-white/10 transition-colors duration-200"
//       aria-label={icon.title}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         role="img"
//         viewBox="0 0 24 24"
//         fill={icon.color}
//         className="w-5 h-5"
//       >
//         <title>{icon.title}</title>
//         <path d={icon.path} />
//       </svg>
//     </Button>
//   );
// }

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#2E7D4E] text-white py-12 px-4 md:px-8 lg:px-16">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
//           <div className="max-w-sm">
//             <h2 className="text-3xl font-bold mb-4">HomeFood</h2>
//             <p className="text-white/80 mb-4">
//               Delivering home-cooked meals with love since 2015. Connecting food lovers with talented home chefs in your community.
//             </p>
//             <div className="flex gap-3">
//               {socialIcons.map((icon, idx) => (
//                 <SocialIconButton icon={icon} key={idx} />
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
//             {linkSections.map((section, i) => (
//               <div key={i}>
//                 <h3 className="font-bold text-lg mb-4">{section.title}</h3>
//                 <ul className="space-y-2">
//                   {section.links.map((link, j) => (
//                     <li key={j}>
//                       <Link
//                         href={link.href}
//                         className="text-white/80 hover:text-white transition-colors duration-200"
//                       >
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-white/60 text-sm">
//             © {currentYear} HomeFood. All rights reserved.
//           </p>
//           <div className="flex gap-4 text-sm">
//             <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-200">
//               Terms of Service
//             </Link>
//             <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-200">
//               Privacy Policy
//             </Link>
//             <Link href="/cookies" className="text-white/60 hover:text-white transition-colors duration-200">
//               Cookie Policy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

