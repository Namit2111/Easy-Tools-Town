import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TOOLS } from '../data/constants';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Find tool data if on a tool page
    const toolPath = location.pathname;
    const tool = TOOLS.find(t => t.path === toolPath);
    
    let pageTitle = 'Easy Tools Town - Free Online PDF, Image & Document Tools';
    let pageDescription = 'Free online tools for PDF merging, image compression, resizing, and more. No login required.';

    if (tool) {
      pageTitle = `${tool.name} - Free Online Tool | Easy Tools Town`;
      pageDescription = `${tool.description} Free, fast, and secure. No login required.`;
    } else if (title) {
      pageTitle = `${title} | Easy Tools Town`;
    }

    if (description) {
      pageDescription = description;
    }

    // Update document title
    document.title = pageTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    // Update OG tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', pageDescription);
    }

    // Update Twitter tags
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', pageTitle);
    }

    let twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', pageDescription);
    }

  }, [location.pathname, title, description]);

  return null;
};

export default SEO;

// Hook for easy use in components
export const usePageTitle = (title: string, description?: string) => {
  useEffect(() => {
    const fullTitle = `${title} | Easy Tools Town`;
    document.title = fullTitle;

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    return () => {
      document.title = 'Easy Tools Town - Free Online PDF, Image & Document Tools';
    };
  }, [title, description]);
};

