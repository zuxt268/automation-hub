'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  userEmail?: string | null;
  userImage?: string | null;
}

export default function Header({ userEmail, userImage }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/sd.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-lg tracking-tight">Sales Automation</span>
              <span className="text-gray-500 text-xs">Domain Management System</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {userEmail && (
              <div className="flex items-center gap-3 bg-gray-50 rounded-full pl-4 pr-2 py-1.5 border border-gray-200">
                <span className="text-gray-700 text-sm hidden sm:block">{userEmail}</span>
                {userImage && (
                  <Image
                    src={userImage}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full ring-2 ring-white"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}