'use client';

import { useState, useEffect } from 'react';
import { ListingCard } from '@/components/ListingCard';
import { getListings } from '@/lib/api';
import { ListingWithImages } from '@/lib/types';
import Link from 'next/link';
import CurrencyTicker from '@/components/CurrencyTicker';
import Logo from '@/components/Logo';

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState<ListingWithImages[]>([]);
  const [latestListings, setLatestListings] = useState<ListingWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const fetchedListings = await getListings();
      // Sadece öne çıkan ilanları göster
      const featured = fetchedListings.filter(listing => listing.is_featured);
      const latest = [...fetchedListings].sort((a, b) =>
        new Date(b.listing_date).getTime() - new Date(a.listing_date).getTime()
      );
      setFeaturedListings(featured);
      setLatestListings(latest);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section - Full Image */}
      <section className="w-full bg-[#f6f6f6] border-b border-[#e8e8e8]">
        <img
          src="/novax-hero.png"
          alt="NOVAX Hero"
          className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-contain"
        />
      </section>

      {/* Currency Ticker */}
      <CurrencyTicker />

      {/* Vitrin Listings */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Vitrin İlanlar
                </h2>
              </div>
            </div>
            <Link
              href="/ilanlar"
              className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Tümünü Gör
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredListings.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600 text-lg">Henüz ilan bulunmuyor</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {featuredListings.slice(0, 4).map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link
                  href="/ilanlar"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Tüm İlanları Gör
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Yeni Güncel İlanlar */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Yeni Güncel İlanlar</h2>
            <Link
              href="/ilanlar"
              className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Tümünü Gör
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {latestListings.map((listing) => (
                <ListingCard key={`latest-${listing.id}`} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f6f6f6] border-y border-[#e8e8e8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#e8e8e8] px-6 py-10 sm:px-10 text-center shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-[#171717] mb-3">
              Size uygun ilanı birlikte bulalım
            </h2>
            <p className="text-[15px] text-[#666] mb-7 max-w-2xl mx-auto">
              Güncel vitrin ve yeni ilanları inceleyin, detaylar için bizimle hızlıca iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ilanlar"
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-[#161616] hover:bg-black transition-colors"
              >
                Tüm İlanlar
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-[#1f1f1f] border border-[#d8d8d8] hover:bg-[#fafafa] transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#161616] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="inline-flex rounded bg-white/95 px-3 py-2.5 mb-4">
                <Logo className="h-24 sm:h-28 md:h-32 w-auto max-w-[min(92vw,420px)]" />
              </div>
              <p className="text-[#adadad] text-sm leading-relaxed">
                Konut, iş yeri ve turistik tesis ilanlarında güvenilir ve güncel portföy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[15px]">Menü</h3>
              <ul className="space-y-2 text-sm text-[#b8b8b8]">
                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li><Link href="/ilanlar" className="hover:text-white transition-colors">İlanlar</Link></li>
                <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[15px]">Kategoriler</h3>
              <ul className="space-y-2 text-sm text-[#b8b8b8]">
                <li><Link href="/ilanlar?category=konut" className="hover:text-white transition-colors">Konut</Link></li>
                <li><Link href="/ilanlar?category=is-yeri" className="hover:text-white transition-colors">İş Yeri</Link></li>
                <li><Link href="/ilanlar?category=devre-mulk" className="hover:text-white transition-colors">Devre Mülk</Link></li>
                <li><Link href="/ilanlar?category=turistik-tesis" className="hover:text-white transition-colors">Turistik Tesis</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[15px]">İletişim</h3>
              <ul className="space-y-3 text-sm text-[#b8b8b8]">
                <li>novaxreklamdanismanlik@gmail.com</li>
                <li>0545 988 0337</li>
                <li>Cevizli Mah. Bayraktar Sok. Nursanlar Apt. No:1/3 Daire:16 Kartal / İstanbul</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#9a9a9a]">
            <p>© 2026 NOVAX. Tüm hakları saklıdır.</p>
            <p>Gayrimenkul ve reklam danışmanlığı</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
