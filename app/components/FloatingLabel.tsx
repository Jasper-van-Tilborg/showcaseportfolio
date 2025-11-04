'use client';

import { useState, useRef, useEffect } from 'react';

interface FloatingLabelProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function FloatingLabel({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  rows,
  className = '',
}: FloatingLabelProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;

  const baseInputClasses = `w-full px-4 py-3 bg-[#1a1a2e] border rounded-md text-white text-[16px] focus:outline-none transition-all ${className} ${
    isFocused 
      ? 'border-[#AA61FF] focus:ring-2 focus:ring-[#AA61FF]/20' 
      : 'border-[#AA61FF]/40'
  }`;
  
  const labelClasses = `absolute left-4 transition-all duration-200 pointer-events-none ${
    isActive
      ? 'top-2 text-[12px] text-[#AA61FF]'
      : 'top-3.5 text-[16px] text-[#E0E0E0]'
  }`;

  return (
    <div className="relative flex flex-col">
      <label className={labelClasses}>
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {rows ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          rows={rows}
          className={`${baseInputClasses} pt-8 resize-none`}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`${baseInputClasses} pt-8`}
        />
      )}
    </div>
  );
}

