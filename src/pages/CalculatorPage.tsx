import React, { useEffect } from "react";
import Calculator from "@/components/calculator/Calculator";
import PageHeader from "@/components/PageHeader";


const CalculatorPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return ( 
    <>
      <PageHeader />
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto mt-12">
          <div className="text-center mb-12">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              What a 24/7 AI Receptionist Could Save You
            </h1>
            <p className="font-lato text-xl text-gray-600 max-w-2xl mx-auto">
              Calculate how much you're losing—and how much you could save—by switching to an AI Phone Receptionist.
            </p>
          </div>
          
          <Calculator />
          
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-lg italic text-gray-600 mb-2">
                "Within 2 weeks of switching, we stopped losing leads."
              </p>
              <p className="font-medium">— Erica, Dental Practice Owner</p>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              We've saved over $750,000 for small businesses this year.
            </p>
          </div>
        </div>
      </div>
    </>
  );
 };

export default CalculatorPage;
