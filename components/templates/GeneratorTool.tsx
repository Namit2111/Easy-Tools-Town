'use client';

import React, { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import NeoButton from '@/components/NeoButton';

interface GeneratorToolProps {
    toolId: string;
    title?: string;
    inputs: {
        label: string;
        type: 'text' | 'number' | 'range' | 'select' | 'textarea';
        value: any;
        onChange: (val: any) => void;
        options?: string[];
        min?: number;
        max?: number;
    }[];
    onGenerate: () => Promise<string>;
    actionLabel?: string;
}

const GeneratorTool: React.FC<GeneratorToolProps> = ({ toolId, title, inputs, onGenerate, actionLabel = "Generate" }) => {
    const [result, setResult] = useState<string>('');

    const handleGenerate = async () => {
        const res = await onGenerate();
        setResult(res);
    };

    return (
        <ToolLayout toolId={toolId}>
            <div className="space-y-5">
                <div className="bg-white border-2 border-black p-5 space-y-5 neo-shadow">
                    {title && <h3 className="text-lg font-black uppercase border-b-2 border-black inline-block mb-3">{title}</h3>}

                    {inputs.map((input, idx) => (
                        <div key={idx}>
                            <label className="block font-bold uppercase text-sm mb-2">{input.label}</label>
                            {input.type === 'textarea' ? (
                                <textarea
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    className="w-full p-3 border-2 border-black font-mono h-32"
                                />
                            ) : input.type === 'select' ? (
                                <select
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    className="w-full p-3 border-2 border-black font-bold"
                                >
                                    {input.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : (
                                <input
                                    type={input.type}
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    min={input.min}
                                    max={input.max}
                                    className="w-full p-3 border-2 border-black font-mono"
                                />
                            )}
                        </div>
                    ))}

                    <NeoButton onClick={handleGenerate} className="w-full py-3">
                        {actionLabel}
                    </NeoButton>
                </div>

                {result && (
                    <div className="animate-fadeIn bg-[#e8f0ff] border-2 border-black p-5 neo-shadow">
                        <h3 className="text-lg font-black uppercase mb-3">Result</h3>
                        <textarea
                            readOnly
                            value={result}
                            className="w-full p-3 border-2 border-black font-mono text-sm h-36 bg-white mb-4"
                        />
                        <NeoButton onClick={() => navigator.clipboard.writeText(result)} className="w-full bg-white hover:bg-gray-100 text-black">
                            Copy to Clipboard
                        </NeoButton>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default GeneratorTool;
