'use client';

import { Domain } from '@/app/types/api';

interface DomainDetailProps {
  domain: Domain;
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
}

export default function DomainDetail({ domain, formattedCreatedAt, formattedUpdatedAt }: DomainDetailProps) {
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{domain.name}</h2>
        <a
          href={`https://${domain.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          サイトを開く →
        </a>
      </div>

      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">ID</dt>
            <dd className="text-sm text-gray-900">{domain.id}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">ターゲット</dt>
            <dd className="text-sm text-gray-900">{domain.target || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">ステータス</dt>
            <dd>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(domain.status)}`}>
                {domain.status}
              </span>
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">タイトル</dt>
            <dd className="text-sm text-gray-900">{domain.title || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">会社名</dt>
            <dd className="text-sm text-gray-900">{domain.company || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">代表者名</dt>
            <dd className="text-sm text-gray-900">{domain.president || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">業種</dt>
            <dd className="text-sm text-gray-900">{domain.industry || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">都道府県</dt>
            <dd className="text-sm text-gray-900">{domain.prefecture || '-'}</dd>
          </div>

          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-gray-500 mb-1">住所</dt>
            <dd className="text-sm text-gray-900">{domain.address || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">電話番号</dt>
            <dd className="text-sm text-gray-900">{domain.phone || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">固定電話</dt>
            <dd className="text-sm text-gray-900">{domain.landline_phone || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">携帯電話</dt>
            <dd className="text-sm text-gray-900">{domain.mobile_phone || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">ページ数</dt>
            <dd className="text-sm text-gray-900">{domain.page_num}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">Owner ID</dt>
            <dd className="text-sm text-gray-900">{domain.owner_id || '-'}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">SSL</dt>
            <dd className="text-sm text-gray-900">
              {domain.is_ssl ? (
                <span className="text-green-600">✓ 有効</span>
              ) : (
                <span className="text-red-600">✗ 無効</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">閲覧可能</dt>
            <dd className="text-sm text-gray-900">
              {domain.can_view ? (
                <span className="text-green-600">✓</span>
              ) : (
                <span className="text-gray-400">✗</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">日本サイト</dt>
            <dd className="text-sm text-gray-900">
              {domain.is_japan ? (
                <span className="text-green-600">✓</span>
              ) : (
                <span className="text-gray-400">✗</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">送信済み</dt>
            <dd className="text-sm text-gray-900">
              {domain.is_send ? (
                <span className="text-green-600">✓</span>
              ) : (
                <span className="text-gray-400">✗</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">作成日時</dt>
            <dd className="text-sm text-gray-900">{formattedCreatedAt}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-500 mb-1">更新日時</dt>
            <dd className="text-sm text-gray-900">{formattedUpdatedAt}</dd>
          </div>

          {domain.raw_page && (
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500 mb-1">Raw Page</dt>
              <dd className="text-sm text-gray-900 bg-gray-50 p-3 rounded border border-gray-200 max-h-40 overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words">{domain.raw_page}</pre>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}