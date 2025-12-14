'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NeoButton from '@/components/NeoButton';

// --- Types ---

type Step = 'landing' | 'quiz' | 'loading' | 'result';

interface Question {
    id: number;
    text: string;
    subtext?: string;
    options: { label: string; value: string; emoji: string; hoverText?: string; reactionEmoji?: string }[];
    feedbackMessages?: Record<string, string>;
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
        subtext: "Choose wisely, Santa's watching! 👀",
        options: [
            { label: 'Cozy Fireplace', value: 'cozy', emoji: '🔥', hoverText: 'Warm and fuzzy vibes', reactionEmoji: '🧦' },
            { label: 'Snowy Adventure', value: 'active', emoji: '❄️', hoverText: 'Outdoor winter fun', reactionEmoji: '🦌' },
            { label: 'Glitter & Glam', value: 'fancy', emoji: '✨', hoverText: 'Sparkle all the way', reactionEmoji: '💎' },
            { label: 'Classic Vibe', value: 'classic', emoji: '🎄', hoverText: 'Traditional holiday spirit', reactionEmoji: '🎅' },
        ],
        feedbackMessages: {
            'cozy': "Cozy choice! Santa approves of your hygge vibes 🔥",
            'active': "Adventure seeker! The reindeer are impressed 🦌",
            'fancy': "Ooh, fancy! Someone's getting the premium wrapping paper ✨",
            'classic': "A traditionalist! Respect. 🎄"
        }
    },
    {
        id: 2,
        text: "Pick a holiday treat:",
        subtext: "No judgment... okay, maybe a little 😏",
        options: [
            { label: 'Hot Cocoa', value: 'sweet', emoji: '☕', hoverText: 'With extra marshmallows', reactionEmoji: '☁️' },
            { label: 'Gingerbread', value: 'spicy', emoji: '🍪', hoverText: 'Spicy and nice', reactionEmoji: '🏠' },
            { label: 'Eggnog', value: 'rich', emoji: '🥛', hoverText: 'Creamy goodness', reactionEmoji: '🥃' },
            { label: 'Candy Cane', value: 'minty', emoji: '🍬', hoverText: 'Minty fresh', reactionEmoji: '🌿' },
        ],
        feedbackMessages: {
            'sweet': "Classic! The elves are nodding in approval ☕",
            'spicy': "Spicy choice! You've got good taste 🍪",
            'rich': "Bold move! Living dangerously 🥛",
            'minty': "Refreshing! Your dentist would be proud 🍬"
        }
    },
    {
        id: 3,
        text: "How have you been this year?",
        subtext: "Be honest... we already know 📝",
        options: [
            { label: 'Angelically Good', value: 'good', emoji: '😇', hoverText: 'Halo included', reactionEmoji: '👼' },
            { label: 'A Little Naughty', value: 'naughty', emoji: '😈', hoverText: 'Just a smidge', reactionEmoji: '🔥' },
            { label: 'Totally Chaos', value: 'chaos', emoji: '🤪', hoverText: 'Embrace the madness', reactionEmoji: '🌪️' },
            { label: 'I Tried My Best', value: 'trying', emoji: '😅', hoverText: 'Effort counts!', reactionEmoji: '💪' },
        ],
        feedbackMessages: {
            'good': "Sure you were... *wink* 😇",
            'naughty': "Interesting... *scribbles in naughty list* 😈",
            'chaos': "We respect the honesty! 🤪",
            'trying': "That's the spirit! A+ for effort 😅"
        }
    },
    {
        id: 4,
        text: "What do you want most?",
        subtext: "Dream big... or practical. Your call! 🎁",
        options: [
            { label: 'Something Useful', value: 'useful', emoji: '🛠️', hoverText: 'Practical wins', reactionEmoji: '🔧' },
            { label: 'Something Fun', value: 'fun', emoji: '🎮', hoverText: 'Play time!', reactionEmoji: '🎯' },
            { label: 'Something Relaxing', value: 'chill', emoji: '🧘', hoverText: 'Zen mode activated', reactionEmoji: '🕯️' },
            { label: 'A Surprise!', value: 'surprise', emoji: '🎁', hoverText: 'Mystery box', reactionEmoji: '🎉' },
        ],
        feedbackMessages: {
            'useful': "Practical! The elves appreciate your sensibility 🛠️",
            'fun': "Fun seeker! We like your style 🎮",
            'chill': "Zen master! Namaste 🧘",
            'surprise': "Risk taker! Let's see what happens 🎁"
        }
    },
    {
        id: 5,
        text: "What's your holiday party style?",
        subtext: "How do you party? 🎉",
        options: [
            { label: 'Life of the Party', value: 'party', emoji: '🎉', hoverText: 'Center stage', reactionEmoji: '🎤' },
            { label: 'Wallflower Observer', value: 'wallflower', emoji: '🌸', hoverText: 'Watching from afar', reactionEmoji: '👀' },
            { label: 'Snack Table Guardian', value: 'snacks', emoji: '🍪', hoverText: 'Protecting the goods', reactionEmoji: '🛡️' },
            { label: 'Early Escape Artist', value: 'escape', emoji: '🚪', hoverText: 'Irish goodbye', reactionEmoji: '🏃' },
        ],
        feedbackMessages: {
            'party': "Party animal! The elves want your energy 🎉",
            'wallflower': "Observer mode activated! We see you 🌸",
            'snacks': "Priorities! Someone's gotta guard the cookies 🍪",
            'escape': "Stealth mode! Respect the exit strategy 🚪"
        }
    },
    {
        id: 6,
        text: "Pick your ideal winter activity:",
        subtext: "Cold weather calls for... 🌨️",
        options: [
            { label: 'Building Snowmen', value: 'snowman', emoji: '⛄', hoverText: 'Creative snow art', reactionEmoji: '🎨' },
            { label: 'Indoor Hibernation', value: 'hibernate', emoji: '🛋️', hoverText: 'Cozy mode', reactionEmoji: '😴' },
            { label: 'Extreme Sledding', value: 'sledding', emoji: '🛷', hoverText: 'Need for speed', reactionEmoji: '💨' },
            { label: 'Hot Cocoa Marathon', value: 'cocoa', emoji: '☕', hoverText: 'Endless warmth', reactionEmoji: '♨️' },
        ],
        feedbackMessages: {
            'snowman': "Creative! Frosty would be proud ⛄",
            'hibernate': "Smart! Winter is for sleeping 🛋️",
            'sledding': "Adrenaline junkie! Hold on tight 🛷",
            'cocoa': "Warm and cozy! Perfect choice ☕"
        }
    },
    {
        id: 7,
        text: "What's your wrapping paper strategy?",
        subtext: "The truth comes out... 🎁",
        options: [
            { label: 'Pinterest Perfect', value: 'perfect', emoji: '🎀', hoverText: 'Magazine worthy', reactionEmoji: '📸' },
            { label: 'Chaotic Tape Explosion', value: 'chaos', emoji: '📦', hoverText: 'More tape = more love', reactionEmoji: '🎭' },
            { label: 'Gift Bag Hero', value: 'bag', emoji: '🛍️', hoverText: 'Work smarter', reactionEmoji: '🧠' },
            { label: 'Newspaper Vintage', value: 'newspaper', emoji: '📰', hoverText: 'Eco-friendly', reactionEmoji: '♻️' },
        ],
        feedbackMessages: {
            'perfect': "Martha Stewart vibes! Impressive 🎀",
            'chaos': "It's the thought that counts... right? 📦",
            'bag': "Genius! Why didn't we think of that? 🛍️",
            'newspaper': "Vintage! The elves approve ♻️"
        }
    },
    {
        id: 8,
        text: "Choose your holiday movie vibe:",
        subtext: "What's on your watchlist? 🎬",
        options: [
            { label: 'Classic Nostalgia', value: 'classic', emoji: '🎬', hoverText: 'Old school magic', reactionEmoji: '📺' },
            { label: 'Cheesy Romance', value: 'romance', emoji: '💕', hoverText: 'All the feels', reactionEmoji: '😍' },
            { label: 'Action (Die Hard counts!)', value: 'action', emoji: '💥', hoverText: 'Yippee ki-yay', reactionEmoji: '🔫' },
            { label: 'Animated Magic', value: 'animated', emoji: '✨', hoverText: 'For all ages', reactionEmoji: '🎨' },
        ],
        feedbackMessages: {
            'classic': "Timeless! The elves are crying happy tears 🎬",
            'romance': "Aww! Pass the tissues 💕",
            'action': "Bold choice! We'll allow it 💥",
            'animated': "Magic! Never too old for cartoons ✨"
        }
    },
];

const RESULTS: GiftResult[] = [
    { title: 'A Cozy Blanket Fortress', description: "Because you clearly need to hide from the world until January.", emoji: '🏰' },
    { title: 'Lifetime Supply of Socks', description: "Adulting hits hard. Use them to slide around the kitchen.", emoji: '🧦' },
    { title: 'A Pet Rock', description: "Low maintenance, high listener. The perfect companion.", emoji: '🪨' },
    { title: 'High-Tech Potato Peeler', description: "It's the gadget you never knew you absolutely didn't need.", emoji: '🥔' },
    { title: 'DIY Snowman Kit', description: "Some assembly required. Snow not included.", emoji: '⛄' },
    { title: 'Invisibility Cloak', description: "Perfect for avoiding awkward family conversations.", emoji: '👻' },
    { title: 'Self-Stirring Mug', description: "For when lifting a spoon is just too much effort.", emoji: '☕' },
    { title: 'Singing Fish Trophy', description: "It's the gift that keeps on giving... headaches.", emoji: '🐟' },
    { title: 'Emergency Chocolate Stash', description: "Hidden compartment included. We won't tell.", emoji: '🍫' },
    { title: 'Professional Nap Pillow', description: "Because your couch deserves an upgrade.", emoji: '😴' },
    { title: 'Unicorn Onesie', description: "Embrace your inner magical creature. No judgment here.", emoji: '🦄' },
    { title: 'Glow-in-the-Dark Toilet Paper', description: "For those midnight adventures. Safety first!", emoji: '🧻' },
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
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState('');
    const [selectedReaction, setSelectedReaction] = useState('');

    const handleStart = () => {
        setStep('quiz');
        setCurrentQuestion(0);
        setAnswers({});
        setShowFeedback(false);
    };

    const handleAnswer = (value: string) => {
        const question = QUESTIONS[currentQuestion];
        const selectedOption = question.options.find(opt => opt.value === value);
        const feedback = question.feedbackMessages?.[value] || "Nice choice!";
        
        // Show feedback
        setCurrentFeedback(feedback);
        setSelectedReaction(selectedOption?.reactionEmoji || '🎉');
        setShowFeedback(true);
        
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);

        // Wait for feedback to display, then move to next question
        setTimeout(() => {
            setShowFeedback(false);
            if (currentQuestion < QUESTIONS.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
            } else {
                setStep('loading');
            }
        }, 1500); // 1.5 second delay for feedback
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

                    {/* Feedback Display */}
                    {showFeedback && (
                        <div className="bg-[#F4C542] border-2 border-black p-4 rounded-lg animate-pop text-center">
                            <div className="text-4xl mb-2 animate-bounce">{selectedReaction}</div>
                            <p className="font-bold text-lg text-black">{currentFeedback}</p>
                        </div>
                    )}

                    {/* Question */}
                    {!showFeedback && (
                        <div className="text-center space-y-8 py-4 animate-fade-in">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black uppercase text-gray-800 leading-tight">{question.text}</h2>
                                {question.subtext && (
                                    <p className="text-lg text-gray-600 mt-2 italic">{question.subtext}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {question.options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAnswer(opt.value)}
                                        title={opt.hoverText}
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
                    )}
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

    const ResultView = () => {
        const [showShareModal, setShowShareModal] = useState(false);
        const [copySuccess, setCopySuccess] = useState(false);

        const handleShare = async (platform: string) => {
            const shareText = `I just found out Santa's bringing me ${result?.title}! 🎅 Take the quiz and see what you get!`;
            const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

            if (platform === 'copy-link') {
                try {
                    if (navigator.clipboard) {
                        await navigator.clipboard.writeText(shareUrl);
                    } else {
                        // Fallback
                        const textArea = document.createElement('textarea');
                        textArea.value = shareUrl;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                    }
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                } catch (err) {
                    console.error('Copy failed:', err);
                }
            } else if (platform === 'twitter') {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
            } else if (platform === 'facebook') {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
            } else if (platform === 'whatsapp') {
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
            } else if (platform === 'linkedin') {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
            }
        };

        const tryNativeShare = async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Santa Gift Predictor',
                        text: `I just found out Santa's bringing me ${result?.title}! 🎅`,
                        url: window.location.href
                    });
                } catch (err) {
                    // User cancelled or error - show modal instead
                    setShowShareModal(true);
                }
            } else {
                setShowShareModal(true);
            }
        };

        return (
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
                            onClick={tryNativeShare}
                            aria-label="Share your gift result on social media"
                            className="px-8 py-3 bg-[#F4C542] text-black font-black uppercase rounded-lg border-2 border-black hover:bg-[#e6b63a] transition-colors shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none"
                        >
                            Share Your Gift 🎁
                        </button>
                        <button
                            onClick={handleStart}
                            aria-label="Restart the quiz"
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

                {/* Share Modal */}
                {showShareModal && (
                    <div 
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
                        onClick={() => setShowShareModal(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="share-modal-title"
                    >
                        <div className="bg-white border-4 border-black p-6 rounded-xl max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pop" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 id="share-modal-title" className="text-2xl font-black uppercase">Share Your Gift!</h3>
                                <button 
                                    onClick={() => setShowShareModal(false)} 
                                    className="text-2xl font-bold hover:text-red-500"
                                    aria-label="Close share modal"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="w-full flex items-center gap-3 p-4 bg-white border-2 border-black hover:bg-[#1DA1F2] hover:text-white transition-all font-bold shadow-[2px_2px_0px_0px_black] hover:-translate-y-1"
                                >
                                    <span className="text-2xl">𝕏</span>
                                    <span>Share on Twitter</span>
                                </button>
                                
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="w-full flex items-center gap-3 p-4 bg-white border-2 border-black hover:bg-[#4267B2] hover:text-white transition-all font-bold shadow-[2px_2px_0px_0px_black] hover:-translate-y-1"
                                >
                                    <span className="text-2xl">📘</span>
                                    <span>Share on Facebook</span>
                                </button>
                                
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="w-full flex items-center gap-3 p-4 bg-white border-2 border-black hover:bg-[#25D366] hover:text-white transition-all font-bold shadow-[2px_2px_0px_0px_black] hover:-translate-y-1"
                                >
                                    <span className="text-2xl">💬</span>
                                    <span>Share on WhatsApp</span>
                                </button>
                                
                                <button
                                    onClick={() => handleShare('linkedin')}
                                    className="w-full flex items-center gap-3 p-4 bg-white border-2 border-black hover:bg-[#0077B5] hover:text-white transition-all font-bold shadow-[2px_2px_0px_0px_black] hover:-translate-y-1"
                                >
                                    <span className="text-2xl">💼</span>
                                    <span>Share on LinkedIn</span>
                                </button>
                                
                                <button
                                    onClick={() => handleShare('copy-link')}
                                    className="w-full flex items-center gap-3 p-4 bg-[#F4C542] border-2 border-black hover:bg-[#e6b63a] transition-all font-bold shadow-[2px_2px_0px_0px_black] hover:-translate-y-1"
                                >
                                    <span className="text-2xl">🔗</span>
                                    <span>{copySuccess ? 'Copied! ✓' : 'Copy Link'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

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
