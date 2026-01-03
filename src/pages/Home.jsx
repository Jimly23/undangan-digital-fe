import React, { useState } from 'react'
import instagram from '../assets/landing/instagram.svg';
import shopee from '../assets/landing/shopee.png';
import homeIcon from "../assets/landing/home.svg";
import themeIcon from "../assets/landing/theme.svg";
import faqIcon from "../assets/landing/faq.svg";
import cartIcon from "../assets/landing/cart.svg";
import whatsappIcon from "../assets/landing/whatsapp.png";

import brezze from "../assets/landing/Brezze.png"; 
import mocha from "../assets/landing/Mocha.png"; 
import purpleHaze from "../assets/landing/Purple.png"; 
import rose from "../assets/landing/Rose.png"; 
import royalBlue from "../assets/landing/Royal-blue.png"; 
import royalGold from "../assets/landing/Royal-gold.png"; 
import rustic from "../assets/landing/Rustic.png"; 
import SkyPetals from "../assets/landing/Sky.png"; 
import Sweet from "../assets/landing/Sweet.png"; 

import mockup1 from "../assets/landing/mockup1.png"; 
import mockup2 from "../assets/landing/mockup2.png"; 
import mockup3 from "../assets/landing/mockup3.png";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [openFaq, setOpenFaq] = useState('');
  const [openOrder, setOpenOrder] = useState(false);

  const theme = [
    {
      name: "Mocha",
      image: mocha,
      foto: '/mocha/adelio-elina/Nama Tamu',
      tanpaFoto: '/mocha/adelio-elaina/Nama Tamu'
    },
    {
      name: "Royal Blue",
      image: royalBlue,
      foto: '/royal-blue/adelio-elina/Nama Tamu',
      tanpaFoto: '/royal-blue/adelio-elaina/Nama Tamu'
    },
    {
      name: "Royal Gold",
      image: royalGold,
      foto: '/royal-gold/adelio-elina/Nama Tamu',
      tanpaFoto: '/royal-gold/adelio-elaina/Nama Tamu'
    },
    {
      name: "Rustic Brown",
      image: rustic,
      foto: '/rustic-brown/adelio-elina/Nama Tamu',
      tanpaFoto: '/rustic-brown/adelio-elaina/Nama Tamu'
    },
    {
      name: "Sweet Blush",
      image: Sweet,
      foto: '/sweet-blush/adelio-elina/Nama Tamu',
      tanpaFoto: '/sweet-blush/adelio-elaina/Nama Tamu'
    },
    {
      name: "Brezze",
      image: brezze,
      foto: '/brezze/adelio-elina/Nama Tamu',
      tanpaFoto: '/brezze/adelio-elaina/Nama Tamu'
    },
    {
      name: "Purple Haze",
      image: purpleHaze,
      foto: '/purple-haze/adelio-elina/Nama Tamu',
      tanpaFoto: '/purple-haze/adelio-elaina/Nama Tamu'
    },
    {
      name: "Rose",
      image: rose,
      foto: '/rose/adelio-elina/Nama Tamu',
      tanpaFoto: '/rose/adelio-elaina/Nama Tamu'
    },
    {
      name: "Sky Petals",
      image: SkyPetals,
      foto: '/sky-petals/adelio-elina/Nama Tamu',
      tanpaFoto: '/sky-petals/adelio-elaina/Nama Tamu'
    }
  ]

  const faqs = [
    { question: 'Bagaimana cara melakukan order undangannya?', answer: 'Mudah banget, kok! 🎉 Kamu bisa langsung chat kami via WhatsApp / Shopee, kemudian kami akan memandu proses pemesanannya. Setelah itu, kami akan mengirimkan form khusus untuk tema yang akan kamu pilih dan detail pernikahan kamu.' },
    { question: 'Berapa lama waktu pengerjaannya?', answer: 'Kami memproses pemesanannya dalam waktu 1x24 jam atau kurang.' },
    { question: 'Bagaimana cara pembayarannya?', answer: `
      1. Setelah kamu memilih tema dan mengisi form detail pernikahan, kamu bisa langsung memilih metode pembayaran melalui e-wallet (Dana atau OVO) yang sudah tertera di form. 2. Lakukan pembayaran kemudian kirim buktinya via WhatsApp / Chat Shopee. 
    3. Setelah pembayaran dikonfirmasi, kami proses dan kirim undangan digitalnya! 🎉` },
    { question: 'Apakah bisa menambahkan foto dan request musik?', answer: 'Tentu saja bisa! 🎉 kamu bisa request untuk menambahkan musik yang kamu inginkan.' },
  ];

  const handleOpenOrder = () => {
    setOpenOrder(!openOrder);
  }

  const handleOrder = (via) => {
    if (via === 'whatsapp') {
      const phoneNumber = 6282329322353
      const message = `Halo kak saya mau pesan undangan digitalnya`; 
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, '_blank');
    }
  }

  return (
    <>
      <Helmet>
        <title>Youvitation | Undangan Digital</title>
        <meta name="description" content="Buat undangan pernikahan digital yang elegan, praktis, dan kekinian di Youvitation. Sebarkan undangan tanpa batas!" />
        <meta name="keywords" content="undangan digital, undangan pernikahan digital, undangan online, kartu undangan pernikahan" />
      </Helmet>
      <div className="max-w-md mx-auto relative overflow-x-hidden min-h-screen bg-slate-50 text-slate-600 rubik-font">
        <div id="home" className="py-10">
          <div className="tagline text-center px-8">
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100" className="text-2xl text-orange-500 font-bold">Youvitation.</p>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" className="text-2xl font-bold">Wedding Invitation</p>
            <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className="mt-5 text-sm">Bikin undangan lebih hemat, praktis, dan kekinian. Sebarkan undanganmu tanpa batas ke semua tamu dan bikin acaramu makin berkesan.</p>
          </div>
          <div className="flex items-center justify-center mt-5 px-5 relative">
            <img data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" src={mockup2} className="-me-2 w-[30%] relative"/>
            <img data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" src={mockup1} className="w-[40%] relative z-10"/>
            <img data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600" src={mockup3} className="-ms-2 w-[30%] relative"/>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={handleOpenOrder} className="mx-auto px-4 py-2 rounded-full text-white bg-orange-500 mt-24 font-medium text-sm">Pesan Sekarang</button>
          </div>
        </div>
        <div id="tema" className="py-10 pb-24 p-3">
          <h4 className="text-center text-xl mb-4 text-slate-600">Tema</h4>
          <div className="grid grid-cols-2 gap-3 text-[12px] text-center">
            {theme.map((item, index) => (
              <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" key={index} className="w-full rounded-lg overflow-hidden bg-white p-1">
                <img src={item.image} alt='Tema undangan pernikahan digital' className="w-full rounded-lg"/>
                <div className="p-2">
                  <p>Rp 70.000 (Foto)</p>
                  <p>Rp 50.000 (Tanpa Foto)</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] mt-2">
                    <Link to={item.foto} onClick={(e) => {
                      e.preventDefault();
                      window.open(item.tanpaFoto, "_blank");
                    }}>
                      <button className="w-full py-1 bg-orange-500 text-white rounded-full">Foto</button>
                    </Link>
                    <Link to={item.tanpaFoto} onClick={(e) => {
                      e.preventDefault();
                      window.open(item.tanpaFoto, "_blank");
                    }}>
                      <button className="w-full py-1 bg-orange-500 text-white rounded-full">Tanpa Foto</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="faq" className="py-10 bg-slate-600 text-white">
          <h4 className="text-center text-xl mb-4">FAQ</h4>
          <div className="p-3">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item mb-5">
                <button onClick={() => setOpenFaq(openFaq == faq.question ? '' : faq.question)} className="faq-toggle flex justify-between items-center w-full text-left">
                  <span>{faq.question}</span>
                  <svg className="w-6 h-6 transition-transform transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {openFaq == faq.question && <div className="font-thin text-sm">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="py-10 pb-24 text-slate-600">
          <h4 className="text-center text-xl mb-4">Social Media</h4>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800" className='flex items-center justify-center gap-x-5'>
            <a href="https://instagram.com/youvitation">
              <img src={instagram} alt='Tema undangan pernikahan digital' className='w-[30px] mx-auto mb-2' />
              <p className='font-medium text-sm '>Instagram</p>
            </a>
            <a href="https://shopee.co.id/youvitation">
              <img src={shopee} alt='Tema undangan pernikahan digital' className='w-[35px] mx-auto mb-1' />
              {/* <SiShopee size={30} className='mx-auto mb-2'/> */}
              <p className='font-medium text-sm '>Shopee</p>
            </a>
          </div>
          <p className="text-[12px] text-center mt-16">Copyright © 2025 Youvitation</p>
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <div className="max-w-md mx-auto border-t bg-white pt-3 pb-2 flex items-center justify-around text-center text-slate-600 text-[13px]">
            <a href="#home">
              <img src={homeIcon}  className="w-[25px] mx-auto cursor-pointer" alt="" />
              <p>Home</p>
            </a>
            <a href="#tema">
              <img src={themeIcon} className="w-[25px] mx-auto cursor-pointer" alt="" />
              <p>Tema</p>
            </a>
            <a href="#faq">
              <img src={faqIcon} className="w-[25px] mx-auto cursor-pointer" alt="" />
              <p>FAQ</p>
            </a>
            <div>
              <img onClick={handleOpenOrder} src={cartIcon} className="w-[25px] mx-auto cursor-pointer" alt="" />
              <p>Order</p>
            </div>
          </div>
        </div>

        {/* Popup */}
        <div id="popup" className={` ${openOrder ? 'block' : 'hidden'} fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50`}>
          <div className="max-w-sm px-4 w-full">
            <div className="bg-white rounded-lg shadow-lg max-w-sm w-full">
              <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-lg font-bold">Order</h3>
                <button onClick={handleOpenOrder} className="text-gray-600 hover:text-gray-900 text-xl font-bold">&times;</button>
              </div>
              <div className="p-4 pb-6 text-center">
                <img src={shopee} className="w-[40px] mx-auto mb-3"/>
                <p className="text-gray-700">Order Via Shopee</p>
                <a href="https://shopee.co.id/youvitation" target='_blank' rel='noopener noreferrer'>
                  <button className="bg-orange-600 hover:bg-orange-500 text-white py-1 px-4 mt-4 rounded-full text-sm">Pesan Sekarang</button>
                </a>
              </div>
              <div className="p-4 pb-6 text-center">
                <img src={whatsappIcon} className="w-[40px] mx-auto mb-3"/>
                <p className="text-gray-700">Order Via Whatsapp</p>
                <button onClick={() => handleOrder('whatsapp')} className="bg-green-600 hover:bg-green-500 text-white py-1 px-4 mt-4 rounded-full text-sm">Chat Sekarang</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home