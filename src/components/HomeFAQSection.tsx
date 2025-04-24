
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is an AI Phone Receptionist?",
    answer: "An AI Phone Receptionist is a virtual assistant that handles incoming calls, routes inquiries, and provides customer service 24/7."
  },
  {
    question: "How does it work?",
    answer: "The AI uses advanced algorithms to understand caller intent and direct calls to the appropriate department or person."
  },
  {
    question: "Can it handle multiple languages?",
    answer: "Yes, our AI Phone Receptionist can communicate in multiple languages, making it suitable for international clients."
  },
  {
    question: "Is it customizable?",
    answer: "Absolutely! You can customize the AI's responses and scripts to match your brand's voice and specific needs."
  },
  {
    question: "What are the benefits of using an AI Phone Receptionist?",
    answer: "Benefits include cost savings, improved customer experience, enhanced productivity, and 24/7 availability."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply sign up on our website, and our team will guide you through the setup process."
  }
];

const HomeFAQSection = () => (
  <section id="faq" className="faq bg-white py-24">
    <div className="container max-w-[1200px] mx-auto px-5">
      <div className="section-header text-center mb-20">
        <h2 className="text-3xl md:text-4xl text-[#1A237E] font-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-lg text-[#666] max-w-2xl mx-auto">Get answers to common questions about our AI Phone Receptionist service.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-[#1A237E] font-bold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default HomeFAQSection;
