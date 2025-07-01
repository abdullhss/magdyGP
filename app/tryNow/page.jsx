'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

const TryNowPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Simulate AI analysis with different results
const simulateAnalysis = useCallback(() => {
  setIsAnalyzing(true);
  
  // Simulate API call delay
  setTimeout(() => {
    const results = [
      {
        type: 'NSCLC (Non-Small Cell Carcinoma)',
        confidence: 94.7,
        severity: 'High Risk',
        color: 'from-red-500 to-pink-600',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        icon: '🔴',
        recommendation: 'Immediate medical consultation required. Early stage NSCLC detected with high confidence.',
        details: 'Non-small cell lung carcinoma represents 85% of lung cancer cases. Early detection significantly improves treatment outcomes.'
      },
      {
        type: 'SCLC (Small Cell Carcinoma)',
        confidence: 89.3,
        severity: 'Critical Risk',
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        icon: '🟡',
        recommendation: 'Urgent medical attention required. Aggressive form of lung cancer detected.',
        details: 'Small cell lung carcinoma is more aggressive and spreads quickly. Immediate intervention is crucial.'
      },
      {
        type: 'Benign Tissue',
        confidence: 96.8,
        severity: 'No Risk',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        icon: '🟢',
        recommendation: 'No cancerous tissue detected. Continue regular health screenings.',
        details: 'Tissue appears normal with no signs of malignancy. Regular monitoring recommended.'
      }
    ];
    
    // Determine result based on file name
    let resultIndex = 2; // Default to Benign
    if (uploadedImage) {
      const fileName = uploadedImage.name.toLowerCase();
      
      if (fileName.includes('squamous')) {
        resultIndex = 0; // NSCLC
      } else if (fileName.includes('oat')) {
        resultIndex = 1; // SCLC
      }
    }
    
    setAnalysisResult(results[resultIndex]);
    setIsAnalyzing(false);
  }, 3000);
}, [uploadedImage]); // Add uploadedImage to dependencies

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    // Reset previous results
    setAnalysisResult(null);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${10 + i * 2}s`
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
            <button 
              onClick={() => window.history.back()}
              className="bg-white/10 backdrop-blur-lg px-6 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              ← Back to Home
            </button>
          </nav>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-pink-200 to-cyan-200 bg-clip-text text-transparent">
            Try AI Detection
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Upload a lung scan image and let our AI analyze it for potential cancer detection. 
            Get instant results with confidence scores and recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Upload Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-pink-400">Upload Medical Image</h2>
            
            {!imagePreview ? (
              <div
                className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-pink-400 bg-pink-400/10' 
                    : 'border-white/30 bg-white/5 hover:border-pink-400/50 hover:bg-white/10'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="text-6xl">📁</div>
                  <div>
                    <p className="text-xl font-semibold mb-2">
                      Drag & drop your medical image here
                    </p>
                    <p className="text-gray-300">
                      or click to browse files
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    Supports: JPEG, PNG, DICOM • Max size: 10MB
                  </div>
                </div>
                
                <input
                  type="file"
                  accept="image/*,.dcm"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Uploaded medical scan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{uploadedImage?.name}</p>
                    <p className="text-sm text-gray-300">
                      {(uploadedImage?.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={resetUpload}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-full border border-red-500/30 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            {imagePreview && !isAnalyzing && !analysisResult && (
              <button
                onClick={simulateAnalysis}
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                🔬 Analyze with AI
              </button>
            )}

            {/* Processing State */}
            {isAnalyzing && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
                <div className="animate-spin w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-2">Analyzing Image...</h3>
                <p className="text-gray-300">Our AI is processing your medical scan</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preprocessing...</span>
                    <span className="text-green-400">✓</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Feature extraction...</span>
                    <span className="text-yellow-400">⟳</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Classification...</span>
                    <span className="text-gray-400">○</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Analysis Results</h2>
            
            {!analysisResult && !isAnalyzing && (
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 text-center">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <p className="text-xl text-gray-400">
                  Upload an image to see AI analysis results here
                </p>
              </div>
            )}

            {analysisResult && (
              <div className={`${analysisResult.bgColor} backdrop-blur-lg rounded-3xl p-8 border ${analysisResult.borderColor} transition-all duration-500 hover:scale-105`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{analysisResult.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{analysisResult.type}</h3>
                      <p className={`text-sm font-semibold ${
                        analysisResult.severity === 'No Risk' ? 'text-green-400' :
                        analysisResult.severity === 'High Risk' ? 'text-orange-400' :
                        'text-red-400'
                      }`}>
                        {analysisResult.severity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{analysisResult.confidence}%</div>
                    <div className="text-sm text-gray-300">Confidence</div>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Confidence Level</span>
                    <span>{analysisResult.confidence}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${analysisResult.color} h-3 rounded-full transition-all duration-1000`}
                      style={{ width: `${analysisResult.confidence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-white/10 rounded-2xl p-6 mb-4">
                  <h4 className="font-bold mb-2 text-pink-400">🏥 Medical Recommendation</h4>
                  <p className="text-gray-200">{analysisResult.recommendation}</p>
                </div>

                {/* Details */}
                <div className="bg-white/10 rounded-2xl p-6">
                  <h4 className="font-bold mb-2 text-cyan-400">📋 Clinical Details</h4>
                  <p className="text-gray-200">{analysisResult.details}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button 
                    onClick={resetUpload}
                    className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    🔄 Try Another Image
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 px-6 py-3 rounded-xl transition-all duration-300">
                    📄 Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 bg-yellow-500/10 backdrop-blur-lg rounded-3xl p-8 border border-yellow-500/30 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Medical Disclaimer</h3>
          <p className="text-gray-200 max-w-4xl mx-auto leading-relaxed">
            This AI tool is for educational and demonstration purposes only. Results should not be used for actual medical diagnosis. 
            Always consult with qualified healthcare professionals for proper medical evaluation and treatment decisions.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }
        
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TryNowPage;