import React, { useEffect, useState } from 'react'
import { FaHeart, FaHome, FaTrashAlt, FaWhatsapp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getCouple, updateGuest } from '../api/coupleApi';
const DOMAIN_URL = import.meta.env.VITE_URL;


const TamuUndangan = () => {
  const navigate = useNavigate();
  const {slug} = useParams();
  const [template, setTemplate] = useState('');
  const [namaMempelai, setNamaMempelai] = useState('');
  const [tambahTamu, setTambahTamu] = useState("");
  const [namaTamu, setNamaTamu] = useState([]);
  const [menu, setMenu] = useState('tambahTamu');
  const defaultPesan = `Assalamu’alaikum warahmatullahi wabarakatuh\n\nKepada Yth: *[Nama Tamu]*\n\nDengan penuh syukur kepada Allah SWT, kami mengundang Anda untuk menghadiri acara kami.\n\nSilhakan melihat detail undangan melalui tautan berikut:\n[Link Undangan Digital]\n\nMerupakan kebahagiaan bagi kami jika Saudara/i *[Nama Tamu]* berkenan hadir dan memberikan doa restu. Mohon konfirmasi kehadiran dengan mengklik *Konfirmasi Kehadiran* di undangan atau membalas pesan ini.\n\nBarakallahu fiikum, semoga Allah SWT senantiasa memberkahi langkah kita.\n\nWassalamu’alaikum warahmatullahi wabarakatuh.\n\n *[Nama Pengundang]*`
  const [pesan, setPesan] = useState(``);

  useEffect(()=>{
    const getData = async () => {
      try {
        const data = await getCouple(slug); // Ambil data dari API
        if (data.couple) {
          setTemplate(data.couple.template)
          setNamaTamu(data.couple.tamu);
          setTambahTamu(data.couple.tamu.join(", ")) 
          setNamaMempelai(`${data.couple.nama_panggilan_pria} & ${data.couple.nama_panggilan_wanita}`);
          if(data.couple.pesan_chat) {
            setPesan(data.couple.pesan_chat) 
          } else {
            setPesan(defaultPesan)
          }
        } else {
          navigate('/404'); // Redirect ke halaman 404 jika data tidak ditemukan
        }
      } catch (err) {
        navigate('/404'); // Redirect ke halaman 404 jika terjadi error
      }
    }
    getData();
  }, [menu]);


  const handleChangeTamu = (e) => {
    setTambahTamu(e.target.value)
  }

  const handleTambahTamu = async (e) => {
    e.preventDefault()
    const response = await updateGuest(slug, {tamu: tambahTamu, pesan_chat: pesan});
    setMenu('daftarTamu');
  }

  const send = (nama) => {
    const undanganLink = `${DOMAIN_URL}/${template}/${slug}/${encodeURIComponent(nama)}`;
    console.log(undanganLink)
    const message = pesan
      .replace(/\[Nama Tamu\]/g, nama)
      .replace(/\[Link Undangan Digital\]/g, undanganLink)
      .replace(/\[Nama Pengundang\]/g, namaMempelai); 
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="overflow-hidden min-h-screen rubik-font bg-slate-200 text-slate-600">
      <div className="max-w-md min-h-screen bg-slate-50 mx-auto relative overflow-x-hidden pt-10 pb-24">
        {menu === 'tambahTamu' && <>
          <h5 className='text-xl font-medium text-orange-500 text-center'>Tambahkan tamu undangan</h5>
          <div className="mb-4 flex flex-col px-3 mt-8">
            <label className="mb-2">Nama tamu ( pisahkan dengan tanda koma )</label>
            <textarea name="tamu" onChange={handleChangeTamu} value={tambahTamu} className='p-2 border rounded-lg outline-none min-h-[150px]' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} placeholder='Adelio, Elaina Clarissa, Robert'></textarea>
            <label className="mb-2 mt-5">Pesan untuk tamu (Bisa di ubah)</label>
            <textarea
              className="p-2 border rounded-lg outline-none w-full min-h-[200px]"
              name='pesan_chat'
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            />
          </div>
          <p className='px-3 text-[14px] mb-5 border border-orange rounded-lg mx-3 py-1 border-orange-300 text-orange-500 bg-orange-50'>Mohon untuk tidak mengubah text dengan format <span>*[...]* atau [...]</span></p>
          <div className='flex items-center justify-end px-3'>
            <button onClick={handleTambahTamu} className='bg-orange-500 text-white font-medium ms-3 rounded-xl px-5 py-2'>Simpan</button>
          </div>
        </>}

        {menu === 'daftarTamu' && 
          <>
            <h5 className="text-center text-lg text-orange-500 font-medium">Daftar Tamu</h5>
            <div className="p-5">
              {namaTamu.map((item, index) => (
                <div key={index} className="text-slate-600 flex justify-between items-center p-3 glassmorphism rounded-xl border w-full h-[50px] mb-3">
                  <p>{item}</p>
                  <button className="bg-green-500 text-white rounded-full p-1.5"><FaWhatsapp onClick={()=>send(item)} size={20}/></button>
                </div>
              ))}
            </div>
          </>
        }

        {/* bottom bar */}
        <div className="fixed bottom-2 left-0 right-0 z-10">
          <div className="max-w-md px-2 mx-auto text-white text-[13px]">
            <div className='glassmorphism rounded-xl border w-full h-[50px] flex items-center px-3 justify-evenly'>
              <h4 onClick={() => setMenu('tambahTamu')}  className='cursor-pointer p-2 flex items-center justify-center shadow-sm bg-orange-500 rounded-full'><FaHome size={18}/></h4>
              <h4 onClick={() => setMenu('daftarTamu')}  className='cursor-pointer p-2 flex items-center justify-center shadow-sm bg-orange-500 rounded-full'><FaHeart size={18}/></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TamuUndangan