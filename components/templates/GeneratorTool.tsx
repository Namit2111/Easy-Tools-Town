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
            <div className="space-y-4">
                <div className="bg-white border-2 border-black p-4 space-y-4 neo-shadow">
                    {title && <h3 className="text-sm font-black uppercase border-b-2 border-black inline-block mb-2">{title}</h3>}

                    {inputs.map((input, idx) => (
                        <div key={idx}>
                            <label className="block font-bold uppercase text-xs mb-1.5">{input.label}</label>
                            {input.type === 'textarea' ? (
                                <textarea
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    className="w-full p-3 border-2 border-black font-mono text-sm h-28"
                                />
                            ) : input.type === 'select' ? (
                                <select
                                    value={input.value}
                                    onChange={(e) => input.onChange(e.target.value)}
                                    className="w-full p-2.5 border-2 border-black font-bold text-sm"
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
                                    className="w-full p-2.5 border-2 border-black font-mono text-sm"
                                />
                            )}
                        </div>
                    ))}

                    <NeoButton onClick={handleGenerate} className="w-full text-sm py-2.5">
                        {actionLabel}
                    </NeoButton>
                </div>

                {result && (
                    <div className="animate-fadeIn bg-[#e8f0ff] border-2 border-black p-4 neo-shadow">
                        <h3 className="text-sm font-black uppercase mb-3">Result</h3>
                        <textarea
                            readOnly
                            value={result}
                            className="w-full p-3 border-2 border-black font-mono text-xs h-32 bg-white mb-3"
                        />
                        <NeoButton onClick={() => navigator.clipboard.writeText(result)} className="w-full text-sm bg-white hover:bg-gray-100 text-black">
                            Copy to Clipboard
                        </NeoButton>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default GeneratorTool;
