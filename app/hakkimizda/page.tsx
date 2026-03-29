import Link from 'next/link';

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600">
            NOVAX Reklam Danışmanlık
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Story */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hikayemiz</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              NOVAX; reklam ve danışmanlık alanında, markaların dijital ve fiziksel mecralarda daha görünür olmasını sağlamak için
              çözümler üreten bir ekiptir. İhtiyaca göre strateji, tasarım ve uygulama süreçlerini tek çatı altında yönetir.
            </p>
            <p>
              Şeffaf iletişim, ölçülebilir çıktı ve sürdürülebilir büyüme odağıyla; küçük işletmelerden kurumsal markalara kadar
              farklı ölçekteki müşterilerimize gerçekçi ve uygulanabilir yol haritaları sunuyoruz.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Misyonumuz</h3>
              <p className="text-gray-600">
                Markaların hedef kitlesine doğru mesajla, doğru kanalda ulaşmasını sağlayan pratik ve etkili reklam çözümleri üretmek.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vizyonumuz</h3>
              <p className="text-gray-600">
                Reklam ve danışmanlık alanında, güvenilirliği ve iş disipliniyle tercih edilen bir çözüm ortağı olmak.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Değerlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Güvenilirlik</h3>
              <p className="text-sm text-gray-600">
                Her işlemde şeffaf ve güvenilir hizmet
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Müşteri Odaklılık</h3>
              <p className="text-sm text-gray-600">
                Müşteri memnuniyeti önceliğimiz
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Hizmet</h3>
              <p className="text-sm text-gray-600">
                Zamanınıza değer veren yaklaşım
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#161616] rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">İletişim</h2>
          <div className="max-w-2xl mx-auto text-sm text-[#d0d0d0] space-y-3">
            <p><span className="font-semibold text-white">Telefon:</span> 0545 988 0337</p>
            <p><span className="font-semibold text-white">E-posta:</span> novaxreklamdanismanlik@gmail.com</p>
            <p><span className="font-semibold text-white">Adres:</span> Cevizli Mahallesi Bayraktar Sokak 1/3 Nursanlar Apt. Daire:16 Kartal / İstanbul</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            NOVAX ile iletişime geçin
          </h2>
          <p className="text-gray-600 mb-8">
            Projeniz için hızlı bir ön görüşme yapalım.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-black transition-colors"
          >
            İletişim
          </Link>
        </section>
      </div>
    </div>
  );
}
