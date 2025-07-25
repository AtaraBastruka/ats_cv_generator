"use client";

import { useState, useRef, useEffect } from "react";



export default function Dropdown({ 
  options, 
  onChange,
  initialValue,
}: {
  options: string[];
  onChange: (value: string) => void;
  initialValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    if (initialValue && options.includes(initialValue)) {
       const index = options.indexOf(initialValue);
       setSelected(options[index]);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);
    onChange(value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 place-content-between bg-white/10 
                  border border-white/20 rounded-lg 
                  px-4 py-2 text-white focus:outline-none 
                  focus:ring-2 focus:ring-purple-500 
                  focus:border-transparent w-full"
      >
        {selected}
        <svg className={`w-4 h-4 ml-2 text-white transition-all ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1.5 w-full max-w-6xl
                        origin-top-left rounded-lg bg-p/95 border 
                        border-white/10 shadow-lg transition-all
                        overflow-x-hidden overflow-y-auto max-h-50 
                        scrollbar-thin">
          <div className="py-1">
            {options.map((option, index) => (
              <button 
                key={index} 
                onClick={()=>handleSelect(option)} 
                className="block w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}