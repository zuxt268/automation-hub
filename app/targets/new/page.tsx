import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import TargetForm from './TargetForm';

export default async function NewTargetPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <Sidebar />
      <main className="ml-64 pt-24 px-4 sm:px-6 lg:px-8 pb-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">ターゲット新規登録</h1>
          <p className="text-gray-600 mt-1">新しいターゲットを登録します</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <TargetForm />
        </div>
      </main>
    </div>
  );
}