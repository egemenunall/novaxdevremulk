'use client';

import { useState, useEffect } from 'react';

interface CurrencyRate {
  code: string;
  name: string;
  buying: number;
  selling: number;
  change: number;
  icon: string;
}

interface ExchangeRateData {
  rates: Record<string, number>;
}

export default function CurrencyTicker() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { code: 'USD', name: 'Dolar', buying: 34.15, selling: 34.28, change: 0.45, icon: '$' },
    { code: 'EUR', name: 'Euro', buying: 37.42, selling: 37.58, change: -0.12, icon: '€' },
    { code: 'GBP', name: 'Sterlin', buying: 43.21, selling: 43.39, change: 0.28, icon: '£' },
    { code: 'CHF', name: 'İsviçre Frangı', buying: 39.12, selling: 39.30, change: 0.11, icon: '₣' },
    { code: 'JPY', name: 'Japon Yeni', buying: 0.23, selling: 0.24, change: -0.08, icon: '¥' },
    { code: 'ALTIN', name: 'Gram Altın', buying: 2490, selling: 2510, change: 0.22, icon: 'Au' },
    { code: 'GUMUS', name: 'Gram Gümüş', buying: 31.2, selling: 31.6, change: -0.15, icon: 'Ag' },
  ]);
  const [loading, setLoading] = useState(true);
  const [prevRates, setPrevRates] = useState<{ [key: string]: number }>({});

  // Gerçek döviz kurlarını çek
  const fetchRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/TRY');
      const data: ExchangeRateData = await response.json();

      const targets = [
        { code: 'USD', name: 'Dolar', icon: '$' },
        { code: 'EUR', name: 'Euro', icon: '€' },
        { code: 'GBP', name: 'Sterlin', icon: '£' },
        { code: 'CHF', name: 'İsviçre Frangı', icon: '₣' },
        { code: 'JPY', name: 'Japon Yeni', icon: '¥' },
      ];

      // Değişim oranlarını hesapla
      const calculateChange = (code: string, newRate: number) => {
        if (prevRates[code]) {
          return ((newRate - prevRates[code]) / prevRates[code]) * 100;
        }
        return 0;
      };

      const nextPrevRates: { [key: string]: number } = {};
      const newRates: CurrencyRate[] = targets
        .filter((item) => data.rates[item.code])
        .map((item) => {
          const buying = 1 / data.rates[item.code];
          nextPrevRates[item.code] = buying;
          return {
            code: item.code,
            name: item.name,
            buying,
            selling: buying * 1.005, // %0.5 spread
            change: calculateChange(item.code, buying),
            icon: item.icon,
          };
        });

      // Emtia fiyatları için pratik gösterim (yaklaşık TL karşılıkları).
      const usdTry = newRates.find((r) => r.code === 'USD')?.buying ?? 34;
      const gramAltin = usdTry * 73;
      const gramGumus = usdTry * 0.9;
      nextPrevRates.ALTIN = gramAltin;
      nextPrevRates.GUMUS = gramGumus;
      newRates.push(
        {
          code: 'ALTIN',
          name: 'Gram Altın',
          buying: gramAltin,
          selling: gramAltin * 1.004,
          change: calculateChange('ALTIN', gramAltin),
          icon: 'Au',
        },
        {
          code: 'GUMUS',
          name: 'Gram Gümüş',
          buying: gramGumus,
          selling: gramGumus * 1.005,
          change: calculateChange('GUMUS', gramGumus),
          icon: 'Ag',
        }
      );

      setPrevRates(nextPrevRates);

      setRates(newRates);
      setLoading(false);
    } catch (error) {
      console.error('Döviz kurları yüklenemedi:', error);
      setLoading(false);
    }
  };

  // İlk yükleme
  useEffect(() => {
    fetchRates();
  }, []);

  // Her 5 dakikada bir güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRates();
    }, 5 * 60 * 1000); // 5 dakika

    return () => clearInterval(interval);
  }, [prevRates]);

  return (
    <div className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="h-0" aria-hidden />

        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-4">
          {rates.map((rate, index) => (
            <div key={rate.code} className={`bg-white border border-gray-200 px-2.5 py-2 sm:px-4 sm:py-2.5 shadow-sm ${index >= 3 ? 'hidden sm:block' : ''}`}>
              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="text-[11px] sm:text-xs font-semibold text-gray-600">{rate.code}</span>
                <span className="text-[13px] sm:text-lg font-bold text-gray-700">{rate.icon}</span>
              </div>
              <div className="mt-1 text-[13px] sm:text-sm font-bold text-gray-900">
                ₺{rate.buying.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
