import { getTasks } from '../lib/api';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskList from './TaskList';

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userEmail={session.user?.email} userImage={session.user?.image} />
      <Sidebar />
      <main className="ml-64 pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">タスク一覧</h1>
          <p className="text-gray-600 mt-1">登録されているタスクを管理します</p>
        </div>
        <TaskList tasks={tasks} />
      </main>
    </div>
  );
}