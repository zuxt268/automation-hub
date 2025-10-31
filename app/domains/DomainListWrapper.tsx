'use client';

import { useState, useEffect } from 'react';
import { Domain, DomainStatus } from '../types/api';
import DomainList from './DomainList';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 100;

interface DomainListWrapperProps {
  initialDomains: Domain[];
  totalCount: number;
}

export default function DomainListWrapper({ initialDomains, totalCount }: DomainListWrapperProps) {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / ITEMS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isJapanFilter, setIsJapanFilter] = useState<string>('');
  const [targetFilter, setTargetFilter] = useState<string>('');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [filteredTotal, setFilteredTotal] = useState(totalCount);

  useEffect(() => {
    const fetchDomains = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('limit', ITEMS_PER_PAGE.toString());
        params.append('offset', ((currentPage - 1) * ITEMS_PER_PAGE).toString());
        if (statusFilter) params.append('status', statusFilter);
        if (isJapanFilter) params.append('is_japan', isJapanFilter);
        if (targetFilter) params.append('target', targetFilter);
        if (nameFilter) params.append('name', nameFilter);

        const response = await fetch(`/api/domains?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch domains');
        }
        const data = await response.json();
        setDomains(data.domains || []);
        setFilteredTotal(data.total || 0);
        setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching domains:', error);
        setDomains([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, [currentPage, statusFilter, isJapanFilter, targetFilter, nameFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              ドメイン名
            </label>
            <input
              id="name"
              type="text"
              value={nameFilter}
              onChange={(e) => {
                setNameFilter(e.target.value);
                handleFilterChange();
              }}
              placeholder="ドメイン名で検索"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
              ターゲット
            </label>
            <input
              id="target"
              type="text"
              value={targetFilter}
              onChange={(e) => {
                setTargetFilter(e.target.value);
                handleFilterChange();
              }}
              placeholder="ターゲット名"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              ステータス
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">すべて</option>
              <option value="unknown">unknown</option>
              <option value="initialize">initialize</option>
              <option value="check_view">check_view</option>
              <option value="check_japan">check_japan</option>
              <option value="crawl_comp_info">crawl_comp_info</option>
              <option value="done">done</option>
            </select>
          </div>
          <div>
            <label htmlFor="is_japan" className="block text-sm font-medium text-gray-700 mb-1">
              日本のサイトか
            </label>
            <select
              id="is_japan"
              value={isJapanFilter}
              onChange={(e) => {
                setIsJapanFilter(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">すべて</option>
              <option value="true">日本</option>
              <option value="false">日本以外</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setNameFilter('');
              setTargetFilter('');
              setStatusFilter('');
              setIsJapanFilter('');
              handleFilterChange();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            クリア
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-4 mb-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">検索結果</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {filteredTotal.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600 ml-1">件</span>
          </div>
        </div>
      </div>
      <DomainList domains={domains} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}