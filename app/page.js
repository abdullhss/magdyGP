'use client';

import { ROUTES_MANIFEST } from "next/dist/shared/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Microscope , BrainCircuit, XCircle, CircleDot, CircleCheck, HeartPlus } from "lucide-react";

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0);
  const router = useRouter();

  const handleTryNow = () => {
    router.push("/tryNow");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "1.8M+", label: "Annual Deaths Globally" },
    { number: "#1", label: "Cancer-Related Deaths" },
    { number: "95%", label: "AI Accuracy Rate" },
    { number: "Early", label: "Detection Saves Lives" }
  ];

  const results = [
    {
      type: "NSCLC (Non-Small Cell)",
      description: "Non-Small Cell Lung Carcinoma - The most common type of lung cancer, accounting for about 85% of all cases.",
      color: "from-red-500 to-pink-500",
      icon: <XCircle size={64} />
    },
    {
      type: "SCLC (Small Cell)",
      description: "Small Cell Lung Carcinoma - A more aggressive form that spreads quickly. Represents about 15% of lung cancers.",
      color: "from-yellow-500 to-orange-500",
      icon: <CircleDot size={64} />
    },
    {
      type: "Benign Tissue",
      description: "Non-cancerous tissue that appears normal. Our AI can accurately distinguish between malignant and benign tissues.",
      color: "from-green-500 to-emerald-500",
      icon: <CircleCheck size={64} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white overflow-x-hidden">
      
      {/* Animated Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 animate-float`}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              🫁 AI Cancer Detect
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Architecture', 'Results', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-medium hover:text-pink-400 transition-all duration-300 hover:-translate-y-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in-up">
            AI-Powered Lung Cancer Detection
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up animation-delay-200">
            Revolutionary deep learning technology for early lung cancer detection and classification
          </p>
          <button onClick={handleTryNow} className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-pink-500/25 animate-fade-in-up animation-delay-400">
            Explore Technology
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 hover:shadow-2xl ${
                  currentStat === index ? 'ring-2 ring-pink-400 bg-white/15' : ''
                }`}
              >
                <div className="text-4xl font-bold text-pink-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Understanding Lung Cancer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 group">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-pink-400">
                <Microscope size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">What is Cancer?</h3>
              <p className="text-gray-200 leading-relaxed">
                Cancer is the uncontrolled growth and spread of abnormal cells in the body. It can invade nearby tissues and spread (metastasize) to other parts of the body. Early detection is crucial for effective treatment.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 group">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-pink-400">
                <HeartPlus size={48}/>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Why Focus on Lung Cancer?</h3>
              <p className="text-gray-200 leading-relaxed">
                Lung cancer is the #1 cause of cancer-related deaths globally, responsible for over 1.8 million deaths per year. It's often diagnosed late with poor survival rates.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 group md:col-span-2 lg:col-span-1">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-pink-400">
                <BrainCircuit size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">AI-Powered Solution</h3>
              <p className="text-gray-200 leading-relaxed">
                Complex lung tissue structure makes it ideal for AI-based image analysis. Our deep learning model can detect and classify different types of lung cancer with remarkable accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              System Architecture
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              {['📊 Preprocessing', '🧠 AI Model', '🧪 Testing', '📋 Results'].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-full text-center min-w-[180px] transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse">
                    {step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block text-4xl text-cyan-400 mx-4 animate-bounce">
                      →
                    </div>
                  )}
                  {index < 3 && (
                    <div className="md:hidden text-4xl text-cyan-400 my-4 rotate-90 animate-bounce">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Our advanced pipeline processes medical images through sophisticated preprocessing, 
              deep learning analysis, comprehensive testing, and delivers accurate classification results.
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Detection Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 transition-all duration-500 hover:-translate-y-3 hover:bg-white/15 group"
              >
                <div className={`w-full h-48 bg-gradient-to-br ${result.color} rounded-2xl mb-6 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 text-white`}>
                  {result.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-pink-400">
                  {result.type}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/30 backdrop-blur-lg py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl mb-4">
            &copy; 2025 AI Lung Cancer Detection | Graduation Project | Saving Lives Through Technology
          </p>
          <p className="text-gray-400">
            Early detection saves lives. Technology makes it possible.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
