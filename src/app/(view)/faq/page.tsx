import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Array of humorous FAQ data
const faqs = [
  {
    value: "item-1",
    question: "Why did the scarecrow win an award?",
    answer: "Because he was outstanding in his field!",
  },
  {
    value: "item-2",
    question: "What do you call a boomerang that won’t come back?",
    answer: "A stick.",
  },
  {
    value: "item-3",
    question: "What's orange and sounds like a parrot?",
    answer: "A carrot.",
  },
  {
    value: "item-4",
    question: "Why don't scientists trust atoms?",
    answer: "Because they make up everything!",
  },
  {
    value: "item-5",
    question: "I told my wife she was drawing her eyebrows too high.",
    answer: "She looked surprised.",
  },
  {
    value: "item-6",
    question: "What do you call a fake noodle?",
    answer: "An impasta.",
  },
  {
    value: "item-7",
    question: "Why did the bicycle fall over?",
    answer: "Because it was two-tired!",
  },
  {
    value: "item-8",
    question: "What’s the best thing about Switzerland?",
    answer: "I don't know, but the flag is a big plus.",
  },
  {
    value: "item-9",
    question: "How do you organize a space party?",
    answer: "You planet!",
  },
  {
    value: "item-10",
    question: "What do you call a sad strawberry?",
    answer: "A blueberry.",
  },
  {
    value: "item-11",
    question:
      "Did you hear about the highly addictive new restaurant on the moon?",
    answer: "It has great food but no atmosphere.",
  },
  {
    value: "item-12",
    question: "Why did the coffee file a police report?",
    answer: "It got mugged.",
  },
  {
    value: "item-13",
    question: "What do you get if you cross a snowman and a vampire?",
    answer: "Frostbite.",
  },
  {
    value: "item-14",
    question: "Why did the math book look sad?",
    answer: "Because it had too many problems.",
  },
  {
    value: "item-15",
    question: "What's a vampire's favorite fruit?",
    answer: "A nectarine!",
  },
  {
    value: "item-16",
    question: "My dog used to chase people on a bike.",
    answer: "It got so bad, we had to take his bike away.",
  },
  {
    value: "item-17",
    question: "What do you call cheese that isn't yours?",
    answer: "Nacho cheese!",
  },
  {
    value: "item-18",
    question: "Why don't eggs tell jokes?",
    answer: "Because they'd crack each other up!",
  },
  {
    value: "item-19",
    question: "What's brown and sticky?",
    answer: "A stick.",
  },
  {
    value: "item-20",
    question: "How do you make a tissue dance?",
    answer: "You put a little boogie in it!",
  },
  {
    value: "item-21",
    question: "What do you call a fish with no eyes?",
    answer: "Fsh.",
  },
  {
    value: "item-22",
    question: "Why did the man run around his bed?",
    answer: "Because he was trying to catch up on his sleep!",
  },
  {
    value: "item-23",
    question: "What's the difference between a guitar and a fish?",
    answer: "You can tune a guitar, but you can't tuna fish!",
  },
  {
    value: "item-24",
    question: "What did one wall say to the other wall?",
    answer: "I'll meet you at the corner!",
  },
];

export default function Page() {
  return (
    <main className="!py-12 !space-y-6 !p-6">
      <h1 className="text-center font-bold text-4xl text-primary">
        Frequently Asked Questions
      </h1>
      <div className="!mt-12">
        <div className="container !mx-auto bg-zinc-100 rounded-lg !p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
}
