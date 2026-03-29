import Link from 'next/link';
import Image from 'next/image';
import { ListingWithImages } from '@/lib/types';

interface ListingCardProps {
  listing: ListingWithImages;
}

export function ListingCard({ listing }: ListingCardProps) {
  // İlan ID'sine göre deterministik rastgele görsel seç
  const getRandomImageIndex = (id: string, totalImages: number) => {
    if (totalImages === 0) return 0;
    // ID'nin son karakterlerini sayıya çevir
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % totalImages;
  };

  const imageIndex = listing.images.length > 0 
    ? getRandomImageIndex(listing.id, listing.images.length)
    : 0;
  
  const mainImage = listing.images[imageIndex]?.image_url || '/placeholder.jpg';
  
  const formattedDate = new Date(listing.listing_date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/listings/${listing.id}`} className="block">
      <div className="group relative bg-white overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5">
        {/* Card glow effect on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 via-blue-400/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-blue-400/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
        
        {/* Border gradient effect */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 opacity-100 group-hover:from-blue-400/50 group-hover:via-purple-400/50 group-hover:to-blue-400/50 group-hover:opacity-100 transition-all duration-500" style={{ padding: '1px' }}>
          <div className="absolute inset-px bg-white"></div>
        </div>
        
        <div className="relative">
          <div className="relative aspect-4/3 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
            <Image
              src={mainImage}
              alt={listing.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Count with glassmorphism */}
            {listing.images.length > 1 && (
              <div className="absolute bottom-2 right-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-md shadow-md border border-white/20">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-semibold text-gray-700">{listing.images.length}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-[15px] sm:text-base text-gray-900 mb-1.5 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
              {listing.name}
            </h3>
            
            <p className="text-[12px] sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
            
            <div className="flex items-end justify-between pt-2.5 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Fiyat</span>
                <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
                  ₺{listing.price.toLocaleString('tr-TR')}
                </span>
              </div>
              
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </div>
            </div>

            {/* View details button that appears on hover */}
            <div className="mt-3 pt-2.5 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center justify-center text-sm font-semibold text-blue-600">
                <span>Detayları Gör</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
