'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  userEmail?: string | null;
  userImage?: string | null;
}

export default function Header({ userEmail, userImage }: HeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/') return 'ダッシュボード';
    if (pathname === '/targets') return 'ターゲット管理';
    if (pathname === '/targets/new') return 'ターゲット新規登録';
    if (pathname === '/domains') return 'ドメイン管理';
    if (pathname === '/logs') return '実行ログ';
    return 'Sales Automation';
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
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
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                ダッシュボード
              </Link>
              <Link
                href="/targets"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith('/targets')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                ターゲット
              </Link>
              <Link
                href="/domains"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/domains'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                ドメイン
              </Link>
              <Link
                href="/logs"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/logs'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                ログ
              </Link>
            </nav>
          </div>
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
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <h1 className="text-gray-900 text-sm font-medium">{getPageTitle()}</h1>
        </div>
      </div>
    </header>
  );
}