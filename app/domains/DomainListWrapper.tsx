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

        const response = await fetch(`/api/domains?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch domains');
        }
        const data = await response.json();
        setDomains(data.domains || []);
        setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error fetching domains:', error);
        setDomains([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, [currentPage, statusFilter, isJapanFilter, targetFilter]);

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
        <div className="flex gap-4 items-end">
          <div className="flex-1">
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
          <div className="flex-1">
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
          <div className="flex-1">
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
          <button
            onClick={() => {
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