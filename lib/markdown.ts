// Simple markdown parser - no external dependencies
export const parseMarkdown = (markdown: string): string => {
  let html = markdown;

  // Escape HTML
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-black uppercase mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black uppercase mt-8 mb-4 border-b-2 border-black pb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black uppercase mt-8 mb-4">$1</h1>');

  // Bold and Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-black text-white p-4 my-4 overflow-x-auto font-mono text-sm border-2 border-black"><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 py-0.5 font-mono text-sm border border-black">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener">$1</a>');

  // Unordered lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li class="ml-6 list-disc">$1</li>');
  html = html.replace(/(<li.*<\/li>)\n(<li)/g, '$1$2');
  html = html.replace(/(<li class="ml-6 list-disc">.*<\/li>)/s, '<ul class="my-4">$1</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.*)$/gim, '<li class="ml-6 list-decimal">$1</li>');

  // Blockquotes
  html = html.replace(/^>\s+(.*)$/gim, '<blockquote class="border-l-4 border-black pl-4 my-4 italic bg-gray-100 py-2">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gim, '<hr class="border-t-2 border-black my-8" />');

  // Paragraphs - wrap loose text
  html = html.replace(/^(?!<[a-z])(.*\S.*)$/gim, '<p class="my-4 leading-relaxed">$1</p>');

  // Clean up empty paragraphs
  html = html.replace(/<p class="my-4 leading-relaxed"><\/p>/g, '');

  return html;
};

// Calculate reading time
export const getReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

