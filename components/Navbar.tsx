'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activePopup, setActivePopup] = useState<'login' | 'register' | 'favorites' | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const categories = [
    { label: 'ANA SAYFA', href: '/' },
    { label: 'KONUT', href: '/ilanlar?category=konut' },
    { label: 'APART', href: '/ilanlar?category=apart' },
    { label: 'OTEL', href: '/ilanlar?category=otel' },
    { label: 'İŞ YERİ', href: '/ilanlar?category=is-yeri' },
    { label: 'ARSA', href: '/ilanlar?category=arsa' },
    { label: 'BİNA', href: '/ilanlar?category=bina' },
    { label: 'DEVRE MÜLK', href: '/ilanlar?category=devre-mulk' },
    { label: 'TURİSTİK TESİS', href: '/ilanlar?category=turistik-tesis' },
    { label: 'HAKKIMIZDA', href: '/hakkimizda' },
    { label: 'EKİBİMİZ', href: '/ekibimiz' },
    { label: 'BLOG', href: '/blog' },
    { label: 'İLETİŞİM', href: '/iletisim' },
  ];
  const megaMenus: Record<
    string,
    { side: string[]; columns: string[][] }
  > = {
    KONUT: {
      side: ['SATILIK KONUTLAR', 'KİRALIK KONUTLAR', 'TURİSTİK GÜNLÜK KİRALIK', 'DEVREN SATILIK KONUT'],
      columns: [
        ['DAİRE', 'REZİDANS', 'MÜSTAKİL EV', 'VİLLA'],
        ['ÇİFTLİK EVİ', 'KÖŞK & KONAK', 'YALI', 'YALI DAİRESİ'],
        ['YAZLIK', 'KOOPERATİF']
      ]
    },
    'İŞ YERİ': {
      side: ['SATILIK İŞ YERLERİ', 'KİRALIK İŞ YERLERİ', 'DEVREN'],
      columns: [
        ['AKARYAKIT İSTASYONU', 'APARTMAN DAİRESİ', 'ATÖLYE', 'AVM', 'BÜFE', 'BÜRO & OFİS', 'CAFE & BAR', 'ÇİFTLİK', 'DEPO & ANTREPO', 'DÜĞÜN SALONU'],
        ['DÜKKAN & MAĞAZA', 'ECZANE & MEDİKAL', 'FABRİKA & ÜRETİM TESİSİ', 'FOTOĞRAF STÜDYOSU', 'GARAJ & PARK YERİ', 'HAZIR & SANAL OFİS', 'İMALATHANE', 'İŞ HANI KATI & OFİSİ', 'KANTİN', 'KIR & KAHVALTI BAHÇESİ'],
        ['KIRAATHANE', 'KOMPLE BİNA', 'KUAFÖR & GÜZELLİK MERKEZİ', 'OTO YIKAMA & KUAFÖR', 'PASTANE & FIRIN & TATLICI', 'PAZAR YERİ', 'PLAZA', 'PLAZA KATI & OFİSİ', 'PROVA & KAYIT STÜDYOSU', 'RADYO İSTASYONU & TV KANALI']
      ]
    },
    'DEVRE MÜLK': {
      side: ['SATILIK DEVRE MÜLK', 'KİRALIK DEVRE MÜLK'],
      columns: [
        ['MARMARA BÖLGESİ', 'EGE BÖLGESİ', 'AKDENİZ BÖLGESİ'],
        ['KARADENİZ BÖLGESİ', 'İÇ ANADOLU BÖLGESİ', 'DOĞU ANADOLU BÖLGESİ'],
        ['GÜNEYDOĞU ANADOLU BÖLGESİ']
      ]
    },
    'TURİSTİK TESİS': {
      side: ['SATILIK TURİSTİK TESİSLER', 'KİRALIK TURİSTİK TESİSLER'],
      columns: [
        ['OTEL', 'APART OTEL', 'BUTİK OTEL'],
        ['MOTEL', 'PANSİYON', 'KAMP YERİ'],
        ['TATİL KÖYÜ']
      ]
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ilanlar?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <div className="w-full bg-[#f2f2f2] border-b border-[#e6e6e6]">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-5">
          <div className="min-h-[40px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-1 sm:gap-x-6 text-[12px] sm:text-[13px] text-[#252525] py-2 sm:py-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a href="tel:05459880337" className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M6.62 10.79a15.46 15.46 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.11.37 2.3.56 3.58.56a1 1 0 011 1V20a1 1 0 01-1 1C10.3 21 3 13.7 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.28.19 2.47.56 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                </svg>
                <span>0545 988 0337</span>
              </a>
              <a href="mailto:novaxreklamdanismanlik@gmail.com" className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 3.68v.57l-8 4.98-8-4.98v-.57l8 5 8-5z" />
                </svg>
                <span>novaxreklamdanismanlik@gmail.com</span>
              </a>
            </div>
            <div className="inline-flex items-center gap-2 text-[#2f2f2f]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2a8 8 0 00-8 8c0 5.25 6.54 11.26 7.25 11.89a1.09 1.09 0 001.5 0C13.46 21.26 20 15.25 20 10a8 8 0 00-8-8zm0 11a3 3 0 113-3 3 3 0 01-3 3z" />
              </svg>
              <span className="line-clamp-2 sm:line-clamp-1">
                Cevizli Mah. Bayraktar Sok. Nursanlar Apt. No:1/3 Daire:16 Kartal / İstanbul
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="w-full bg-white border-b border-[#ececec]">
        <div className="max-w-[1260px] mx-auto px-3 sm:px-5">
          <div className="h-[80px] sm:h-[104px] flex items-center justify-between gap-3 sm:gap-8">
            <Link
              href="/"
              className="text-[#050505] text-[28px] sm:text-[40px] leading-none font-black tracking-tight whitespace-nowrap"
            >
              NOVAX
            </Link>

            <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-[680px]">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Aradığınız ilan, ilan kategori veya markayı yazınız"
                  className="w-full h-[52px] border border-[#e6e6e6] px-5 pr-12 text-[16px] leading-none text-[#666] placeholder:text-[#9a9a9a] focus:outline-none focus:border-[#cfcfcf]"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8f8f8f]" aria-label="Ara">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="hidden lg:flex items-center gap-4 text-[13px] font-semibold text-[#2f2f2f] whitespace-nowrap">
              <button type="button" onClick={() => setActivePopup('login')} className="hover:text-black">GİRİŞ YAP</button>
              <span className="text-[#cfcfcf]">|</span>
              <button type="button" onClick={() => setActivePopup('favorites')} className="hover:text-black">FAVORİLERİM</button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Menü"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <form onSubmit={handleSearch} className="lg:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Aradığınız ilan veya kategori"
                className="w-full h-11 border border-[#e5e5e5] px-4 pr-11 text-sm text-[#555] focus:outline-none focus:border-[#d4d4d4]"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
                aria-label="Ara"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="border-t border-[#efefef]">
          <div className="max-w-[1260px] mx-auto px-5">
            <div className="hidden lg:flex items-center justify-between gap-3 h-[52px]">
              {categories.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setActiveMegaMenu(megaMenus[item.label] ? item.label : null)}
                  className={`text-[13px] leading-none font-extrabold tracking-wide whitespace-nowrap ${
                    item.href === '/'
                      ? pathname === '/' ? 'text-black' : 'text-[#1f1f1f]'
                      : 'text-[#1f1f1f]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setActivePopup('register')}
                className="text-[13px] leading-none font-extrabold tracking-wide whitespace-nowrap text-[#1f1f1f]"
              >
                KAYIT OL
              </button>
            </div>
          </div>
        </div>
        <div
          className={`hidden lg:block border-t border-[#e8e8e8] shadow-[0_2px_6px_rgba(0,0,0,0.06)] ${
            activeMegaMenu ? 'opacity-100 visible' : 'opacity-0 invisible h-0 overflow-hidden'
          }`}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          {activeMegaMenu && megaMenus[activeMegaMenu] && (
            <div className="max-w-[1260px] mx-auto px-0">
              <div className="grid grid-cols-[270px_1fr] min-h-[180px]">
                <div className="border-r border-[#e9e9e9] py-10 bg-[#fbfbfb]">
                  {megaMenus[activeMegaMenu].side.map((item, idx) => (
                    <div
                      key={item}
                      className={`h-11 px-4 flex items-center justify-between text-[14px] text-[#3a3a3a] ${
                        idx === 0 ? 'bg-[#efefef]' : ''
                      }`}
                    >
                      <span>{item}</span>
                      <span className="text-[#7b7b7b]">{'>'}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-10 px-14 py-10">
                  {megaMenus[activeMegaMenu].columns.map((col, index) => (
                    <div key={index} className="space-y-3">
                      {col.map((item) => (
                        <div key={item} className="text-[14px] leading-5 text-[#2d2d2d]">
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#ededed] pb-4">
            <div className="grid grid-cols-2 gap-2 pt-4">
              {categories.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 border border-[#ececec] text-sm font-semibold text-[#252525] rounded-sm hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActivePopup('login');
                }}
                className="px-3 py-2 border border-[#ececec] text-sm font-semibold text-[#252525] rounded-sm hover:bg-gray-50 text-left"
              >
                GİRİŞ YAP
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActivePopup('favorites');
                }}
                className="px-3 py-2 border border-[#ececec] text-sm font-semibold text-[#252525] rounded-sm hover:bg-gray-50 text-left"
              >
                FAVORİLERİM
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActivePopup('register');
                }}
                className="px-3 py-2 border border-[#ececec] text-sm font-semibold text-[#252525] rounded-sm hover:bg-gray-50 text-left"
              >
                KAYIT OL
              </button>
            </div>
          </div>
        )}
      </nav>
      {activePopup && (
        <div className="fixed inset-0 z-120 bg-black/40 flex items-center justify-center p-4" onClick={() => setActivePopup(null)}>
          <div className="w-full max-w-sm bg-white rounded-md shadow-xl border border-[#e7e7e7] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-[#222]">
                {activePopup === 'login' && 'Giriş Yap'}
                {activePopup === 'register' && 'Kayıt Ol'}
                {activePopup === 'favorites' && 'Favorilerim'}
              </h3>
              <button type="button" onClick={() => setActivePopup(null)} className="text-[#777] hover:text-black">✕</button>
            </div>
            {activePopup === 'favorites' ? (
              <div className="text-[14px] text-[#555]">Henüz favorilere eklenmiş ilan yok.</div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="E-posta"
                  className="w-full h-10 border border-[#dfdfdf] px-3 text-[14px] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  className="w-full h-10 border border-[#dfdfdf] px-3 text-[14px] focus:outline-none"
                />
                <button type="button" className="w-full h-10 bg-[#111] text-white text-[13px] font-semibold">
                  {activePopup === 'login' ? 'GİRİŞ YAP' : 'KAYIT OL'}
                </button>
                <p className="text-[12px] text-[#888]">
                  Bu pencere görsel amaçlıdır, işlem yapılmaz.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
