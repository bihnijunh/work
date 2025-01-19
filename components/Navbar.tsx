"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isZelleOpen, setIsZelleOpen] = useState(false);
  const pathname = usePathname();

  const isZellePath = pathname?.startsWith('/zelle');
  const isPaypalPath = pathname?.startsWith('/paypal');

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                Email Templates
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Zelle Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsZelleOpen(!isZelleOpen)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isZellePath 
                      ? 'text-purple-600 dark:text-purple-400' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  Zelle Templates
                  <svg 
                    className={`ml-2 h-4 w-4 transition-transform ${isZelleOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown menu */}
                {isZelleOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link 
                        href="/zelle"
                        className={`block px-4 py-2 text-sm ${
                          pathname === '/zelle'
                            ? 'bg-gray-100 dark:bg-gray-600 text-purple-600 dark:text-purple-400'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setIsZelleOpen(false)}
                      >
                        Standard Template
                      </Link>
                      <Link 
                        href="/zelle/additional"
                        className={`block px-4 py-2 text-sm ${
                          pathname === '/zelle/additional'
                            ? 'bg-gray-100 dark:bg-gray-600 text-purple-600 dark:text-purple-400'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setIsZelleOpen(false)}
                      >
                        Additional Payment
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/paypal"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  isPaypalPath
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                PayPal Template
              </Link>
            </div>
          </div>
          
          {/* Theme toggle and mobile menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Hamburger menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition duration-200 ease-in-out ${
                      isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition duration-200 ease-in-out ${
                      isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-6 bg-current transform transition duration-200 ease-in-out ${
                      isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Zelle Mobile Menu */}
          <div>
            <button
              onClick={() => setIsZelleOpen(!isZelleOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Zelle Templates
              <svg 
                className={`ml-2 h-4 w-4 transition-transform ${isZelleOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isZelleOpen && (
              <div className="pl-4">
                <Link
                  href="/zelle"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Standard Template
                </Link>
                <Link
                  href="/zelle/additional"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Additional Payment
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/paypal"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            PayPal Template
          </Link>
        </div>
      </div>
    </nav>
  );
} 