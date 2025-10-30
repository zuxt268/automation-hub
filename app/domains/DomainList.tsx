'use client';

import { Domain } from '../types/api';
import { useRouter } from 'next/navigation';

interface DomainListProps {
  domains: Domain[];
}

export default function DomainList({ domains }: DomainListProps) {
  const router = useRouter();

  const handleRowClick = (domainId: number, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName !== 'A') {
      router.push(`/domains/${domainId}`);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'crawl_comp_info':
        return 'bg-blue-100 text-blue-800';
      case 'check_japan':
        return 'bg-yellow-100 text-yellow-800';
      case 'check_view':
        return 'bg-purple-100 text-purple-800';
      case 'initialize':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return dateString.replace('T', ' ').replace('Z', '').slice(0, 19).replace(/-/g, '/');
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ターゲット
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ドメイン名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                作成日時
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {domains.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  ドメインが見つかりませんでした
                </td>
              </tr>
            ) : (
              domains.map((domain) => (
                <tr
                  key={domain.id}
                  onClick={(e) => handleRowClick(domain.id, e)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {domain.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {domain.target || '-'}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    <a
                      href={`https://${domain.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {domain.name}
                    </a>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(domain.status)}`}>
                      {domain.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(domain.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}