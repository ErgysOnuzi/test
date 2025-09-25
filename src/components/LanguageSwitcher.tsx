"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentPath = pathname?.replace(/^\/(de|en)/, '') || '/';
  
  return (
    <div className="flex gap-2">
      <Link 
        href={`/de${currentPath}`} 
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
        data-testid="button-german-flag"
      >
        <span className="text-lg">🇩🇪</span>
        <span className="text-sm font-medium">DE</span>
      </Link>
      <Link 
        href={`/en${currentPath}`} 
        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
        data-testid="button-english-flag"
      >
        <span className="text-lg">🇬🇧</span>
        <span className="text-sm font-medium">EN</span>
      </Link>
    </div>
  );
}