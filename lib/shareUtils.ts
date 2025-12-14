// Share utility functions for Santa Gift Predictor

export interface SharePlatform {
  name: 'twitter' | 'facebook' | 'whatsapp' | 'linkedin' | 'copy-link';
  icon: string;
  label: string;
  shareUrl: (text: string, url: string) => string;
  available: boolean;
}

export const SHARE_PLATFORMS: SharePlatform[] = [
  {
    name: 'twitter',
    icon: '𝕏',
    label: 'Twitter',
    shareUrl: (text, url) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    available: true
  },
  {
    name: 'facebook',
    icon: '📘',
    label: 'Facebook',
    shareUrl: (text, url) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    available: true
  },
  {
    name: 'whatsapp',
    icon: '💬',
    label: 'WhatsApp',
    shareUrl: (text, url) => 
      `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    available: true
  },
  {
    name: 'linkedin',
    icon: '💼',
    label: 'LinkedIn',
    shareUrl: (text, url) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    available: true
  },
  {
    name: 'copy-link',
    icon: '🔗',
    label: 'Copy Link',
    shareUrl: (text, url) => url,
    available: true
  }
];

export const getShareText = (giftTitle: string): string => {
  return `I just found out Santa's bringing me ${giftTitle}! 🎅 Take the quiz and see what you get!`;
};

export const getShareUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin + '/tools/misc/santa-predictor';
  }
  return 'https://easytoolstown.com/tools/misc/santa-predictor';
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const canUseNativeShare = (): boolean => {
  return typeof navigator !== 'undefined' && 'share' in navigator;
};

export const nativeShare = async (title: string, text: string, url: string): Promise<boolean> => {
  try {
    if (canUseNativeShare()) {
      await navigator.share({
        title,
        text,
        url
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error('Native share failed:', err);
    return false;
  }
};
