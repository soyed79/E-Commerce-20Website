import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 2-3 business days. Express delivery is available in selected areas with 24-48 hour delivery time.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most products. Items must be in original condition with all packaging. Return shipping is free on orders over ৳ 500.",
    },
    {
      question: "Do you deliver outside Dhaka?",
      answer:
        "Yes! We deliver to major cities across Bangladesh. Shipping costs vary by location. Check during checkout for exact rates.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Cash on Delivery (COD), bKash, Nagad, Rocket, and credit/debit cards (Visa, MasterCard).",
    },
    {
      question: "How can I track my order?",
      answer:
        "You'll receive a tracking number via email and SMS after your order is confirmed. Track your order in your dashboard.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes! We use 256-bit SSL encryption to protect all payment information. All transactions are secure and verified.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "You can cancel orders within 1 hour of placing them. After that, the order enters the picking process and cannot be modified.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, gift wrapping is available for most products at a small additional cost. Select this option during checkout.",
    },
    {
      question: "What should I do if I receive a damaged product?",
      answer:
        "Please contact our support team immediately with photos of the damage. We'll arrange a replacement or refund within 24 hours.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via email (support@easymart.bd), phone (+880 1800-123456), or through the live chat on our website.",
    },
  ];

  const toggleItem = (index: number) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenItems(newOpen);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about Easy Mart
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary transition-colors"
                >
                  <span className="font-semibold text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${
                      openItems.has(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItems.has(index) && (
                  <div className="px-6 py-4 border-t border-border bg-secondary">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-primary text-primary-foreground rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
            <p className="mb-4">
              Can't find the answer you're looking for? Our support team is here
              to help.
            </p>
            <a
              href="mailto:support@easymart.bd"
              className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
