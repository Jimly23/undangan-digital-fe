import React, { useEffect, useRef, useState } from 'react'
import instagram from '../assets/landing/instagram.svg';
import shopee from '../assets/landing/shopee.png';
import { FaChrome, FaHeart, FaHome } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { AiFillPicture } from 'react-icons/ai';
import { SiGooglemaps, SiShopee } from 'react-icons/si';
import { GiLovers } from 'react-icons/gi';
import { FaGift } from 'react-icons/fa6';
import { IoMailOpenOutline, IoWarning } from 'react-icons/io5';
import { TbMusic, TbMusicOff } from 'react-icons/tb';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

import bca from '../assets/bank/bca.png';
import bni from '../assets/bank/bni.png';
import bri from '../assets/bank/bri.png';
import mandiri from '../assets/bank/mandiri.png';
import dana from '../assets/bank/dana.png';
import ovo from '../assets/bank/ovo.png';
import { BiGlobe } from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';
import galeri1 from '../assets/laras/galeri1.jpeg';
import galeri2 from '../assets/laras/galeri2.jpeg';
import galeri3 from '../assets/laras/galeri3.jpeg';
import galeri4 from '../assets/laras/galeri4.jpeg';
import galeri5 from '../assets/laras/galeri5.jpeg';
import galeri6 from '../assets/laras/galeri6.jpeg';
import qr from '../assets/laras/qr.png';

const logoBank = {
  bca: bca,
  bni: bni,
  bri: bri,
  mandiri: mandiri,
  dana: dana,
  ovo: ovo,
};

function WeddingGiftSection({ dataCouple }) {
  // State untuk melacak nomor mana yang sedang disalin (untuk feedback visual)
  const [copiedId, setCopiedId] = useState(null);
  // State untuk toggle tampilan gift cards
  const [showGift, setShowGift] = useState(false);

  const giftData = [];

  if (dataCouple?.nomor_rekening) {
    giftData.push({
      id: 1,
      type: 'bank',
      namaPemilik: dataCouple.nama_rekening,
      nomor: dataCouple.nomor_rekening,
      logo: logoBank[dataCouple.nama_bank?.toLowerCase()?.trim()] || null,
      alt: dataCouple.nama_bank
    });
  }

  if (dataCouple?.nomor_rekening_2) {
    giftData.push({
      id: 2,
      type: 'bank',
      namaPemilik: dataCouple.nama_rekening_2,
      nomor: dataCouple.nomor_rekening_2,
      logo: logoBank[dataCouple.nama_bank_2?.toLowerCase()?.trim()] || null,
      alt: dataCouple.nama_bank_2
    });
  }

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    // Kembalikan teks tombol menjadi "Copy Number" setelah 2 detik
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#f4f6f4] min-h-screen px-6 py-14 flex flex-col items-center text-[#4a5c46] rubik-font">

      {/* --- HEADER --- */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-[50px] font-angin mb-6 text-[#4a5c46]">
          Wedding Gift
        </h2>
        <p className="text-sm leading-relaxed font-light text-gray-600 px-2">
          Doa restu anda merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih anda, anda dapat memberi kado secara cashless.
        </p>
      </div>

      {/* --- BUTTON TRIGGER TOGGLE/GIFT --- */}
      <div className="text-center mb-10">
        <p className="italic text-xs text-gray-500 mb-2">Klik Wedding Gift</p>
        <button onClick={() => setShowGift(!showGift)} className="flex items-center gap-2 bg-[#556b2f] text-white px-6 py-2.5 rounded-md shadow-md text-sm font-medium hover:bg-[#435425] transition-colors">
          {/* Icon Kotak Kado */}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v2a2 2 0 01-2 2h-1v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5H4a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5zM9 4a1 1 0 10-2 0v2h2V4zm2 2h2V4a1 1 0 10-2 0v2zm-7 4v2h12V10H4zm2 2v5a1 1 0 001 1h6a1 1 0 001-1v-5H6z" clipRule="evenodd" />
          </svg>
          Wedding Gift
        </button>
      </div>

      {/* --- LIST CARDS --- */}
      {showGift && <div className="w-full max-w-md flex flex-col gap-5">
        {giftData.map((gift) => (
          <div
            key={gift.id}
            className="w-full bg-gradient-to-b from-white to-[#fdfdfd] border border-gray-100 rounded-lg p-6 shadow-[0_4px_20px_0px_rgba(0,0,0,0.05)] relative flex flex-col min-h-[160px] justify-between"
          >
            {/* Render jika tipe kartu adalah REKENING BANK */}
            {gift.type === 'bank' && (
              <>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold tracking-wide text-gray-800">{gift.namaPemilik}</span>
                    <span className="text-lg font-medium text-gray-700 tracking-wider font-mono">{gift.nomor}</span>
                  </div>
                  {gift.logo ? (
                    <img src={gift.logo} alt={gift.alt} className="h-8 max-w-[120px] object-contain object-right" />
                  ) : (
                    <span className="text-xl font-bold text-gray-800 uppercase">{gift.alt}</span>
                  )}
                </div>

                <div className="mt-6 flex justify-start">
                  <button
                    onClick={() => handleCopy(gift.nomor, gift.id)}
                    className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all"
                  >
                    <CopyIcon />
                    {copiedId === gift.id ? 'Copied!' : 'Copy Number'}
                  </button>
                </div>
              </>
            )}

            {/* Render jika tipe kartu adalah ALAMAT KADO FISIK */}
            {gift.type === 'kado' && (
              <div className="flex flex-col items-center text-center w-full">
                {/* Gambar/Icon Kado */}
                {/* <div className="text-5xl mb-4 animate-bounce duration-1000">{gift.icon}</div> */}

                <span className="text-lg font-medium text-gray-600 tracking-wider font-mono mb-4">{gift.nomor}</span>

                <button
                  onClick={() => handleCopy(gift.nomor, gift.id)}
                  className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all mb-4"
                >
                  <CopyIcon />
                  {copiedId === gift.id ? 'Copied!' : 'Copy Number'}
                </button>

                <span className="text-sm font-bold tracking-wide text-gray-800 uppercase">{gift.namaPemilik}</span>
              </div>
            )}
          </div>
        ))}
      </div>}
    </div>
  );
}

// Sub-Komponen Kecil Untuk Icon Copy (Biar Kode Bersih)
function CopyIcon() {
  return (
    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
  );
}

function ClosingSection({ dataCouple, fotoDefault, warnaPrimary }) {
  return (
    <div className="w-full flex flex-col rubik-font">

      {/* --- SECTION 1: FOTO & UCAPAN TERIMA KASIH --- */}
      <div className="w-full h-[65vh] relative flex items-end justify-center pb-12 px-6">
        {/* Foto Mempelai sebagai Background */}
        <img
          src={dataCouple?.foto_mempelai_background ? dataCouple?.foto_mempelai_background : fotoDefault}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          alt="Mempelai"
        />

        {/* Gradien Efek: Memudar dari transparan (atas) ke warna hijau sage solid (bawah) */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#79926e] via-[#79926e]/60 to-transparent z-10"></div>

        {/* Konten Teks di Atas Foto */}
        <div className="relative z-20 text-center text-white max-w-md mx-auto">
          <p className="text-sm font-serif tracking-[0.2em] mb-1 text-white/90">
            TERIMAKASIH
          </p>

          {/* Gunakan font cursive pilihan Anda, di sini pakai font-serif italic sebagai fallback */}
          <h2 className="text-[50px] font-angin italic my-3 tracking-wide drop-shadow-sm">
            Kami Yang Berbahagia
          </h2>

          <p className="text-xs font-light tracking-wide text-white/90">
            Kedua Mempelai & Keluarga Besar
          </p>
        </div>
      </div>

      {/* --- SECTION 2: FOOTER & CREDIT --- */}
      <div className="bg-[#79926e] w-full pt-4 pb-12 px-6 flex flex-col items-center gap-6 text-white relative z-20">

        <p className="text-sm font-light tracking-wider text-white/90">
          Design By Youvitation
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/6282329322353"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#79926e] hover:bg-white/90 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* Tombol Instagram */}
          <a href="https://instagram.com/youvitation" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#79926e] hover:bg-white/90 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        {/* Dekorasi Salju Bawah Lembut (Opsional) */}
        {/* <div className="text-white/40 text-xs mt-4">❄</div> */}
      </div>

    </div>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",  // Nama hari (Senin, Selasa, ...)
    day: "numeric",   // Tanggal
    month: "long",    // Nama bulan (Januari, Februari, ...)
    year: "numeric",  // Tahun
  }).format(date);
};

const CountdownTimer = ({ targetDate, warnaPrimary }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(targetDate) {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="1200"
      className="absolute left-0 right-0 mx-auto bottom-[80px] flex items-center justify-between px-10"
    >
      <div style={{ backgroundColor: warnaPrimary }} className={`w-[60px] h-[60px] flex items-center justify-center rounded text-white text-lg font-medium`}>
        {timeLeft.days}
      </div>
      <div style={{ backgroundColor: warnaPrimary }} className={`w-[60px] h-[60px] flex items-center justify-center rounded text-white text-lg font-medium`}>
        {timeLeft.hours}
      </div>
      <div style={{ backgroundColor: warnaPrimary }} className={`w-[60px] h-[60px] flex items-center justify-center rounded text-white text-lg font-medium`}>
        {timeLeft.minutes}
      </div>
      <div style={{ backgroundColor: warnaPrimary }} className={`w-[60px] h-[60px] flex items-center justify-center rounded text-white text-lg font-medium`}>
        {timeLeft.seconds}
      </div>
    </div>
  );
};

function GallerySection() {
  // Ganti url gambar di bawah dengan aset asli Anda
  const images = [
    galeri4, // Gambar Utama / Slide 1
    galeri5, // Slide 2
    galeri6, // Slide 3
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="bg-[#EAECE6] min-h-screen py-12 px-6 font-sans text-[#4A5D4E]">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* Header Title */}
        <div className="text-center mb-6">
          <h2 className="font-angin text-[80px] text-[#5F7464] italic tracking-wide">
            Galeri
          </h2>
          <p className="text-sm font-medium tracking-wider -mt-5 text-[#6B7F70]">
            Ahmad & Laras
          </p>
        </div>

        {/* Frame Utama Galeri */}
        <div className="border-[6px] border-[#7A9080] p-3 w-full bg-transparent rounded-sm">
          
          {/* Slider Gambar Utama */}
          <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-200 shadow-inner group">
            <img
              src={images[currentIndex]}
              alt={`Foto Pernikahan ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />
            
            {/* Tombol Navigasi Kiri */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1 rounded-full transition"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>

            {/* Tombol Navigasi Kanan */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1 rounded-full transition"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>
          </div>

          {/* Grid Thumbnails (3 Kolom di Bawah) */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`aspect-square overflow-hidden cursor-pointer transition border-2 ${
                  currentIndex === index ? 'border-[#4A5D4E] scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Footer Section: Quote & Music Control */}
        <div className="relative w-full mt-6 px-2 flex items-center justify-between">
          {/* Quote Text */}
          <div className="text-center flex-1 pr-8">
            <p className="italic text-base md:text-lg text-[#5F7464] font-serif leading-relaxed">
              “Loved you yesterday, love you still, always have, always will.”
            </p>
          </div>

          {/* Music Toggle Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute right-0 bottom-1 flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#5F7464] shadow-sm hover:shadow transition-all active:scale-95"
            aria-label="Toggle Music"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" className="text-[#5F7464]" />
            ) : (
              <Play size={16} fill="currentColor" className="ml-0.5 text-[#5F7464]" />
            )}
          </button>
        </div>

      </div>
    </section>
  );
}



const LayoutOptional = ({ tamu, background, bingkai, dataCouple, fotoDefault, warnaPrimary, posisiLingkaran }) => {
  const decodedTamu = decodeURIComponent(tamu);
  const audioRef = useRef(null);
  const galery = dataCouple?.galery || [];
  const [musicOn, setMusicOn] = useState(true);
  const [openInvitation, setOpenInvitation] = useState(false);
  const [textCopy, setTextCopy] = useState(false);
  const [konfirmasiHadir, setKonfirmasiHadir] = useState('');
  const [namaTamu, setNamaTamu] = useState('');
  const [popupNamaTamuKosong, setPopupNamaTamuKosong] = useState(null);
  const [loveStory, setLoveStory] = useState('');
  // const loveStory = dataCouple?.love_story.split('|') || [];

  const [isChrome, setIsChrome] = useState(true);

  const stories = [
    {
      id: 1,
      judul: "Pertemuan",
      tahun: "Tahun 2018",
      cerita: "Tidak ada yang kebetulan semua sudah tersusun sangat rapih oleh Sang Maha Kuasa. Kita bisa memilih kepada siapa kita jatuh cinta. Ternyata tuhan mempertemukan kita di bulan Oktober 2018 tanpa sengaja melalui media sosial dan tak terduga kami satu kampus, satu fakultas dan satu daerah asal yang sama jarak rumah kami hanya 15 menit saja, dari situlah kami menjalin pertemanan. Di antara miliaran kemungkinan, semesta memilih untuk mempertemukan kami dalam satu waktu yang tak terduga, memulai cerita yang telah Tuhan gariskan."
    },
    {
      id: 2,
      judul: "Menjalin Hubungan",
      tahun: "Tahun 2020",
      cerita: "Seiring berjalannya waktu pertemanan kami ini dari percakapan yang hanya basa basi perlaha menjelma menjadi perhatian kecil yang tumbuh tanpa disadari. Ada rasa nyaman di setiap cerita yang di bagikan dan ada ketenangan yang pelan-pelan mengisi ruang hati. Dari situlah kami memutuskan untuk melangkah bersama memahami dan mengenal lebih dekat ditahun 2020."
    },
    {
      id: 3,
      judul: "Lamaran",
      tahun: "Tahun 2025",
      cerita: "Setelah saling menguatkan selama beberapa tahun. Tepat di tanggal 13 Juni 2025. Atas izin Allah dan kedua orang tua. Niat baik kami akhirnya berlanjut pada sebuah acara lamaran yang penuh doa dan kebahagiaan."
    },
    {
      id: 4,
      judul: "Pernikahan",
      tahun: "Tahun 2026",
      cerita: "Kami tidak mencari kesempurnaan, tapi saling melengkapi kekurangan, setelah melewati ombak, badai dan angin yang begitu kencang, sampailah dititik ini. Kini kami adalah tuan dan puan dengan sisi ego dan kosong yang bertapak di atas permulaan menuju tujuan, Bersama, kami berlayar. Pada hari Minggu 07 Juni 2026 bukan hanya awal dari lembaran baru, tetapi juga peneguh cinta yang ingin kami jaga selamanya dalam ikatan pernikaham, dan inilah janji kami untuk hari ini dan selamanya."
    }
  ];



  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isUsingChrome = userAgent.includes("chrome") && !userAgent.includes("edg"); // Edge tidak dihitung sebagai Chrome
    setIsChrome(isUsingChrome);
  }, []);

  // console.log(dataCouple)

  const openInChrome = () => {
    const url = window.location.href;

    // Untuk Android
    if (/android/.test(navigator.userAgent.toLowerCase())) {
      window.location.href = `intent://${url.replace(/^https?:\/\//, "")}#Intent;scheme=https;package=com.android.chrome;end;`;
    }
    // Untuk iOS
    else if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
      window.location.href = `googlechrome://${url.replace(/^https?:\/\//, "")}`;
    } else {
      alert("Silakan buka undangan ini di Google Chrome secara manual.");
    }
  };

  useEffect(() => {
    if (dataCouple?.musik) {
      audioRef.current = new Audio(dataCouple.musik);
    }
    if (dataCouple?.love_story) {
      setLoveStory(dataCouple.love_story.split('|'));
    }
  }, [dataCouple?.musik]);


  const handleOpenInvitation = () => {
    setOpenInvitation(true);
    toggleFullscreen();
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Playback error:", error));
      setMusicOn(false);
    }
  };

  const handleMusic = () => {
    if (musicOn) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setMusicOn(!musicOn);
  }

  const handleChangeNamaTamu = (e) => {
    setNamaTamu(e.target.value)
  }


  const toggleFullscreen = () => {
    // const element = document.documentElement;

    // if (!document.fullscreenElement) {
    //   if (element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if (element.webkitRequestFullscreen) {
    //     element.webkitRequestFullscreen();
    //   } else if (element.msRequestFullscreen) {
    //     element.msRequestFullscreen();
    //   }
    // } else {
    //   if (document.exitFullscreen) {
    //     document.exitFullscreen();
    //   } else if (document.webkitExitFullscreen) {
    //     document.webkitExitFullscreen();
    //   } else if (document.msExitFullscreen) {
    //     document.msExitFullscreen();
    //   }
    // }
  };

  const reservasi = (phoneNumber) => {
    if (namaTamu == '') {
      setPopupNamaTamuKosong('Nama tamu harus di isi!')
      setTimeout(() => {
        setPopupNamaTamuKosong(null);
      }, 3000);
      return
    }
    if (konfirmasiHadir == '') {
      setPopupNamaTamuKosong('Pilih konfirmasi hadir terlebih dahulu!')
      setTimeout(() => {
        setPopupNamaTamuKosong(null);
      }, 3000);
      return
    }
    const message = `*Konfirmasi Kehadiran* \nNama : ${namaTamu} - ${konfirmasiHadir}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleCopyClick = (nomor) => {
    navigator.clipboard
      .writeText(nomor)
      .then(() => {
        setTextCopy(true);
        setTimeout(() => {
          setTextCopy(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
      });
  };


  return (
    <div className={`overflow-hidden ${!openInvitation && 'max-h-screen'}`}>
      <Helmet>
        <title>{dataCouple
          ? `${dataCouple.nama_panggilan_pria} & ${dataCouple.nama_panggilan_wanita}`
          : "Loading..."}
        </title>
        <meta name="keywords" content="undangan digital, undangan pernikahan digital, undangan online, kartu undangan pernikahan" />
      </Helmet>
      <div className="max-w-md mx-auto relative overflow-x-hidden">

        {!openInvitation &&
          <div id="parent" className="absolute z-40 flex justify-center items-center top-0 left-0 right-0 h-screen bg-black bg-opacity-50">
            {dataCouple?.musik &&
              <button data-aos="zoom-in" onClick={handleOpenInvitation} className="text-white glassmorphism py-2 pb-4 px-4 rounded-lg rubik-font text-sm">
                <IoMailOpenOutline size={70} className='mx-auto' />
                Buka Undangan
              </button>
            }
          </div>
        }

        <div id='home' className="h-screen flex items-center justify-center relative overflow-hidden">
          <img
            src={dataCouple?.foto_mempelai && dataCouple?.foto_mempelai}
            className='absolute top-0 left-0 w-full h-full object-cover z-0'
          />
          {/* <div className='w-full h-[60%] bg-gradient-to-t from-[#cfdac9] via-[#cfdac9]/70 to-transparent absolute bottom-0 z-10'></div> */}
          <div className="absolute z-20 w-full bottom-32 flex items-center justify-center flex-col text-white px-4">
            <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="mb-3 text-sm">
              The Wedding Of
            </h6>
            <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="text-[50px] font-angin italic mb-5 mt-2 text-center">
              {dataCouple?.nama_panggilan_pria} & {dataCouple?.nama_panggilan_wanita}
            </h4>
            <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="rubik-font text-center text-sm font-light tracking-wide">
              Kepada Yth <br />
              <span className='text-xl font-medium block mt-2 underline decoration-wavy decoration-[#27411e]/30'>
                {decodedTamu}
              </span>
            </h6>
          </div>
        </div>

        <div id='awal' className="flex min-h-screen item-center justify-center flex-col relative text-white">
          <img src={dataCouple?.foto_mempelai_background ? dataCouple?.foto_mempelai_background : fotoDefault[0]} className='absolute top-0 w-full h-full object-cover left-0' />
          <div className={`text-center absolute bottom-[160px] left-0 z-10 w-full flex justify-center flex-col`}>
            <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">The Wedding Of</h6>
            <h4 className="text-[80px] font-angin font-medium flex justify-center gap-x-3 flex-col my-5 px-2">
              <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className='leading-[45px]'>{dataCouple?.nama_panggilan_pria} & {dataCouple?.nama_panggilan_wanita}</span>
            </h4>
            {dataCouple?.tanggal_akad &&
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000" className='rubik-font'>{formatDate(dataCouple?.tanggal_akad)}</h6>
            }
          </div>
          <CountdownTimer targetDate={`${dataCouple?.tanggal_akad}T23:59:59`} warnaPrimary={'#7c9474'} />

        </div>
        <div className={`text-center py-10 px-5 bg-[#e8eae5] text-[#7e9475]`}>
          <p className='text-3xl '>A | L</p>
          <div className='w-full h-[280px] my-5 border-2 border-[#7e9475]'>
            <img src={galeri1} alt="" className='w-full h-full object-cover' />
          </div>
          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className="text-[14px] rubik-font text-justify my-3">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="text-[14px] rubik-font">( Q.S. Ar-Rum:21 )</p>
          <div className='flex items-center gap-x-2 my-10'>
            <div className='w-full h-[100px] border-2 border-white'>
              <img src={galeri1} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-[100px] border-2 border-white'>
              <img src={galeri2} alt="" className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-[100px] border-2 border-white'>
              <img src={galeri3} alt="" className='w-full h-full object-cover' />
            </div>
          </div>
        </div>
        <div id='mempelai' className="min-h-screen flex item-center justify-center relative py-16 bg-[#cfdac9] text-[#686a65]">
          <div className={` text-center relative z-10 w-full h-full flex mt-10 justify-center flex-col`}>
            <div className="mb-24 text-[14px] px-5">
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-3xl text-white font-medium mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ</h6>
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="font-medium rubik-font mt-5 mb-3">Assalamualaikum Warahmatullahi Wabarakatuh</h6>
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="font-medium rubik-font">Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, dengan ini kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami:</h6>
            </div>
            <div className="mempelai-wanita">
              <div className='relative w-[250px] h-[320px] bg-[#7c9474]'>
                <div className='absolute w-[250px] h-[320px] bg-[#7c9474] -left-3 -top-3'>
                  <img src={dataCouple?.foto_mempelai_wanita ? dataCouple?.foto_mempelai_wanita : fotoDefault[2]} className='w-full h-full object-cover' />
                  <p className='text-white font-angin text-[100px] absolute z-99 left-16 -bottom-10'>{dataCouple?.nama_panggilan_wanita}</p>
                </div>
              </div>
              <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="text-[50px] font-angin ms-6 text-white mt-5 font-medium flex flex-col leading-[55px] text-left">{dataCouple?.nama_lengkap_wanita}</h4>
              <div className="rubik-font text-left ms-6">
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">Putri dari Bapak {dataCouple?.nama_ayah_mempelai_wanita} & Ibu {dataCouple?.nama_ibu_mempelai_wanita}</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" className='mt-4'>Alamat:</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">{dataCouple?.alamat_wanita}</p>
              </div>
            </div>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="my-20 text-4xl text-white">&#x26;</p>
            <div className="mempelai-pria flex flex-col">
              <div className='relative w-[250px] h-[320px] bg-[#7c9474] self-end'>
                <div className='absolute w-[250px] h-[320px] bg-[#7c9474] -left-3 -top-3'>
                  <img src={dataCouple?.foto_mempelai_pria ? dataCouple?.foto_mempelai_pria : fotoDefault[1]} className="w-full h-full object-cover" alt="" />
                  <p className='text-white font-angin text-[100px] absolute z-99 left-10 -bottom-10'>{dataCouple?.nama_panggilan_pria}</p>
                </div>
              </div>
              <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="text-[60px] font-angin mr-6 text-right text-white mt-5 font-medium flex flex-col leading-[55px]">{dataCouple?.nama_lengkap_pria}</h4>
              <div className="rubik-font text-right mr-6">
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">Putra dari Bapak {dataCouple?.nama_ayah_mempelai_pria} & Ibu {dataCouple?.nama_ibu_mempelai_pria}</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" className='mt-4'>Alamat:</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">{dataCouple?.alamat_pria}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ color: warnaPrimary }} id='akad' className="px-6 relative py-10 flex flex-col gap-6 min-h-screen">
          {/* Gambar Background */}
          <img
            src={dataCouple?.foto_mempelai_background ? dataCouple?.foto_mempelai_background : fotoDefault[0]}
            className='absolute top-0 w-full h-full object-cover left-0 z-0'
            alt="Background"
          />

          {/* ================= CARD 1: AKAD ================= */}
          <div className='rubik-font w-full z-10 relative rounded-lg shadow-lg overflow-hidden flex flex-col'>
            {/* Top Bar Card */}
            <div className='w-full h-[30px] border-b border-black/5 bg-white/95 rounded-t-lg'></div>

            {/* Body Card */}
            <div className='grid grid-cols-3 bg-white/95 items-center p-4 min-h-[180px]'>
              {/* Kolom Tanggal */}
              <div className='w-full h-full flex items-center justify-center border-r border-black/5'>
                {dataCouple?.tanggal_akad && (() => {
                  const [tahun, bulan, tanggal] = dataCouple.tanggal_akad.split('-');
                  const tahunPendek = tahun.slice(-2);

                  return (
                    <div className="text-3xl flex flex-col items-center text-center font-mono font-bold text-gray-400 leading-tight">
                      <span>{tanggal}</span>
                      <span>{bulan}</span>
                      <span>{tahunPendek}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Kolom Detail */}
              <div className='w-full h-full col-span-2 text-[#27411e] pl-4 flex flex-col justify-between py-1'>
                <div className='text-sm font-thin mb-3'>
                  <h5 className='text-lg font-bold mb-1'>Akad Nikah</h5>
                  <h5 className='font-normal text-xs text-gray-500'>Hari/Tanggal</h5>
                  {dataCouple?.tanggal_akad &&
                    <h6 className='font-medium'>{formatDate(dataCouple?.tanggal_akad)}</h6>
                  }
                  <h6>{dataCouple?.jam_akad} WIB - Selesai</h6>
                </div>
                <div className='text-sm'>
                  <h5 className='font-normal text-xs text-gray-500'>Lokasi</h5>
                  <h6 className="font-thin leading-snug">{dataCouple?.tempat_akad}</h6>
                </div>
              </div>
            </div>

            {/* Button Maps */}
            <div className='w-full py-3 text-sm bg-[#79926e] text-white rounded-b-lg flex items-center justify-center cursor-pointer font-medium hover:bg-[#687e5e] transition-colors'>
              Open Google Maps
            </div>
          </div>

          {/* ================= CARD 2: RESEPSI / ACARA LAIN ================= */}
          <div className='rubik-font w-full z-10 relative rounded-lg shadow-lg overflow-hidden flex flex-col'>
            {/* Top Bar Card */}
            <div className='w-full h-[30px] border-b border-black/5 bg-white/95 rounded-t-lg'></div>

            {/* Body Card */}
            <div className='grid grid-cols-3 bg-white/95 items-center p-4 min-h-[180px]'>
              {/* Kolom Tanggal */}
              <div className='w-full h-full flex items-center justify-center border-r border-black/5'>
                {dataCouple?.tanggal_resepsi && (() => {
                  const [tahun, bulan, tanggal] = dataCouple.tanggal_resepsi.split('-');
                  const tahunPendek = tahun.slice(-2);

                  return (
                    <div className="text-3xl flex flex-col items-center text-center font-mono font-bold text-gray-400 leading-tight">
                      <span>{tanggal}</span>
                      <span>{bulan}</span>
                      <span>{tahunPendek}</span>
                    </div>
                  );
                })()}
              </div>

              {/* Kolom Detail */}
              <div className='w-full h-full col-span-2 text-[#27411e] pl-4 flex flex-col justify-between py-1'>
                <div className='text-sm font-thin mb-3'>
                  <h6 className="text-lg font-bold mb-1">
                    {dataCouple?.tipe_acara === "Resepsi" ? "Resepsi" : "Tasyakuran"}
                  </h6>
                  <h5 className='font-normal text-xs text-gray-500'>Hari/Tanggal</h5>
                  {dataCouple?.tanggal_resepsi_opsional === null ?
                    <h6 className='font-medium'>{formatDate(dataCouple?.tanggal_resepsi)}</h6> :
                    <h6 className='font-medium'>{dataCouple?.tanggal_resepsi_opsional}</h6>
                  }
                  <h6>{dataCouple?.jam_resepsi} WIB - Selesai</h6>
                </div>
                <div className='text-sm'>
                  <h5 className='font-normal text-xs text-gray-500'>Lokasi</h5>
                  <h6 className="font-thin leading-snug">{dataCouple?.tempat_resepsi}</h6>
                </div>
              </div>
            </div>

            {/* Button Maps */}
            <div className='w-full py-3 text-sm bg-[#79926e] text-white rounded-b-lg flex items-center justify-center cursor-pointer font-medium hover:bg-[#687e5e] transition-colors'>
              Open Google Maps
            </div>
          </div>
        </div>
        <div id='maps' className="flex flex-col items-center justify-center relative py-[30px] rubik-font bg-[#708a65]">
          <div className="relative">
            <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className={`text-center text-[70px] mb-10 text-white font-angin`}>Maps</h5>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[300px] h-[300px] mx-auto sm:w-[350px] sm:h-[350px] bg-[${warnaPrimary}] shadow-xl border rounded-2xl overflow-hidden">
              {/* <iframe src={dataCouple?.link_map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              >
              </iframe> */}
              <img src={qr} alt="qr" className='h-full w-full' />
            </div>
          </div>
        </div>

        <GallerySection />

        <div className="bg-[#cbd2c9] min-h-screen px-6 py-12 flex flex-col items-center select-none text-[#5c6e58]">
          {/* --- HEADER SECTION --- */}
          <div className="text-center max-w-md mx-auto mb-10">
            {/* Judul Utama (Gunakan font cursive pilihan Anda, di sini pakai font-serif/playfair sebagai fallback) */}
            <h1 className="font-angin text-[80px] italic text-[#4a5c46]">
              Love story
            </h1>

            {/* Quote */}
            <p className="text-sm leading-relaxed font-serif mb-3 text-[#4a5c46]/90 px-2">
              " Tidak ada yang kebetulan yang terjadi di dunia ini, sepertinya semua pertemuan dan kejadian sudah direncanakan sejak awal, "
            </p>

            {/* Penulis Quote */}
            <span className="text-xs font-medium tracking-wide">
              ~ Silver Rayleigh ~
            </span>
          </div>

          <div className="w-full max-w-md flex flex-col gap-8">
            {stories.map((story) => (
              <div
                key={story.id}
                className="w-full bg-[#e3e7e2]/90 border-[4px] border-[#79926e] rounded-sm p-6 shadow-[8px_8px_0px_0px_rgba(104,122,97,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(104,122,97,0.3)] transition-all duration-300"
              >
                {/* Judul Momen */}
                <h2 className="text-lg font-serif tracking-widest text-[#4a5c46] mb-2 uppercase">
                  {story.judul}
                </h2>

                {/* Tahun Kejadian */}
                <h3 className="text-sm font-serif text-[#5c6e58] mb-4">
                  {story.tahun}
                </h3>

                {/* Isi Cerita */}
                <p className="text-sm leading-relaxed text-[#5c6e58]/90 font-serif tracking-wide text-justify">
                  {story.cerita}
                </p>
              </div>
            ))}
          </div>
        </div>
        {dataCouple?.galery &&
          <div id='galery' className="flex item-center justify-center relative">
            <img src={background[0]} className="absolute top-0 left-0 object-cover z-10 w-full" alt="" />
            <img src={background[3]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt="" />
            <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
            <div style={{ color: warnaPrimary }} className="py-[350px] px-3 text-center relative z-10 w-full h-full flex -top-24 justify-center flex-col">
              <p data-aos="fade-up" className='text-[30px] mb-16'>Galery</p>
              <div className="grid grid-cols-2 gap-2">
                {galery.map((item, index) => (
                  <div key={index} className={`${index % 3 == 0 ? 'col-span-2 h-[250px]' : ''} relative overflow-hidden w-full h-[200px] rounded-lg`} data-aos="fade-up">
                    <img src={item} className='w-full h-full object-cover' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        <div style={{ backgroundColor: '#7c9474' }} id='reservasi' className={`flex item-center justify-center relative text-white`}>
          <div className="pt-[150px] px-4 pb-[100px] relative z-10 w-full h-full flex justify-center flex-col rubik-font">
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="glassmorphism w-full mb-16 text-sm font-semibold rounded-lg p-5">
              <div>
                <p className='text-center text-lg font-medium mb-5'>Konfirmasi Kehadiran</p>
                <div>
                  <label>Nama</label>
                  <input onChange={handleChangeNamaTamu} type="text" placeholder='Masukan Nama Anda' className='text-slate-500 p-3 w-full outline-none mt-2 border rounded-full' />
                </div>
                <div className='mt-3'>
                  <p>Konfirmasi</p>
                  <div onClick={() => setKonfirmasiHadir('Hadir 1 orang')} className='flex items-center gap-x-3 cursor-pointer my-2'>
                    <div className={`${konfirmasiHadir == 'Hadir 1 orang' ? 'bg-blue-900' : 'bg-slate-200'} w-3 h-3 rounded-full`}></div>
                    <p>Hadir 1 orang</p>
                  </div>
                  <div onClick={() => setKonfirmasiHadir('Hadir 2 orang')} className='flex items-center gap-x-3 cursor-pointer'>
                    <div className={`${konfirmasiHadir == 'Hadir 2 orang' ? 'bg-blue-900' : 'bg-slate-200'} w-3 h-3 rounded-full`}></div>
                    <p>Hadir 2 orang</p>
                  </div>
                </div>
                <div className='mt-5'>
                  <button onClick={() => reservasi(dataCouple?.nomor_whatsapp_wanita)} className='w-full p-3 rounded-full glassmorphism-button text-white'>Kirim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WeddingGiftSection dataCouple={dataCouple} />
        <ClosingSection dataCouple={dataCouple} fotoDefault={fotoDefault} warnaPrimary={warnaPrimary} />

        {/* Pop Up Copy Rekening */}
        {textCopy && (
          <div style={{ color: warnaPrimary }} className={`copytext rubik-font fixed top-10 glassmorphism left-1/2 transform -translate-x-1/2 px-5 py-1 rounded-full z-[9]`}>
            Berhasil di Salin
          </div>
        )}

        {/* Pop Up Nama Tamu Kosong */}
        {popupNamaTamuKosong &&
          <div className="fixed z-40 flex justify-center items-center top-0 left-0 right-0 h-screen bg-black bg-opacity-50">
            <button className="text-white glassmorphism py-2 pb-4 px-4 rounded-lg rubik-font text-sm">
              <IoWarning size={50} className='mx-auto mb-3' />
              {popupNamaTamuKosong}
            </button>
          </div>
        }

        {isChrome ? (
          <></>
        ) : (
          <div className="fixed z-40 flex justify-center items-center top-0 left-0 right-0 h-screen bg-black bg-opacity-50">
            <button className="text-white glassmorphism py-2 pb-4 px-4 rounded-lg rubik-font text-sm">
              <p onClick={() => setIsChrome(true)} className='absolute right-4 top-2 text-lg'>X</p>
              <FaChrome size={60} className='mx-auto mb-3 mt-5' />
              Buka di chrome untuk <br />pengalaman yang lebih baik <br /> <span onClick={openInChrome} className='glassmorphism py-1 px-2 mt-3 block'>Buka</span>
            </button>
          </div>
        )}

        {/* Bottom Navbar */}
        <div className="fixed bottom-2 left-0 right-0 z-10">
          <div className="max-w-md px-2 mx-auto text-white text-[13px]">
            <div className='glassmorphism rounded-xl border w-full h-[50px] flex items-center px-3 justify-between'>
              <a style={{ backgroundColor: warnaPrimary }} href="#home" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><FaHome size={18} /></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#mempelai" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><FaHeart size={18} /></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#akad" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><MdOutlineDateRange size={18} /></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#maps" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><SiGooglemaps size={18} /></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#gift" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><FaGift size={18} /></a>
              {dataCouple?.love_story &&
                <a style={{ backgroundColor: warnaPrimary }} href="#love-story" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><GiLovers size={18} /></a>
              }
              {dataCouple?.galery &&
                <a style={{ backgroundColor: warnaPrimary }} href="#galery" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><AiFillPicture size={18} /></a>
              }
              <div onClick={handleMusic} className="absolute cursor-pointer right-0 -top-12 border w-[40px] h-[40px] glassmorphism-button text-white p-1 rounded-full flex items-center justify-center">
                <div style={{ backgroundColor: warnaPrimary }} className={`p-1 rounded-full w-full h-full flex items-center justify-center`}>
                  {!musicOn ? <TbMusic size={18} /> : <TbMusicOff size={18} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutOptional