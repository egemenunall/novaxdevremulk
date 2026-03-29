import { notFound } from 'next/navigation';
import { getListingById } from '@/lib/api';
import ImageGallery from '@/components/ImageGallery';
import Link from 'next/link';

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  const formattedDate = new Date(listing.listing_date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Geri Dön
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <ImageGallery images={listing.images} altText={listing.name} />

          {/* Listing Details */}
          <div className="p-5 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <p className="text-[12px] text-gray-500 mb-1">
                  İlan Tarihi: {formattedDate}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {listing.name}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#111]">
                  ₺{listing.price.toLocaleString('tr-TR')}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {listing.period || 'Dönem bilgisi güncelleniyor'}
                </p>
              </div>
            </div>

            {/* Özellikler Tablosu */}
            {/* details alanı için: önce Supabase'de supabase-add-listing-details.sql çalıştırılmalı */}
            {(() => {
              const d = listing.details || {};
              const fallbackContract = `LS${listing.id}`;
              return (
            <div className="border border-[#f0d6c7]">
              {[
                ['Özellik', 'Bilgi'],
                ['Sözleşme No', d.contract_no || fallbackContract],
                ['Taşınmaz Türü', d.property_type || 'Devremülk'],
                ['Tesis Adı', d.facility_name || listing.name],
                ['Tapu Durumu', d.title_deed_status || 'Belirtilmedi'],
                ['Oda Tipi', d.room_type || 'Belirtilmedi'],
                ['Metrekare', d.area_m2 || 'Belirtilmedi'],
                ['Dönem', d.season || listing.period || 'Belirtilmedi'],
                ['Kapasite', d.capacity || 'Belirtilmedi'],
                ['Durumu', d.status || 'Belirtilmedi'],
                ['Konum', d.location || 'Belirtilmedi'],
                ['Manzara', d.view || 'Belirtilmedi'],
                ['Aidat Bilgisi', d.dues || 'Belirtilmedi'],
                ['Eşya Durumu', d.furnished || 'Belirtilmedi'],
                ['Kullanım Hakkı', d.usage_right || 'Belirtilmedi'],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className="flex flex-col sm:flex-row text-[13px] sm:text-[14px]"
                >
                  <div className="sm:w-40 sm:min-w-36 bg-[#fbe0c9] px-2 py-1.5 font-semibold sm:border-r border-white">
                    {label}
                  </div>
                  <div className="flex-1 bg-[#fff5ec] px-2 py-1.5">
                    {value}
                  </div>
                </div>
              ))}
            </div>
              );
            })()}

            {/* Açıklama */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Açıklama</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-[15px]">
                {listing.description}
              </p>
            </div>

            {/* İletişim Butonu */}
            <div className="mt-6">
              <button className="w-full bg-[#1e73be] text-white py-3 px-6 text-sm font-semibold hover:bg-[#155a90] transition-colors">
                Emlakçıyla İletişime Geç
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
