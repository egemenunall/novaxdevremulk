import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function loadEnvLocal() {
  const envPath = path.join(repoRoot, '.env.local');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Eksik env: ${name}`);
  return v;
}

function pick(arr, i) {
  return arr[i % arr.length];
}

loadEnvLocal();

const url = required('NEXT_PUBLIC_SUPABASE_URL');
const serviceKey = required('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Muğla'];
const districts = ['Kartal', 'Güdül', 'Konak', 'Nilüfer', 'Muratpaşa', 'Bodrum'];
const facilities = [
  'Valide Sultan Termal Otel & Spa',
  'Mavi Koy Resort',
  'Panorama Residence',
  'Sahil Park Suites',
  'Kaya Palas',
  'Novax Premium Hotel',
];

async function main() {
  const now = new Date();
  const listings = [];

  for (let i = 0; i < 10; i++) {
    const isFeatured = i < 5;
    const listingDate = new Date(now);
    listingDate.setDate(now.getDate() - i);

    const facility = pick(facilities, i);
    const city = pick(cities, i);
    const district = pick(districts, i);
    const roomType = pick(['1+1', '2+1', '1+1 / 2+1', 'Stüdyo'], i);
    const season = pick(['Kış Dönemi', 'Yaz Dönemi', 'Bahar Dönemi'], i);
    const capacity = pick(['2 Kişilik', '4 Kişilik', '6 Kişilik'], i);
    const view = pick(['Deniz Manzarası', 'Doğa ve Bahçe Manzarası', 'Şehir Manzarası'], i);

    const price = 450000 + i * 25000;

    listings.push({
      name: `${facility} / Devremülk (${district} - ${city})`,
      description:
        'Örnek ilan açıklaması. Bu ilan demo amaçlı eklenmiştir. Detaylar admin panelden düzenlenebilir.',
      price,
      period: season,
      listing_date: listingDate.toISOString().slice(0, 10),
      is_featured: isFeatured,
      details: {
        contract_no: `LS${1300 + i}`,
        property_type: 'Devremülk',
        facility_name: facility,
        title_deed_status: 'Tapulu',
        room_type: roomType,
        area_m2: `${60 + i * 2} m²`,
        season,
        capacity,
        status: 'Kullanıma Hazır',
        location: `${district} / ${city}`,
        view,
        dues: 'Uygun',
        furnished: 'Eşyalı',
        usage_right: 'Her yıl 1 hafta',
      },
    });
  }

  console.log(`Eklenecek ilan: ${listings.length}`);

  const { data: inserted, error } = await supabase
    .from('listings')
    .insert(listings)
    .select('id,name');

  if (error) {
    console.error('İlan ekleme hatası:', error);
    console.error(
      'Not: Eğer "details" kolonu yoksa önce supabase-add-listing-details.sql çalıştır.'
    );
    process.exit(1);
  }

  console.log(`Eklenen ilan: ${inserted?.length ?? 0}`);

  const images = [];
  for (let i = 0; i < (inserted?.length ?? 0); i++) {
    const l = inserted[i];
    images.push(
      { listing_id: l.id, image_url: '/novax-hero.png', order: 0 },
      { listing_id: l.id, image_url: '/placeholder.jpg', order: 1 }
    );
  }

  const { error: imgErr } = await supabase.from('listing_images').insert(images);
  if (imgErr) {
    console.error('Görseller eklenemedi:', imgErr);
    process.exit(1);
  }

  console.log(`Eklenen görsel: ${images.length}`);
  console.log('Tamamlandı.');
}

main().catch((e) => {
  console.error('Beklenmeyen hata:', e);
  process.exit(1);
});

