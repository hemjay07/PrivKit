'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'terminal', label: 'Demo' },
  { id: 'templates', label: 'Templates' },
  { id: 'features', label: 'Features' },
];

export function StickyNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > 200);

      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      aria-label="Page navigation"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`group flex items-center justify-end gap-2 transition-opacity duration-150 ${
            activeSection === section.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
          }`}
          aria-label={`Navigate to ${section.label}`}
          aria-current={activeSection === section.id ? 'true' : undefined}
        >
          <span className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            {section.label}
          </span>
          <span
            className={`w-2 h-2 rounded-full transition-all duration-150 ${
              activeSection === section.id
                ? 'bg-primary scale-125'
                : 'bg-zinc-600 group-hover:bg-zinc-400'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
