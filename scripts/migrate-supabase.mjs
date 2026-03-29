import { createClient } from '@supabase/supabase-js';

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Eksik env: ${name}`);
  return v;
}

const OLD_URL = required('OLD_SUPABASE_URL');
const OLD_SERVICE = required('OLD_SUPABASE_SERVICE_ROLE_KEY');
const NEW_URL = required('NEW_SUPABASE_URL');
const NEW_SERVICE = required('NEW_SUPABASE_SERVICE_ROLE_KEY');

const oldDb = createClient(OLD_URL, OLD_SERVICE, { auth: { persistSession: false } });
const newDb = createClient(NEW_URL, NEW_SERVICE, { auth: { persistSession: false } });

async function fetchAll(client, table, select = '*', pageSize = 1000) {
  let from = 0;
  const out = [];
  // Supabase max row limit: paginate
  while (true) {
    const to = from + pageSize - 1;
    const { data, error } = await client.from(table).select(select).range(from, to);
    if (error) throw error;
    if (!data || data.length === 0) break;
    out.push(...data);
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return out;
}

async function upsertInBatches(client, table, rows, batchSize = 500) {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await client.from(table).upsert(batch, { onConflict: 'id' });
    if (error) throw error;
    process.stdout.write(`- ${table}: ${Math.min(i + batchSize, rows.length)}/${rows.length}\n`);
  }
}

async function main() {
  console.log('Eski Supabase -> Yeni Supabase taşıma başlıyor.');

  // 1) listings
  const listings = await fetchAll(oldDb, 'listings');
  console.log(`listings: ${listings.length}`);
  await upsertInBatches(newDb, 'listings', listings);

  // 2) listing_images
  const listingImages = await fetchAll(oldDb, 'listing_images');
  console.log(`listing_images: ${listingImages.length}`);
  await upsertInBatches(newDb, 'listing_images', listingImages);

  // 3) media_library (opsiyonel)
  try {
    const media = await fetchAll(oldDb, 'media_library');
    console.log(`media_library: ${media.length}`);
    await upsertInBatches(newDb, 'media_library', media);
  } catch (e) {
    console.log('media_library okunamadı (yoksa sorun değil).', e?.message ?? e);
  }

  console.log('Tamamlandı.');
}

main().catch((e) => {
  console.error('Hata:', e);
  process.exit(1);
});

