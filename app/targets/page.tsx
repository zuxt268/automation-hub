import { getTargets } from '../lib/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TargetList from './TargetList';
import Link from 'next/link';

export default async function TargetsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const targets = await getTargets();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <Sidebar />
      <main className="ml-64 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ターゲット一覧</h1>
            <p className="text-gray-600 mt-1">登録されているターゲットを管理します</p>
          </div>
          <Link
            href="/targets/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            + 新規登録
          </Link>
        </div>
        <TargetList targets={targets} />
      </main>
    </div>
  );
}