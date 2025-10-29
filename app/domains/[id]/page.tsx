import { getDomainById } from '@/app/lib/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import Link from 'next/link';
import DomainDetail from './DomainDetail';

export default async function DomainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const { id } = await params;
  const domain = await getDomainById(Number(id));

  // サーバー側でJSTにフォーマット
  const formatDateToJST = (dateString: string) => {
    const date = new Date(dateString);
    // JSTはUTC+9
    const jstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
    const year = jstDate.getUTCFullYear();
    const month = String(jstDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(jstDate.getUTCDate()).padStart(2, '0');
    const hours = String(jstDate.getUTCHours()).padStart(2, '0');
    const minutes = String(jstDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(jstDate.getUTCSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const formattedCreatedAt = formatDateToJST(domain.created_at);
  const formattedUpdatedAt = formatDateToJST(domain.updated_at);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <Sidebar />
      <main className="ml-64 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mb-6">
          <Link
            href="/domains"
            className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
          >
            ← ドメイン一覧に戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">ドメイン詳細</h1>
        </div>
        <DomainDetail
          domain={domain}
          formattedCreatedAt={formattedCreatedAt}
          formattedUpdatedAt={formattedUpdatedAt}
        />
      </main>
    </div>
  );
}