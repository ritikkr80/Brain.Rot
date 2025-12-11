import React, { useState, useEffect } from 'react';
import { Brain, Skull, Sparkles, Download, Share2, AlertCircle, TrendingUp } from 'lucide-react';

export default function BrainRotIndex() {
  const [stage, setStage] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [memeClicked, setMemeClicked] = useState(false);
  const [mathClicked, setMathClicked] = useState(false);
  const [scores, setScores] = useState([]);
  const [showMeme, setShowMeme] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const questions = [
    {
      meme: { emoji: "🤪", text: "ice spice", hint: "y2k" },
      math: { problem: "12 - 4", answer: 8 },
      difficulty: "baby mode"
    },
    {
      meme: { emoji: "😭", text: "bro is NOT", hint: "him" },
      math: { problem: "7 × 3", answer: 21 },
      difficulty: "still easy"
    },
    {
      meme: { emoji: "💀", text: "nah i'd win", hint: "jjk" },
      math: { problem: "45 + 28", answer: 73 },
      difficulty: "getting real"
    },
    {
      meme: { emoji: "🗿", text: "just put the fries in the bag", hint: "lil bro" },
      math: { problem: "15% of 80", answer: 12 },
      difficulty: "touch grass"
    },
    {
      meme: { emoji: "🧠", text: "only in ohio", hint: "final boss" },
      math: { problem: "18 × 6", answer: 108 },
      difficulty: "PhD level"
    }
  ];

  useEffect(() => {
    if (stage === 'question' && !showMeme) {
      const timer = setTimeout(() => setShowMeme(true), 500);
      return () => clearTimeout(timer);
    }
  }, [stage, currentQuestion, showMeme]);

  const startTest = () => {
    setStage('question');
    setStartTime(Date.now());
    setShowMeme(false);
  };

  const handleMemeClick = () => {
    if (!memeClicked && !mathClicked) {
      const time = Date.now() - startTime;
      setMemeClicked(true);
      setScores([...scores, { brainRot: true, time }]);
      setTimeout(moveToNext, 1000);
    }
  };

  const handleMathClick = () => {
    if (!mathClicked && !memeClicked) {
      const time = Date.now() - startTime;
      setMathClicked(true);
      setScores([...scores, { brainRot: false, time }]);
      setTimeout(moveToNext, 1000);
    }
  };

  const moveToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setMemeClicked(false);
      setMathClicked(false);
      setShowMeme(false);
      setStartTime(Date.now());
    } else {
      setStage('results');
    }
  };

  const calculateResults = () => {
    const rotCount = scores.filter(s => s.brainRot).length;
    const rotPercentage = Math.round((rotCount / scores.length) * 100);
    const avgTime = scores.reduce((sum, s) => sum + s.time, 0) / scores.length / 1000;

    let diagnosis = "";
    let severity = "";
    let emoji = "";
    let color = "";

    if (rotPercentage >= 80) {
      diagnosis = "TERMINAL BRAIN ROT";
      severity = "Critical - Immediate intervention required";
      emoji = "💀";
      color = "from-red-600 to-red-800";
    } else if (rotPercentage >= 60) {
      diagnosis = "SEVERE DOPAMINE POISONING";
      severity = "Advanced - Your brain is cooked";
      emoji = "🤪";
      color = "from-orange-600 to-red-600";
    } else if (rotPercentage >= 40) {
      diagnosis = "MODERATE SCREEN ADDICTION";
      severity = "Concerning - Touch grass recommended";
      emoji = "😵‍💫";
      color = "from-yellow-600 to-orange-600";
    } else if (rotPercentage >= 20) {
      diagnosis = "MILD CONTENT OVERLOAD";
      severity = "Manageable - But still chronically online";
      emoji = "😬";
      color = "from-blue-600 to-yellow-600";
    } else {
      diagnosis = "SURPRISINGLY HEALTHY";
      severity = "Rare - Are you even real?";
      emoji = "🧠";
      color = "from-green-600 to-blue-600";
    }

    return { rotPercentage, avgTime: avgTime.toFixed(2), diagnosis, severity, emoji, color };
  };

  if (stage === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="inline-block mb-6 relative">
              <Brain className="w-24 h-24 text-purple-500 animate-pulse" />
              <Skull className="w-12 h-12 text-red-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              DO I HAVE
              <br />
              BRAIN ROT?
            </h1>
            <p className="text-2xl text-gray-400 mb-2">the official diagnostic test</p>
            <p className="text-sm text-gray-600">certified by absolutely no medical professionals</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-red-900/30 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-sm mb-8">
            <div className="flex items-start gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">How It Works:</h3>
                <p className="text-gray-300 mb-4">
                  We'll show you a trending meme and a simple math problem at the same time.
                </p>
                <p className="text-gray-300 mb-4">
                  Click whichever you recognize first.
                </p>
                <p className="text-red-400 font-semibold">
                  If you consistently click the meme before solving the math... 
                  <span className="block mt-1">your brain is officially rotted.</span>
                </p>
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-yellow-500/20">
              <p className="text-yellow-400 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Warning: Results may be brutally honest
              </p>
            </div>
          </div>

          <button
            onClick={startTest}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-2xl font-black py-6 rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/50 mb-4"
          >
            START DIAGNOSIS
          </button>

          <p className="text-center text-gray-600 text-sm">
            spoiler: you probably do have it
          </p>
        </div>
      </div>
    );
  }

  if (stage === 'question') {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Question {currentQuestion + 1}/5</span>
              <span className="text-purple-400 text-sm uppercase tracking-wider">{question.difficulty}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {memeClicked ? "💀 Brain Rot Confirmed" : mathClicked ? "🧠 Not Bad" : "Quick! Which One First?"}
            </h2>
            <p className="text-gray-400">
              {!memeClicked && !mathClicked && "Click the one you recognize/solve first"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Meme Side */}
            <button
              onClick={handleMemeClick}
              disabled={memeClicked || mathClicked}
              className={`relative h-80 rounded-3xl overflow-hidden transition-all transform ${
                memeClicked 
                  ? 'bg-gradient-to-br from-red-600 to-red-800 scale-105 ring-4 ring-red-500' 
                  : mathClicked
                  ? 'bg-gray-800 opacity-50 scale-95'
                  : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:scale-105 cursor-pointer'
              } disabled:cursor-not-allowed border-4 ${memeClicked ? 'border-red-500' : 'border-purple-500/30'}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                {!showMeme && !memeClicked && !mathClicked ? (
                  <div className="text-6xl animate-pulse">🤔</div>
                ) : (
                  <>
                    <div className="text-8xl mb-4 animate-bounce">{question.meme.emoji}</div>
                    <div className="text-3xl font-black mb-2 text-center">"{question.meme.text}"</div>
                    <div className="text-sm text-white/70">({question.meme.hint})</div>
                  </>
                )}
              </div>
              {memeClicked && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ROTTED
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-center">
                <p className="font-bold text-lg">THE MEME</p>
              </div>
            </button>

            {/* Math Side */}
            <button
              onClick={handleMathClick}
              disabled={memeClicked || mathClicked}
              className={`relative h-80 rounded-3xl overflow-hidden transition-all transform ${
                mathClicked 
                  ? 'bg-gradient-to-br from-green-600 to-blue-600 scale-105 ring-4 ring-green-500' 
                  : memeClicked
                  ? 'bg-gray-800 opacity-50 scale-95'
                  : 'bg-gradient-to-br from-blue-600 to-cyan-600 hover:scale-105 cursor-pointer'
              } disabled:cursor-not-allowed border-4 ${mathClicked ? 'border-green-500' : 'border-blue-500/30'}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="text-7xl font-black mb-6">{question.math.problem}</div>
                <div className="text-3xl text-white/70">= ?</div>
              </div>
              {mathClicked && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  SMART
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-center">
                <p className="font-bold text-lg">THE MATH</p>
              </div>
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-12 rounded-full transition-all ${
                  idx < currentQuestion
                    ? scores[idx].brainRot
                      ? 'bg-red-500'
                      : 'bg-green-500'
                    : idx === currentQuestion
                    ? 'bg-purple-500 animate-pulse'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'results') {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Medical Report Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-4 border-red-500 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">Medical Report</p>
                  <p className="text-xs text-gray-600">Issued: {new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-6xl">{results.emoji}</div>
              </div>

              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-2">DIAGNOSIS:</p>
                <h2 className={`text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r ${results.color} text-transparent bg-clip-text`}>
                  {results.diagnosis}
                </h2>
                <p className="text-gray-400 text-lg">{results.severity}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 rounded-xl p-4 border border-red-500/30">
                  <div className="text-4xl font-black text-red-500">{results.rotPercentage}%</div>
                  <div className="text-gray-400 text-sm">Brain Rot Level</div>
                </div>
                <div className="bg-black/40 rounded-xl p-4 border border-purple-500/30">
                  <div className="text-4xl font-black text-purple-500">{results.avgTime}s</div>
                  <div className="text-gray-400 text-sm">Avg Response Time</div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
                <p className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  PRESCRIPTION:
                </p>
                <p className="text-white text-lg">
                  10 minutes of Matiks daily
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Side effects may include: increased intelligence, faster thinking, flexing on your friends
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://matiks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 rounded-xl transition-all text-center"
                >
                  GET TREATMENT →
                </a>
                
                <button
                  onClick={() => {
                    setStage('landing');
                    setCurrentQuestion(0);
                    setScores([]);
                    setMemeClicked(false);
                    setMathClicked(false);
                  }}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Test Again
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              Share your diagnosis and tag someone worse than you
            </p>
            <div className="flex gap-4 justify-center">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-purple-900/20 rounded-xl border border-purple-500/20 text-center">
            <p className="text-gray-400 text-sm">
              Built by people who definitely have brain rot • Not actual medical advice • 
              <a href="https://matiks.com" className="text-purple-400 hover:text-purple-300 ml-1">Powered by Matiks</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
