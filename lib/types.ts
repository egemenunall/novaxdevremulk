// Veritabanı türleri

export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  listing_date: string; // ISO date string
  is_featured: boolean;
  details?: {
    contract_no?: string;
    property_type?: string;
    facility_name?: string;
    title_deed_status?: string;
    room_type?: string;
    area_m2?: string;
    season?: string;
    capacity?: string;
    status?: string;
    location?: string;
    view?: string;
    dues?: string;
    furnished?: string;
    usage_right?: string;
  };
  created_at: string;
}

export interface ListingImage {
  id: string;
  listing_id: string;
  image_url: string;
  order: number;
  created_at: string;
}

// İlan ve görselleri birlikte içeren tip
export interface ListingWithImages extends Listing {
  images: ListingImage[];
}

// Filtreleme için tipler
export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  period?: string;
  startDate?: string;
  endDate?: string;
}
