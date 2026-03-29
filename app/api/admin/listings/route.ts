import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/utils/auth';
import { createClient } from '@supabase/supabase-js';

// Service role client (RLS bypass için)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// GET - Tüm ilanları getir
export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { data: listings, error } = await supabaseAdmin
      .from('listings')
      .select('*')
      .order('listing_date', { ascending: false });

    if (error) {
      console.error('İlanlar getirilirken hata:', error);
      return NextResponse.json({ error: 'İlanlar getirilemedi' }, { status: 500 });
    }

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error('Sunucu hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

// POST - Yeni ilan oluştur veya resim kopyala
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const body = await request.json();
    
    // Resim kopyalama işlemi
    if (body.action === 'copy-image') {
      const { listingId, imageUrl } = body;
      
      const { data, error } = await supabaseAdmin
        .from('listing_images')
        .insert({
          listing_id: listingId,
          image_url: imageUrl,
        })
        .select()
        .single();

      if (error) {
        console.error('Resim kopyalama hatası:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ image: data });
    }
    
    // Normal ilan oluşturma
    const { name, description, price, period, listing_date, is_featured, details } = body;

    if (!name || !description || price === undefined || price === null || !period || !listing_date) {
      return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 });
    }

    const { data: listing, error } = await supabaseAdmin
      .from('listings')
      .insert([
        {
          name,
          description,
          price: parseFloat(price),
          period,
          listing_date,
          is_featured: Boolean(is_featured),
          ...(details ? { details } : {}),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('İlan oluşturulurken hata:', error);
      return NextResponse.json(
        { error: 'İlan oluşturulamadı', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error('Sunucu hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
