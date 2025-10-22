import { getLogs } from '../lib/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Header from '../components/Header';
import LogList from './LogList';

export default async function LogsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const logs = await getLogs({ limit: 100 });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">実行ログ</h1>
          <p className="text-gray-600 mt-1">システムの実行ログを確認します</p>
        </div>
        <LogList logs={logs} />
      </main>
    </div>
  );
}