import React, { useState, useRef, useEffect } from 'react';
import { ThemeId } from '../types/agent';
import { THEME_OPTIONS } from '../data/themeData';
import { Palette, Check, ChevronDown, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeOption =
    THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border cursor-pointer theme-selector-btn"
        title="Switch color theme (Dark, Bark, Light, Ambient, Light Green, Light Pink)"
      >
        {/* Swatch indicator */}
        <span
          className="w-3.5 h-3.5 rounded-full border shadow-sm flex items-center justify-center text-[8px] shrink-0"
          style={{
            backgroundColor: activeOption.previewBg,
            borderColor: activeOption.previewAccent,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: activeOption.previewAccent }}
          />
        </span>

        <span className="hidden sm:inline font-semibold">
          {activeOption.name.split(' ')[0]}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-64 rounded-xl border shadow-2xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-150 theme-dropdown-menu"
        >
          <div className="px-3 py-2 border-b mb-1 theme-dropdown-header flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-semibold theme-dropdown-title">
              <Palette className="w-3.5 h-3.5" />
              <span>Color Themes</span>
            </div>
            <span className="text-[10px] font-mono opacity-60 uppercase">
              {THEME_OPTIONS.length} presets
            </span>
          </div>

          <div className="space-y-0.5 max-h-[380px] overflow-y-auto">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer text-left ${
                    isSelected ? 'theme-menu-item-active font-semibold' : 'theme-menu-item'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    {/* Visual Color Token Pill */}
                    <div
                      className="w-5 h-5 rounded-md border flex items-center justify-center shadow-inner shrink-0"
                      style={{
                        backgroundColor: theme.previewBg,
                        borderColor: theme.previewBorder,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full shadow-sm"
                        style={{ backgroundColor: theme.previewAccent }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5 leading-none">
                        <span className="truncate">{theme.name}</span>
                        <span className="text-[11px]">{theme.emoji}</span>
                      </div>
                      <div className="text-[10px] opacity-65 truncate mt-0.5">
                        {theme.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
