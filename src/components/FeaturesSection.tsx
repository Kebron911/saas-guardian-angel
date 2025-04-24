
import { Rocket, ShieldCheck, Code2, Users } from "lucide-react";

const features = [
  {
    icon: <Rocket className="text-purple-500" size={32} />,
    title: "Launch Fast",
    description: "Deploy your SaaS in minutes with our production-ready templates."
  },
  {
    icon: <ShieldCheck className="text-pink-500" size={32} />,
    title: "Secure Auth",
    description: "User authentication and permissions baked in for peace of mind."
  },
  {
    icon: <Code2 className="text-blue-500" size={32} />,
    title: "Modern Stack",
    description: "Built with React, Tailwind, shadcn/ui, lucide icons, and more."
  },
  {
    icon: <Users className="text-green-500" size={32} />,
    title: "Scalable & Team Ready",
    description: "Invite your team and grow—multi-user and organization support."
  }
];

const FeaturesSection = () => (
  <section className="py-16 bg-white" id="features">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Features
      </h2>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-7 shadow-sm flex flex-col items-center hover:shadow-lg transition-shadow">
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{f.title}</h3>
            <p className="text-gray-600 text-center">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
