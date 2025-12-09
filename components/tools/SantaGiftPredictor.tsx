'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NeoButton from '@/components/NeoButton';

// --- Types ---

type Step = 'landing' | 'quiz' | 'loading' | 'result';

interface Question {
    id: number;
    text: string;
    options: { label: string; value: string; emoji: string }[];
}

interface GiftResult {
    title: string;
    description: string;
    emoji: string;
}

// --- Data ---

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What's your favorite holiday aesthetic?",
        options: [
            { label: 'Cozy Fireplace', value: 'cozy', emoji: '🔥' },
            { label: 'Snowy Adventure', value: 'active', emoji: '❄️' },
            { label: 'Glitter & Glam', value: 'fancy', emoji: '✨' },
            { label: 'Classic Vibe', value: 'classic', emoji: '🎄' },
        ],
    },
    {
        id: 2,
        text: "Pick a holiday treat:",
        options: [
            { label: 'Hot Cocoa', value: 'sweet', emoji: '☕' },
            { label: 'Gingerbread', value: 'spicy', emoji: '🍪' },
            { label: 'Eggnog', value: 'rich', emoji: '🥛' },
            { label: 'Candy Cane', value: 'minty', emoji: '🍬' },
        ],
    },
    {
        id: 3,
        text: "How have you been this year?",
        options: [
            { label: 'Angelically Good', value: 'good', emoji: '😇' },
            { label: 'A Little Naughty', value: 'naughty', emoji: '😈' },
            { label: 'Totally Chaos', value: 'chaos', emoji: '🤪' },
            { label: 'I Tried My Best', value: 'trying', emoji: '😅' },
        ],
    },
    {
        id: 4,
        text: "What do you want most?",
        options: [
            { label: 'Something Useful', value: 'useful', emoji: '🛠️' },
            { label: 'Something Fun', value: 'fun', emoji: '🎮' },
            { label: 'Something Relaxing', value: 'chill', emoji: '🧘' },
            { label: 'A Surprise!', value: 'surprise', emoji: '🎁' },
        ],
    },
];

const RESULTS: GiftResult[] = [
    { title: 'A Cozy Blanket Fortress', description: "Because you clearly need to hide from the world until January.", emoji: '🏰' },
    { title: 'Lifetime Supply of Socks', description: "Adulting hits hard. Use them to slide around the kitchen.", emoji: '🧦' },
    { title: 'A Pet Rock', description: "Low maintenance, high listener. The perfect companion.", emoji: '🪨' },
    { title: 'High-Tech Potato Peeler', description: "It's the gadget you never knew you absolutely didn't need.", emoji: '🥔' },
    { title: 'DIY Snowman Kit', description: "Some assembly required. Snow not included.", emoji: '⛄' },
    { title: 'Invisibility Cloak', description: "Perfect for avoiding awkward family conversations.", emoji: '👻' },
];

// --- Sub-components ---

const Snowflakes = () => {
    const [snowflakes, setSnowflakes] = useState<Array<{
        left: number;
        duration: number;
        delay: number;
        size: number;
    }>>([]);

    useEffect(() => {
        // Generate snowflakes only on client side to avoid hydration mismatch
        setSnowflakes(
            Array.from({ length: 50 }).map(() => ({
                left: Math.random() * 100,
                duration: Math.random() * 5 + 5,
                delay: Math.random() * 5,
                size: Math.random() * 1.5 + 0.5,
            }))
        );
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            {snowflakes.map((flake, i) => (
                <div
                    key={i}
                    className="snowflake absolute text-white opacity-80"
                    style={{
                        left: `${flake.left}%`,
                        animationDuration: `${flake.duration}s`,
                        animationDelay: `${flake.delay}s`,
                        fontSize: `${flake.size}rem`,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};

const ChristmasCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`
    bg-white border-4 border-[#1E7A3D] p-6 md:p-10 
    rounded-3xl shadow-[8px_8px_0px_0px_#F4C542] 
    transform transition-all duration-300
    relative z-10 w-full max-w-2xl
    ${className}
  `}>
        {children}
    </div>
);

// --- Main Component ---

export const SantaGiftPredictor = () => {
    const [step, setStep] = useState<Step>('landing');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<GiftResult | null>(null);

    const handleStart = () => {
        setStep('quiz');
        setCurrentQuestion(0);
        setAnswers({});
    };

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [QUESTIONS[currentQuestion].id]: value };
        setAnswers(newAnswers);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setStep('loading');
        }
    };

    useEffect(() => {
        if (step === 'loading') {
            const timer = setTimeout(() => {
                const randomResult = RESULTS[Math.floor(Math.random() * RESULTS.length)];
                setResult(randomResult);
                setStep('result');
            }, 3000); // 3 seconds loading
            return () => clearTimeout(timer);
        }
    }, [step]);

    // --- Views ---

    const LandingView = () => (
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in relative z-10 px-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 blur-3xl rounded-full pointer-events-none" />

            <div className="bg-white p-6 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce-slow">
                <div className="text-8xl">🎅</div>
            </div>

            <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-black uppercase text-white drop-shadow-[4px_4px_0px_rgba(30,122,61,1)] tracking-tighter transform -rotate-2">
                    Santa's Gift <br /><span className="text-[#F4C542]">Predictor</span>
                </h1>
                <p className="text-xl md:text-2xl font-bold text-white max-w-lg mx-auto drop-shadow-md">
                    Not sure what you deserve this year? Let the North Pole decide! 🎄
                </p>
            </div>

            <button
                onClick={handleStart}
                className="
          px-12 py-5 text-2xl font-black uppercase tracking-widest
          bg-[#F4C542] text-[#D9382E]
          border-4 border-black rounded-xl
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          active:translate-x-2 active:translate-y-2 active:shadow-none
          transition-all duration-150
          animate-pulse-slow
        "
            >
                Start Quiz 🎁
            </button>
        </div>
    );

    const QuizView = () => {
        const question = QUESTIONS[currentQuestion];
        const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

        return (
            <ChristmasCard className="animate-slide-up">
                <div className="w-full space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-4">
                        <span className="font-bold text-[#1E7A3D] uppercase tracking-wider">Question {currentQuestion + 1} / {QUESTIONS.length}</span>
                        <span className="text-2xl">🎄</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-6 border-2 border-black rounded-full overflow-hidden relative shadow-inner">
                        <div
                            className="h-full bg-[repeating-linear-gradient(45deg,#D9382E,#D9382E_10px,#ffffff_10px,#ffffff_20px)] transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Question */}
                    <div className="text-center space-y-8 py-4">
                        <h2 className="text-3xl md:text-4xl font-black uppercase text-gray-800 leading-tight">{question.text}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {question.options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleAnswer(opt.value)}
                                    className="
                    group relative bg-white border-2 border-black p-4 md:p-6 
                    rounded-xl
                    hover:bg-[#1E7A3D] hover:text-white hover:border-[#1E7A3D]
                    transition-all duration-200
                    text-left flex items-center gap-4
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]
                    hover:shadow-[4px_4px_0px_0px_#F4C542]
                    hover:-translate-y-1
                  "
                                >
                                    <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{opt.emoji}</span>
                                    <span className="font-bold text-lg md:text-xl uppercase">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </ChristmasCard>
        );
    };

    const LoadingView = () => (
        <div className="flex flex-col items-center justify-center space-y-8 z-10 p-4">
            <div className="bg-white p-12 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_#1E7A3D] animate-bounce">
                <div className="text-9xl animate-wiggle">🎁</div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-black uppercase text-white drop-shadow-lg animate-pulse">
                    Checking List...
                </h2>
                <p className="text-xl text-white font-bold bg-black/20 px-4 py-1 rounded-full">
                    (Checking for coal mainly...)
                </p>
            </div>
        </div>
    );

    const ResultView = () => (
        <div className="w-full max-w-3xl px-4 z-10 animate-zoom-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase text-white drop-shadow-[4px_4px_0px_#D9382E] -rotate-2">
                    Your Gift Is...
                </h2>
            </div>

            <div className="relative bg-white border-8 border-double border-[#D9382E] p-8 md:p-12 rounded-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] text-center transform rotate-1">
                {/* Confetti / Decor */}
                <div className="absolute -top-6 -left-6 text-6xl animate-bounce-slow" style={{ animationDelay: '0s' }}>🎄</div>
                <div className="absolute -bottom-6 -right-6 text-6xl animate-bounce-slow" style={{ animationDelay: '1s' }}>❄️</div>

                <div className="mb-6">
                    <div className="text-[120px] leading-none mb-4 animate-pop">{result?.emoji}</div>
                    <div className="inline-block bg-[#F4C542] px-6 py-2 border-2 border-black -rotate-1 shadow-[4px_4px_0px_0px_black] mb-6">
                        <h3 className="text-2xl md:text-4xl font-black uppercase text-black">{result?.title}</h3>
                    </div>
                    <p className="text-xl md:text-2xl font-bold text-gray-600 max-w-lg mx-auto leading-relaxed">
                        {result?.description}
                    </p>
                </div>

                <div className="flex flex-col gap-4 justify-center pt-8 border-t-4 border-dotted border-gray-200">
                    <button
                        onClick={handleStart}
                        className="px-8 py-3 bg-[#1E7A3D] text-white font-black uppercase rounded-lg border-2 border-black hover:bg-[#155a2d] transition-colors shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none"
                    >
                        Play Again ↻
                    </button>
                    <Link
                        href="/tools"
                        className="text-gray-500 font-bold hover:text-[#D9382E] underline decoration-2 underline-offset-4"
                    >
                        ← Back to Easy Tools Town
                    </Link>
                </div>
            </div>
        </div>
    );

    // --- Render ---

    return (
        <div className="min-h-screen w-full bg-[#D9382E] relative overflow-hidden font-sans selection:bg-[#F4C542] selection:text-black">
            {/* Background Gradient & Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 20%, #ffffff 2px, transparent 2px), 
            radial-gradient(circle at 80% 60%, #ffffff 2px, transparent 2px)
          `,
                    backgroundSize: '100px 100px'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#D9382E] to-[#921c15] z-0" />

            {/* Snow Effect */}
            <Snowflakes />

            {/* Helper Nav (Only on non-landing pages for cleaner look, or always visible) */}
            {step !== 'landing' && (
                <div className="absolute top-4 left-4 z-50">
                    <Link href="/tools" className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black] hover:-translate-y-1 transition-transform">
                        <span className="text-xl font-bold">←</span>
                    </Link>
                </div>
            )}

            {/* Main Content Area */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12">
                {step === 'landing' && <LandingView />}
                {step === 'quiz' && <QuizView />}
                {step === 'loading' && <LoadingView />}
                {step === 'result' && <ResultView />}
            </div>

            {/* Global CSS for this component's animations */}
            <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(-5vw); }
          100% { transform: translateY(105vh) translateX(5vw); }
        }
        .snowflake {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.3s infinite ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
         @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoom-in {
          animation: zoom-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-pop {
          animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
        </div>
    );
};

export default SantaGiftPredictor;
