import React, { useState } from 'react';
import ToolLayout from '../ToolLayout';
import NeoButton from '../NeoButton';

interface GeneratorToolProps {
    toolId: string;
    title?: string;
    inputs: {
        label: string;
        type: 'text' | 'number' | 'range' | 'select' | 'textarea';
        value: any;
        onChange: (val: any) => void;
        options?: string[]; // For select
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
            <div className="space-y-8">
                <div className="bg-white border-4 border-black p-8 space-y-6 neo-shadow">
                    {title && <h3 className="text-2xl font-black uppercase border-b-4 border-black inline-block mb-4">{title}</h3>}

                    {inputs.map((input, idx) => (
                        <div key={idx}>
                            <label className="block font-bold uppercase mb-2">{input.label}</label>
                            {input.type === 'textarea' ? (
                                <textarea
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    className="w-full p-4 border-2 border-black font-mono text-lg h-32"
                                />
                            ) : input.type === 'select' ? (
                                <select
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    className="w-full p-4 border-2 border-black font-bold text-lg"
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
                                    className="w-full p-4 border-2 border-black font-mono text-lg"
                                />
                            )}
                        </div>
                    ))}

                    <NeoButton onClick={handleGenerate} className="w-full text-xl py-4">
                        {actionLabel}
                    </NeoButton>
                </div>

                {result && (
                    <div className="animate-fadeIn bg-[#bdb2ff] border-4 border-black p-8 neo-shadow">
                        <h3 className="text-2xl font-black uppercase mb-4">Result</h3>
                        <textarea
                            readOnly
                            value={result}
                            className="w-full p-4 border-2 border-black font-mono text-sm h-48 bg-white mb-4"
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
