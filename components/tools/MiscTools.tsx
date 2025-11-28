import React from 'react';
import GenerativeTool from '../templates/GenerativeTool';
import { generateText } from '../../services/geminiService';

export const TranslatorTool = () => {
  return (
    <GenerativeTool
      toolId="misc-trans"
      inputType="custom"
      buttonLabel="Translate"
      renderCustomInput={(state, setState) => {
        // state shape: { text: string, lang: string }
        const values = state || { text: '', lang: 'Spanish' };
        
        const update = (key: string, val: string) => {
          setState({ ...values, [key]: val });
        };

        return (
          <div className="space-y-4">
             <label className="block font-bold mb-2">Text to translate:</label>
             <textarea 
               value={values.text} 
               onChange={e => update('text', e.target.value)}
               className="w-full p-4 border-2 border-black h-40 focus:neo-shadow focus:outline-none" 
               placeholder="Enter text here..."
             />
             <label className="block font-bold mb-2">Target Language:</label>
            <select 
              value={values.lang} 
              onChange={e => update('lang', e.target.value)}
              className="w-full p-4 border-2 border-black bg-white"
            >
              {['Spanish', 'French', 'Japanese', 'German', 'Chinese', 'Russian', 'Pirate Speak'].map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        );
      }}
      onGenerate={async (input) => {
        const { text, lang } = input || { text: '', lang: 'Spanish' };
        const prompt = `Translate the following text into ${lang}. Only return the translation:\n\n${text}`;
        return await generateText(prompt, "You are a professional translator.");
      }}
    />
  );
};

export const IdeaTool = () => {
  return (
    <GenerativeTool
      toolId="misc-idea"
      inputType="custom"
      buttonLabel="SPARK CHAOS"
      renderCustomInput={() => (
        <div className="text-center py-4">
          <p className="text-xl font-bold">Click below to generate a random idea.</p>
        </div>
      )}
      onGenerate={async () => {
        const prompt = `Generate a random, crazy, but potentially useful idea for a new software tool or physical gadget. Be concise and bold.`;
        return await generateText(prompt);
      }}
      renderResult={(result) => (
        <div className="bg-white border-4 border-black p-8 text-2xl font-bold rotate-1 neo-shadow text-center">
            {result}
        </div>
      )}
    />
  );
};