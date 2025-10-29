'use client';

import { Target } from '../types/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TargetListProps {
  targets: Target[];
}

export default function TargetList({ targets }: TargetListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [fetchingIp, setFetchingIp] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/targets/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }

      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : '削除に失敗しました');
      setDeletingId(null);
    }
  };

  const handleFetch = async (targetName: string) => {
    setFetchingIp(targetName);

    try {
      const response = await fetch('/api/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: targetName }),
      });

      if (!response.ok) {
        throw new Error('Fetch処理の開始に失敗しました');
      }

      alert('Fetch処理を開始しました');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Fetch処理の開始に失敗しました');
    } finally {
      setFetchingIp(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'init':
        return 'bg-gray-100 text-gray-800';
      case 'fetched':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              名前
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              IP
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ステータス
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              作成日時
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              更新日時
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {targets.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                ターゲットが見つかりませんでした
              </td>
            </tr>
          ) : (
            targets.map((target) => (
              <tr key={target.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {target.id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {target.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {target.ip}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(target.status)}`}>
                    {target.status}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(target.created_at).toLocaleString('ja-JP')}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {new Date(target.updated_at).toLocaleString('ja-JP')}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFetch(target.ip)}
                      disabled={fetchingIp === target.ip}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {fetchingIp === target.ip ? 'Fetch中...' : 'Fetch'}
                    </button>
                    <button
                      onClick={() => handleDelete(target.id)}
                      disabled={deletingId === target.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === target.id ? '削除中...' : '削除'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}