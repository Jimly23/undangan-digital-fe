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

import bca from '../assets/bank/bca.png';
import bni from '../assets/bank/bni.png';
import bri from '../assets/bank/bri.png';
import mandiri from '../assets/bank/mandiri.png';
import dana from '../assets/bank/dana.png';
import ovo from '../assets/bank/ovo.png';
import { BiGlobe } from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';

const logoBank = {
  bca: bca,
  bni: bni,
  bri: bri,
  mandiri: mandiri,
  dana: dana,
  ovo: ovo,
};

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
      className="absolute left-0 right-0 mx-auto bottom-[300px] flex items-center justify-between px-10"
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



const Layout = ({tamu, background, bingkai, dataCouple, fotoDefault, warnaPrimary, posisiLingkaran}) => {
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
    if(dataCouple?.love_story) {
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
    if(namaTamu == '') {
      setPopupNamaTamuKosong('Nama tamu harus di isi!')
      setTimeout(() => {
        setPopupNamaTamuKosong(null);
      }, 3000);
      return
    }
    if(konfirmasiHadir == '') {
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
                <IoMailOpenOutline size={70} className='mx-auto'/>
                Buka Undangan
              </button>
            }
          </div>
        }

        <div id='home' className="h-screen flex item-center justify-center relative">
          <img src={background[1]} className="absolute -top-16 left-0 object-cover z-10 w-full" alt=""/>
          <img src={background[2]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt=""/>
          <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
          <div style={{ color: warnaPrimary }} className={`relative z-10 w-full h-full flex items-center justify-center flex-col`}>
          <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-lg -mt-10 mb-5">Happy Wedding</h6>
            <div className='w-[240px] h-[240px] rounded-full flex items-center justify-center relative'>
              <img src={background[5]} className={`${posisiLingkaran}`} />
              <img src={dataCouple?.foto_mempelai_background ? dataCouple?.foto_mempelai_background : fotoDefault[0]} className='w-[70%] h-[70%] object-cover absolute rounded-full' />
            </div>
            <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="text-3xl font-medium mb-8 mt-2">{dataCouple?.nama_panggilan_pria} & {dataCouple?.nama_panggilan_wanita}</h4>
            <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="rubik-font text-center">Kepada Yth <br/> <span className='text-lg'>{decodedTamu}</span></h6>
          </div>
        </div>
        <div id='awal' className="flex item-center justify-center flex-col relative">
          <img src={background[0]} className="absolute top-0 left-0 object-cover z-10 w-full" alt=""/>
          <img src={background[2]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt=""/>
          <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
          <div style={{ color: warnaPrimary }} className={`py-[300px] text-center relative z-10 w-full h-full flex -top-28 justify-center flex-col`}>
            <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-lg">The Wedding Of</h6>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="w-[90%] mx-auto h-[300px] rounded-xl overflow-hidden mt-5 border shadow-xl">
              <img src={dataCouple?.foto_mempelai_background ? dataCouple?.foto_mempelai_background : fotoDefault[0]} className="w-full h-full object-cover object-top"/>
            </div>
            <h4 className="text-2xl font-medium flex justify-center gap-x-3 flex-col my-10 px-2">
              <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className='leading-[45px]'>{dataCouple?.nama_panggilan_pria}</span>
              <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className='my-3'>&</span>
              <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className='leading-[45px]'> {dataCouple?.nama_panggilan_wanita}</span>
            </h4>
            {dataCouple?.tanggal_akad && 
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000" className='rubik-font'>{formatDate(dataCouple?.tanggal_akad)}</h6>
            }
          </div>
          <CountdownTimer targetDate={`${dataCouple?.tanggal_akad}T23:59:59`} warnaPrimary={warnaPrimary}/>
        </div>
        <div style={{ backgroundColor: warnaPrimary }} className={`text-center py-10 text-white px-5`}>
          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-2xl font-medium">وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةًۗ اِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ</p>
          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className="text-[14px] rubik-font my-3">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
          <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="text-[14px] rubik-font">( Q.S. Ar-Rum:21 )</p>
        </div>
        <div id='mempelai' className="flex item-center justify-center relative">
          <img src={background[0]} className="absolute top-0 left-0 object-cover z-10 w-full" alt=""/>
          <img src={background[3]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt=""/>
          <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
          <div style={{ color: warnaPrimary }} className={`py-[350px] text-center relative z-10 w-full h-full flex -top-24 justify-center flex-col`}>
            <div className="mb-24 text-[14px] px-5">
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-3xl font-medium mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيْمِ</h6>
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="font-medium rubik-font mt-5 mb-3">Assalamualaikum Warahmatullahi Wabarakatuh</h6>
              <h6 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="font-medium rubik-font">Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, dengan ini kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami:</h6>
            </div>
            <div className="mempelai-wanita">
              <div className="relative w-[300px] h-[300px] mx-auto">
                <img data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" src="{{asset('storage/assets/brezze/corak.png')}}" className="absolute -z-10 -top-10 left-0 object-cover w-[300px]" alt=""/>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[250px] h-[250px] overflow-hidden rounded-2xl mx-auto bg-white shadow-xl border relative">
                  <img src={bingkai} className='w-full' />
                  <img className="absolute top-[12.2px] left-[12.9px] w-[90%] h-[90%] rounded-lg" src={dataCouple?.foto_mempelai_wanita ? dataCouple?.foto_mempelai_wanita : fotoDefault[2]} />
                </div>
              </div>
              <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="text-3xl font-medium flex flex-col leading-[55px]">{dataCouple?.nama_lengkap_wanita}</h4>
              <div className="rubik-font mt-10">
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">Putri Dari:</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">Bapak {dataCouple?.nama_ayah_mempelai_wanita} & Ibu {dataCouple?.nama_ibu_mempelai_wanita}</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" className='mt-4'>Alamat:</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">{dataCouple?.alamat_wanita}</p>
              </div>
            </div>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="my-36 text-4xl">&</p>
            <div className="mempelai-pria">
              <div className="relative w-[300px] h-[300px] mx-auto">
                <img data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" src="{{asset('storage/assets/brezze/corak.png')}}" className="absolute -z-10 -top-10 left-0 object-cover w-[300px]" alt=""/>
                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[250px] h-[250px] overflow-hidden rounded-2xl mx-auto bg-white shadow-xl border relative">
                  <img src={bingkai} className='w-full' />
                  <img className="absolute top-[12.2px] left-[12.9px] w-[90%] h-[90%] rounded-lg" src={dataCouple?.foto_mempelai_pria ? dataCouple?.foto_mempelai_pria : fotoDefault[1]} />
                </div>
              </div>
              <h4 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-3xl font-medium flex flex-col leading-[55px]">{dataCouple?.nama_lengkap_pria}</h4>
              <div className="rubik-font mt-10">
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Putra Dari:</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">Bapak {dataCouple?.nama_ayah_mempelai_pria} & Ibu {dataCouple?.nama_ibu_mempelai_pria}</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" className='mt-4'>Alamat:</p>
                <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">{dataCouple?.alamat_pria}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{color: warnaPrimary }} id='akad' className={`flex item-center justify-center relative py-10`}>
          <img src={background[1]} className="absolute top-0 left-0 object-cover z-10 w-full" alt=""/>
          <img src={background[2]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt=""/>
          <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
          <div className="pt-[250px] pb-[200px] text-center relative z-10 w-full h-full flex -top-24 justify-center flex-col">
            <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-2xl mb-24">Save The Date</h5>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="tanggal-akad mb-16">
              <div className="relative w-[300px] h-[300px] mx-auto rounded-xl overflow-hidden border-b">
                <img src={bingkai} className="absolute top-0 left-0 w-full h-full object-cover"/>
                <div className={`w-full h-full relative z-10 mb-10 rubik-font`}>
                  <h6 className="mt-12 mb-5 text-xl">Akad Nikah</h6>
                  <div>
                    {dataCouple?.tanggal_akad && 
                      <h6 className='text-lg'>{formatDate(dataCouple?.tanggal_akad)}</h6>
                    }
                    <h6 className="font-medium">{dataCouple?.jam_akad}</h6>
                    <SiGooglemaps size={24} className="mt-5 mb-2 mx-auto"/>
                    <h6>Bertempat di</h6>
                    <h6 className="font-thin text-sm">{dataCouple?.tempat_akad}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="tanggal-akad">
              <div className="relative w-[300px] h-[300px] mx-auto rounded-xl overflow-hidden border-b">
                <img src={bingkai} className="absolute top-0 left-0 w-full h-full object-cover" />
                <div className={`w-full h-full relative z-10 mb-10 rubik-font`}>
                  <h6 className="mt-12 mb-5 text-xl">
                   {dataCouple?.tipe_acara === "Resepsi" ? "Resepsi" : "Tasyakuran"}
                  </h6>
                  <div>
                    {dataCouple?.tanggal_resepsi_opsional === null ? 
                    <h6 className='text-lg'>{formatDate(dataCouple?.tanggal_resepsi)}</h6> : 
                    <h6 className='text-lg'>{dataCouple?.tanggal_resepsi_opsional}</h6>}

                    {/* {dataCouple?.tanggal_resepsi && 
                      <h6 className='text-lg'>{formatDate(dataCouple?.tanggal_resepsi)}</h6>
                    } */}
                    <h6 className="font-medium">{dataCouple?.jam_resepsi}</h6>
                    <SiGooglemaps size={24} className="mt-5 mb-2 mx-auto"/>
                    {/* <img src="{{ asset('storage/icon/map.png') }}" className="mt-5 mb-2 w-[25px] mx-auto" /> */}
                    <h6>Bertempat di</h6>
                    <h6 className="font-thin text-sm inline-block px-2">{dataCouple?.tempat_resepsi}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ color: warnaPrimary }} id='maps' className="flex flex-col items-center justify-center relative py-[300px] rubik-font">
          <img src={background[0]} className="absolute top-0 left-0 object-cover z-10 w-full"/>
          <img src={background[3]} className="absolute bottom-0 right-0 object-cover z-10 w-full"/>
          <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover"/>

          <div className="relative">
            <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className={`text-center text-2xl mb-10`}>Maps</h5>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[300px] h-[300px] mx-auto sm:w-[350px] sm:h-[350px] bg-[${warnaPrimary}] shadow-xl border rounded-2xl overflow-hidden">
              <iframe src={dataCouple?.link_map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                >
              </iframe>
            </div>
          </div>
          <div id='gift' className={`relative mt-[150px] text-center`}>
            <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-2xl mb-10">Wedding Gift</h5>
            <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[330px] sm:w-[350px] overflow-hidden font-medium pt-5 pb-6">
              <img className="w-[150px] mx-auto mb-3" src={logoBank[dataCouple?.nama_bank]}/>
              <p>No. Rekening : <span id="nomor-rekening">{dataCouple?.nomor_rekening}</span></p>
              <p>An. {dataCouple?.nama_rekening}</p>
              <button style={{ backgroundColor: warnaPrimary }} onClick={() => handleCopyClick(dataCouple?.nomor_rekening)} className="cursor-pointer text-white rounded-full text-sm px-4 py-1 mt-4">Salin</button>
            </div>
            {dataCouple?.nomor_rekening_2 && 
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="w-[330px] sm:w-[350px] overflow-hidden font-medium pt-5 pb-6">
                <img className="w-[150px] mx-auto mb-3" src={logoBank[dataCouple?.nama_bank_2]}/>
                <p>No. Rekening : <span id="nomor-rekening">{dataCouple?.nomor_rekening_2}</span></p>
                <p>An. {dataCouple?.nama_rekening_2}</p>
                <button style={{ backgroundColor: warnaPrimary }} onClick={() => handleCopyClick(dataCouple?.nomor_rekening_2)} className="cursor-pointer text-white rounded-full text-sm px-4 py-1 mt-4">Salin</button>
              </div>

            }
          </div>
        </div>
        {dataCouple?.love_story && 
          <div style={{ backgroundColor: warnaPrimary }} id='love-story' className={`flex item-center justify-center relative text-white`}>
            <div className="pt-[100px] px-4 pb-[50px] relative z-10 w-full h-full flex justify-center flex-col">
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="glassmorphism w-full mb-16 text-sm font-semibold rounded-lg p-5">
                <div>
                  <p className='text-center text-xl font-medium mb-10'>Love Story</p>
                  <div className='mb-8' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className='w-full h-[250px] rounded-lg bg-white mb-2 overflow-hidden'>
                      <img src={galery[0]} className='w-full' />
                    </div>
                    <p className='rubik-font font-thin'>{loveStory[0]}</p>
                  </div>
                  <div className='mb-8' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className='w-full h-[250px] rounded-lg bg-white mb-2 overflow-hidden'>
                      <img src={galery[1]} className='w-full' />
                    </div>
                    <p className='rubik-font font-thin'>{loveStory[1]}</p>
                  </div>
                  <div className='mb-8' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    <div className='w-full h-[250px] rounded-lg bg-white mb-2 overflow-hidden'>
                      <img src={galery[2]} className='w-full' />
                    </div>
                    <p className='rubik-font font-thin'>{loveStory[2]}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        }
        {dataCouple?.galery && 
          <div id='galery' className="flex item-center justify-center relative">
            <img src={background[0]} className="absolute top-0 left-0 object-cover z-10 w-full" alt=""/>
            <img src={background[3]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt=""/>
            <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
            <div style={{ color: warnaPrimary }} className="py-[350px] px-3 text-center relative z-10 w-full h-full flex -top-24 justify-center flex-col">
              <p data-aos="fade-up" className='text-[30px] mb-16'>Galery</p>
              <div className="grid grid-cols-2 gap-2">
                {galery.map((item, index) => (
                  <div key={index} className={`${index % 3 == 0 ? 'col-span-2 h-[250px]' : ''} relative overflow-hidden w-full h-[200px] rounded-lg`}  data-aos="fade-up">
                    <img src={item} className='w-full h-full object-cover' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        } 
        <div style={{ backgroundColor: warnaPrimary }} id='reservasi' className={`flex item-center justify-center relative text-white`}>
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
                  <div onClick={()=>setKonfirmasiHadir('Hadir 1 orang')} className='flex items-center gap-x-3 cursor-pointer my-2'>
                    <div className={`${konfirmasiHadir == 'Hadir 1 orang'? 'bg-blue-900' : 'bg-slate-200'} w-3 h-3 rounded-full`}></div>
                    <p>Hadir 1 orang</p>
                  </div>
                  <div onClick={()=>setKonfirmasiHadir('Hadir 2 orang')} className='flex items-center gap-x-3 cursor-pointer'>
                    <div className={`${konfirmasiHadir == 'Hadir 2 orang'? 'bg-blue-900' : 'bg-slate-200'} w-3 h-3 rounded-full`}></div>
                    <p>Hadir 2 orang</p>
                  </div>
                </div>
                <div className='mt-5'>
                  {/* <p>Reservasi ke :</p> */}
                  <button onClick={()=>reservasi(dataCouple?.nomor_whatsapp_wanita)} className='w-full p-3 rounded-full glassmorphism-button text-white'>Kirim</button>
                  {/* <div className='flex items-center gap-x-2 w-full mt-2 text-[12px] sm:text-sm'>
                    <button onClick={()=>reservasi(dataCouple?.nomor_whatsapp_pria)} className='w-full p-3 rounded-full glassmorphism-button text-white'>Mempelai Pria</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id='footer' className="flex item-center justify-center relative">
          <img src={background[1]} className="absolute top-0 left-0 object-cover z-10 w-full" alt=""/>
          <img src={background[2]} className="absolute bottom-0 right-0 object-cover z-10 w-full" alt=""/>
          <img src={background[4]} className="absolute top-0 left-0 w-full h-full object-cover" alt=""/>
          <div style={{ color: warnaPrimary }} className={`py-[350px] rubik-font px-2 text-center relative z-10 w-full h-full flex -top-24 justify-center flex-col`}>
            <div className={`relative mt-[150px] text-center`}>
              <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-lg mb-5">Kami yang berbahagia</h5>
              <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="inline-flex flex-col">
                <span>{dataCouple?.nama_panggilan_pria}</span>
                &
                <span>{dataCouple?.nama_panggilan_wanita}</span>
              </p>
            </div>
            <div className={`relative mt-[150px] text-center`}>
              <h5 data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" className="text-lg mb-10 font-thin">Made With ❤ By Youvitation</h5>
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" className='flex items-center justify-center gap-x-5'>
                <a href="https://instagram.com/youvitation">
                  <img src={instagram} className='w-[30px] mx-auto mb-2' />
                  <p className='font-medium text-sm '>Instagram</p>
                </a>
                <a href="https://shopee.co.id/youvitation">
                  <img src={shopee} className='w-[35px] mx-auto mb-1' />
                  {/* <SiShopee size={30} className='mx-auto mb-2'/> */}
                  <p className='font-medium text-sm '>Shopee</p>
                </a>
                <a href="https://youvitation.com">
                  <BiGlobe size={30} className='mx-auto mb-2'/>
                  <p className='font-medium text-sm '>Website</p>
                </a>
              </div>
            </div>
          </div>
        </div>

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
              <a style={{ backgroundColor: warnaPrimary }} href="#home" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><FaHome size={18}/></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#mempelai" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><FaHeart size={18}/></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#akad" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><MdOutlineDateRange size={18}/></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#maps" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><SiGooglemaps size={18}/></a>
              <a style={{ backgroundColor: warnaPrimary }} href="#gift" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><FaGift size={18}/></a>
              {dataCouple?.love_story && 
                <a style={{ backgroundColor: warnaPrimary }} href="#love-story" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><GiLovers size={18}/></a>
              }
              {dataCouple?.galery && 
                <a style={{ backgroundColor: warnaPrimary }} href="#galery" className={`p-2 flex items-center justify-center shadow-sm rounded-full`}><AiFillPicture size={18}/></a>
              }
              <div onClick={handleMusic} className="absolute cursor-pointer right-0 -top-12 border w-[40px] h-[40px] glassmorphism-button text-white p-1 rounded-full flex items-center justify-center">
                <div style={{ backgroundColor: warnaPrimary }} className={`p-1 rounded-full w-full h-full flex items-center justify-center`}>
                  {!musicOn ? <TbMusic size={18}/>: <TbMusicOff size={18}/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout