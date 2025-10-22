'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function TargetForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/targets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('登録に失敗しました');
      }

      router.push('/targets');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="例: example-target"
        />
      </div>

      <div>
        <label htmlFor="ip" className="block text-sm font-medium text-gray-700 mb-2">
          IP <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="ip"
          required
          value={formData.ip}
          onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="例: 192.168.1.1"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '登録中...' : '登録'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/targets')}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}