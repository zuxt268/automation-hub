import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import LogList from './LogList';
import { getLogs } from '../lib/api';

export default async function LogsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 20;
  const offset = (currentPage - 1) * itemsPerPage;

  const logsResponse = await getLogs({ limit: itemsPerPage, offset });
  const { logs, total: totalCount } = logsResponse;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <Sidebar />
      <main className="ml-64 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">実行ログ</h1>
          <p className="text-gray-600 mt-1">システムの実行ログを確認します</p>
        </div>
        <LogList initialLogs={logs} totalCount={totalCount} />
      </main>
    </div>
  );
}