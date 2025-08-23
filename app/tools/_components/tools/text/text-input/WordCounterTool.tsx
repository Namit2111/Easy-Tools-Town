import TextInputTemplate from "../../../templates/TextInputTemplate";

interface WordCounterToolProps {
  tool: {
    name: string;
    description: string;
    category: string;
  };
}

export default function WordCounterTool({ tool }: WordCounterToolProps) {
  const processText = (text: string): string => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const lines = text.split('\n');

    return `Word Count: ${words.length}
Character Count: ${characters}
Character Count (no spaces): ${charactersNoSpaces}
Paragraph Count: ${paragraphs.length}
Sentence Count: ${sentences.length}
Line Count: ${lines.length}

Reading Time: ${Math.ceil(words.length / 200)} minutes (average reading speed)
Speaking Time: ${Math.ceil(words.length / 150)} minutes (average speaking speed)`;
  };

  return (
    <TextInputTemplate
      tool={tool}
      placeholder="Paste your text here to count words, characters, paragraphs, and more..."
      outputLabel="Statistics"
      onProcess={processText}
    />
  );
}