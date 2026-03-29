'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { ListingCard } from '@/components/ListingCard';
import { FilterBar } from '@/components/FilterBar';
import { getListings, getUniquePeriods } from '@/lib/api';
import { ListingWithImages, FilterParams } from '@/lib/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function IlanlarContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryQuery = searchParams.get('category');

  const [listings, setListings] = useState<ListingWithImages[]>([]);
  const [filteredListings, setFilteredListings] = useState<ListingWithImages[]>([]);
  const [periods, setPeriods] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState<FilterParams>({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [fetchedListings, fetchedPeriods] = await Promise.all([
        getListings(),
        getUniquePeriods(),
      ]);
      setListings(fetchedListings);
      
      const applyClientFilters = (items: ListingWithImages[]) => {
        let next = items;
        if (searchQuery) {
          next = next.filter((listing) =>
            listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (categoryQuery) {
          // Şimdilik sadece devre mülk kategorisi gerçek sonuç göstersin.
          // Diğer kategoriler için alan/şema eklendiğinde burada filtre genişletilebilir.
          if (categoryQuery === 'devre-mulk') {
            return next;
          }
          return [];
        }
        return next;
      };

      // Arama / kategori filtreleri
      if (searchQuery || categoryQuery) {
        setFilteredListings(applyClientFilters(fetchedListings));
      } else {
        setFilteredListings(fetchedListings);
      }
      
      setPeriods(fetchedPeriods);
      setLoading(false);
    }
    fetchData();
  }, [searchQuery, categoryQuery]);

  useEffect(() => {
    async function applyFilters() {
      const filtered = await getListings(currentFilters);
      let next = filtered;
      if (searchQuery) {
        next = next.filter((listing) =>
          listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (categoryQuery) {
        if (categoryQuery === 'devre-mulk') {
          setFilteredListings(next);
          return;
        }
        setFilteredListings([]);
        return;
      }
      setFilteredListings(next);
    }
    applyFilters();
  }, [currentFilters, categoryQuery, searchQuery]);

  const handleFilterChange = useCallback((filters: FilterParams) => {
    setCurrentFilters(filters);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Ana Sayfaya Dön
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {categoryQuery
              ? `${categoryQuery.replace(/-/g, ' ').toUpperCase()} Kategorisi`
              : 'Tüm Devre Mülk İlanları'}
          </h1>
          <p className="text-gray-600 text-lg">
            Size en uygun fırsatları bulun ve filtreyleyin
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} availablePeriods={periods} />
        </div>

        {/* Search Info */}
        {searchQuery && !loading && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">"{searchQuery}"</span> için arama sonuçları
              {filteredListings.length > 0 && (
                <span className="ml-2">
                  - <span className="font-semibold">{filteredListings.length}</span> ilan bulundu
                </span>
              )}
            </p>
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredListings.length > 0 && !searchQuery && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredListings.length}</span> ilan bulundu
            </p>
            <div className="text-sm text-gray-500">
              En yeni ilanlar
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && filteredListings.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredListings.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">İlan bulunamadı</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {categoryQuery
                ? 'Bu kategoride şu an aktif ilan bulunamadı.'
                : 'Aradığınız kriterlere uygun ilan bulunamadı. Filtreleri değiştirerek tekrar deneyin.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Tüm İlanları Göster</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function IlanlarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Tüm Devre Mülk İlanları
            </h1>
            <p className="text-gray-600 text-lg">
              Yükleniyor...
            </p>
          </div>
        </div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Yükleniyor...</p>
          </div>
        </main>
      </div>
    }>
      <IlanlarContent />
    </Suspense>
  );
}
