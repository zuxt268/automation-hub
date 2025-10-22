import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getDomains } from '../lib/api';
import Header from '../components/Header';
import DomainListWrapper from './DomainListWrapper';

const ITEMS_PER_PAGE = 100;

export default async function DomainsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const initialDomains = await getDomains({ limit: ITEMS_PER_PAGE, offset: 0 });
  const allDomains = await getDomains();
  const totalCount = allDomains.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ドメイン一覧</h1>
          <p className="text-gray-600 mt-1">収集されたドメイン情報を確認します</p>
        </div>
        <DomainListWrapper initialDomains={initialDomains} totalCount={totalCount} />
      </main>
    </div>
  );
}