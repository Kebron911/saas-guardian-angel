
import { BarChart3, Users, Bolt } from "lucide-react";

const DashboardPreview = () => (
  <section className="py-16 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Dashboard Preview
      </h2>
      <div className="border rounded-2xl shadow-xl bg-gradient-to-br from-purple-50 to-white p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3 bg-white rounded-xl p-5 shadow">
            <BarChart3 size={32} className="text-violet-400" />
            <div>
              <div className="text-2xl font-bold text-gray-800">2,145</div>
              <div className="text-gray-500 text-sm">Active Users</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white rounded-xl p-5 shadow">
            <Bolt size={32} className="text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-gray-800">347</div>
              <div className="text-gray-500 text-sm">AI Actions</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white rounded-xl p-5 shadow">
            <Users size={32} className="text-green-400" />
            <div>
              <div className="text-2xl font-bold text-gray-800">18</div>
              <div className="text-gray-500 text-sm">Teams</div>
            </div>
          </div>
        </div>
        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold text-lg">
          [Beautiful charts and data coming soon!]
        </div>
      </div>
    </div>
  </section>
);

export default DashboardPreview;
