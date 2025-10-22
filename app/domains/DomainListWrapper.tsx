'use client';

import { useState, useEffect } from 'react';
import { Domain } from '../types/api';
import DomainList from './DomainList';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 20;

interface DomainListWrapperProps {
  initialDomains: Domain[];
  totalCount: number;
}

export default function DomainListWrapper({ initialDomains, totalCount }: DomainListWrapperProps) {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(Math.ceil(totalCount / ITEMS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentPage === 1) return;

    const fetchDomains = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/domains?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`);
        if (!response.ok) {
          throw new Error('Failed to fetch domains');
        }
        const data = await response.json();
        setDomains(data.domains || []);
      } catch (error) {
        console.error('Error fetching domains:', error);
        setDomains([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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