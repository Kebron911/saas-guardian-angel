
const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect to try things out.",
    features: [
      "All essential features",
      "Single user",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "$12/mo",
    description: "For growing teams.",
    features: [
      "Everything in Starter",
      "Five team members",
      "Priority support"
    ]
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "For large orgs needing custom help.",
    features: [
      "Custom integrations",
      "Unlimited users",
      "White-glove onboarding"
    ]
  }
];

const PricingSection = () => (
  <section id="pricing" className="py-16 bg-gradient-to-b from-white via-purple-50 to-white">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Pricing</h2>
      <div className="flex flex-col md:flex-row gap-7 justify-center">
        {plans.map((plan, idx) => (
          <div key={idx} className={`flex-1 bg-white border rounded-2xl shadow-md p-8 flex flex-col mb-4 ${plan.name === "Pro" ? "border-purple-500 shadow-purple-100 scale-105 z-10" : ""}`}>
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-extrabold text-gray-900 mb-2">{plan.price}</div>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) =>
                <li key={i} className="text-sm text-gray-800">&#10003; {feature}</li>
              )}
            </ul>
            <a href="#get-started" className={`mt-auto text-white text-center font-bold rounded-lg py-2 px-4 transition-all 
              ${plan.name === "Pro" ? "bg-purple-600 hover:bg-purple-700 shadow" : "bg-gray-400 hover:bg-gray-500"}`}>
              {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
