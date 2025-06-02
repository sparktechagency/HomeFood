import React from "react";

export default function Page() {
  return (
    <main className="!py-12 !space-y-6">
      <h1 className="text-center font-bold text-4xl text-primary">Imprint</h1>

      <div className="max-w-6xl !mx-auto !space-y-6">
        <p>
          For inquiries regarding legal matters, compliance, or business
          operations, please contact us using the details provided below
        </p>
        <h2 className="text-xl font-semibold">📍 Visit Us</h2>
        <p className="">
          HomeFood <br /> Berliner Straße 52 <br />
          EMEA 90763 Olympiapark, Munich <br /> Germany
        </p>
        <h2 className="text-xl font-semibold">📞 Phone / WhatsApp:</h2>
        <p className="">
          ☎️ Customer Service: [Your Phone Number] <br />⏰ Hours: [e.g.,
          Mon-Sun, 9 AM - 9 PM]
        </p>
        <h2 className="text-xl font-semibold">✉️ Email:</h2>
        <p className="">
          ✉️ General Inquiries: [your.email@example.com] <br />
          🍽️ Customer Support: [support@example.com] <br />
          🤝 Partnerships/Catering: [partners@example.com]
        </p>
      </div>
    </main>
  );
}
