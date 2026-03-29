import Link from 'next/link';

export default function EkibimizPage() {
  return (
    <div className="min-h-screen bg-white">
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Ekibimiz
          </h1>
          <p className="text-gray-600">
            NOVAX ekibi
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center">
          <div className="w-40 h-40 bg-white border border-gray-200 shadow-sm flex items-center justify-center">
            <div className="text-center leading-tight">
              <div className="text-[14px] font-black tracking-wide text-gray-900">NOVAX</div>
              <div className="text-[12px] font-semibold tracking-wide text-gray-700">REKLAM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

