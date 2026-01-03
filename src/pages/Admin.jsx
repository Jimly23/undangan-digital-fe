import React, { useEffect, useState } from "react";
import { uploadCouple } from "../api/uploadCoupleApi";
import {
  FaHeart, FaHome, FaTrashAlt, FaWhatsapp, FaInfoCircle,
  FaMale, FaFemale, FaCalendarAlt, FaMapMarkedAlt,
  FaMoneyBillWave, FaImages, FaStickyNote, FaChevronDown,
  FaChevronUp, FaCamera, FaMusic, FaSave
} from "react-icons/fa";
import { allCouple, deleteCouple } from "../api/coupleApi";
import { useNavigate } from "react-router-dom";

const DOMAIN_URL = import.meta.env.VITE_URL;

const Input = ({ label, name, type, onChange, multiple, placeholder, icon }) => {
  return (
    <div className="mb-4">
      <label className="text-sm text-slate-700 font-medium mb-1.5 block ml-1">{label}</label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#475a80] transition-colors">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-white/50 backdrop-blur-sm border border-slate-300 rounded-xl py-2.5 ${icon ? 'pl-10' : 'pl-4'} pr-4 text-slate-700 placeholder-slate-400 outline-none focus:border-[#475a80] focus:ring-1 focus:ring-[#475a80] transition-all duration-300`}
          multiple={multiple}
        />
      </div>
    </div>
  );
};

const FormSection = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className="mb-4 glassmorphism border border-white/40 overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white/30 hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-3 text-[#475a80]">
          {icon}
          <span className="font-semibold text-lg">{title}</span>
        </div>
        <div className={`text-[#475a80] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>

      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('buatUndangan');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataCouple, setDataCouple] = useState([]);

  // State to manage open sections
  const [openSections, setOpenSections] = useState({
    info: true,
    pria: false,
    wanita: false,
    akad: false,
    resepsi: false,
    maps: false,
    payment: false,
    media: false,
    other: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const pesan = `*Terima kasih telah mempercayakan undangan digital Anda kepada kami!*\n\nBerikut adalah link undangan digital Anda:\n\nLink untuk menambahkan daftar tamu:\n[Link Tambah Tamu]\n\nLink Undangan Preview:\n[Link Undangan Preview]\n\nSemoga undangan ini dapat menjadi bagian dari momen bahagia Anda. Jika ada yang perlu disesuaikan, kami dengan senang hati akan membantunya.\n\n*Youvitation*`;


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await allCouple();
        if (data.items) {
          setDataCouple(data.items);
        }
      } catch (err) {
        console.log(err);
        navigate('/404');
      }
    }
    if (menu === 'daftarUndangan') {
      getData();
    }
  }, [menu])

  const [formData, setFormData] = useState({
    template: "",
    slug: "",
    tipe: "",
    tipe_acara: "",
    // pria
    nama_lengkap_pria: "",
    nama_panggilan_pria: "",
    nama_ayah_mempelai_pria: "",
    nama_ibu_mempelai_pria: "",
    nomor_whatsapp_pria: "",
    alamat_pria: "",
    // wanita
    nama_lengkap_wanita: "",
    nama_panggilan_wanita: "",
    nama_ayah_mempelai_wanita: "",
    nama_ibu_mempelai_wanita: "",
    nomor_whatsapp_wanita: "",
    alamat_wanita: "",
    // tanggal akad
    tanggal_akad: "",
    tempat_akad: "",
    jam_akad: "",
    tanggal_resepsi: "",
    tempat_resepsi: "",
    jam_resepsi: "",
    // google map
    link_map: "",
    // rekening
    nomor_rekening: "",
    nama_bank: "",
    nama_rekening: "",
    nomor_rekening_2: "",
    nama_bank_2: "",
    nama_rekening_2: "",
    // foto
    foto_mempelai: null,
    foto_mempelai_pria: null,
    foto_mempelai_wanita: null,
    foto_mempelai_background: null,
    // love story
    love_story: "",
    // musik & galery
    musik: null,
    galery: [],
  });

  const handleChange = (e) => {
    const { name, type, files, multiple } = e.target; // Ambil 'multiple' dari e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? (multiple ? [...files] : files[0]) : e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Helper to append only if value exists
    Object.keys(formData).forEach(key => {
      if (key === 'galery') {
        formData.galery.forEach((file, index) => {
          data.append(`galery[${index}]`, file);
        });
      } else if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      setLoading(true)
      const response = await uploadCouple(data);
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000);
      setMenu('daftarUndangan');
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Gagal menyimpan data");
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Apakah anda yakin ingin menghapus undangan ini?")) return;
    try {
      const response = await deleteCouple(slug);
      alert('Undangan berhasil dihapus');
      // Refresh list
      const data = await allCouple();
      if (data.items) setDataCouple(data.items);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const send = (template, slug) => {
    const nama = "Nama Tamu"
    const linkTambahTamu = `${DOMAIN_URL}/tamu-undangan/${slug}`;
    const linkUndanganPreview = `${DOMAIN_URL}/${template}/${slug}/${encodeURIComponent(nama)}`;
    const message = pesan
      .replace(/\[Link Tambah Tamu\]/g, linkTambahTamu)
      .replace(/\[Link Undangan Preview\]/g, linkUndanganPreview)
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen rubik-font bg-slate-100 to-slate-200">
      <div className="max-w-md mx-auto relative min-h-screen bg-slate-50 shadow-2xl overflow-y-auto pb-24">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800">
            {menu === 'buatUndangan' ? 'Buat Undangan Baru' : 'Daftar Undangan'}
          </h1>
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            {menu === 'buatUndangan' ? <FaStickyNote /> : <FaHeart />}
          </div>
        </div>

        {loading &&
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#475a80]"></div>
              <span className="text-[#475a80] font-medium">Menyimpan...</span>
            </div>
          </div>
        }

        {success &&
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <span>Berhasil Disimpan!</span>
          </div>
        }

        <div className="p-4">
          {menu == 'buatUndangan' &&
            <form onSubmit={handleSubmit} className="space-y-4">

              <FormSection
                title="Informasi Dasar" icon={<FaInfoCircle size={18} />}
                isOpen={openSections.info} onToggle={() => toggleSection('info')}
              >
                <Input label="Template" name="template" type="text" onChange={handleChange} placeholder="cth: template1" />
                <Input label="Tipe Undangan" name="tipe" type="text" onChange={handleChange} placeholder="cth: Pernikahan" />
                <Input label="Tipe Acara" name="tipe_acara" type="text" onChange={handleChange} placeholder="cth: Resepsi" />
                <Input label="Slug (URL)" name="slug" type="text" onChange={handleChange} placeholder="cth: romeo-juliet" />
              </FormSection>

              <FormSection
                title="Mempelai Pria" icon={<FaMale size={18} />}
                isOpen={openSections.pria} onToggle={() => toggleSection('pria')}
              >
                <Input label="Nama Lengkap" name="nama_lengkap_pria" type="text" onChange={handleChange} />
                <Input label="Nama Panggilan" name="nama_panggilan_pria" type="text" onChange={handleChange} />
                <Input label="Nama Ayah" name="nama_ayah_mempelai_pria" type="text" onChange={handleChange} />
                <Input label="Nama Ibu" name="nama_ibu_mempelai_pria" type="text" onChange={handleChange} />
                <Input label="WhatsApp" name="nomor_whatsapp_pria" type="number" onChange={handleChange} icon={<FaWhatsapp />} />
                <Input label="Alamat" name="alamat_pria" type="text" onChange={handleChange} />
              </FormSection>

              <FormSection
                title="Mempelai Wanita" icon={<FaFemale size={18} />}
                isOpen={openSections.wanita} onToggle={() => toggleSection('wanita')}
              >
                <Input label="Nama Lengkap" name="nama_lengkap_wanita" type="text" onChange={handleChange} />
                <Input label="Nama Panggilan" name="nama_panggilan_wanita" type="text" onChange={handleChange} />
                <Input label="Nama Ayah" name="nama_ayah_mempelai_wanita" type="text" onChange={handleChange} />
                <Input label="Nama Ibu" name="nama_ibu_mempelai_wanita" type="text" onChange={handleChange} />
                <Input label="WhatsApp" name="nomor_whatsapp_wanita" type="number" onChange={handleChange} icon={<FaWhatsapp />} />
                <Input label="Alamat" name="alamat_wanita" type="text" onChange={handleChange} />
              </FormSection>

              <FormSection
                title="Acara Akad" icon={<FaCalendarAlt size={18} />}
                isOpen={openSections.akad} onToggle={() => toggleSection('akad')}
              >
                <Input label="Tanggal" name="tanggal_akad" type="date" onChange={handleChange} />
                <Input label="Tempat" name="tempat_akad" type="text" onChange={handleChange} />
                <Input label="Jam" name="jam_akad" type="time" onChange={handleChange} />
              </FormSection>

              <FormSection
                title="Acara Resepsi/Tasyakuran" icon={<FaCalendarAlt size={18} />}
                isOpen={openSections.resepsi} onToggle={() => toggleSection('resepsi')}
              >
                <Input label="Tanggal" name="tanggal_resepsi" type="date" onChange={handleChange} />
                <Input label="Tempat" name="tempat_resepsi" type="text" onChange={handleChange} />
                <Input label="Jam" name="jam_resepsi" type="time" onChange={handleChange} />
              </FormSection>

              <FormSection
                title="Lokasi (Maps)" icon={<FaMapMarkedAlt size={18} />}
                isOpen={openSections.maps} onToggle={() => toggleSection('maps')}
              >
                <Input label="Link Google Maps" name="link_map" type="text" onChange={handleChange} placeholder="https://goo.gl/maps/..." />
              </FormSection>

              <FormSection
                title="Rekening & Hadiah" icon={<FaMoneyBillWave size={18} />}
                isOpen={openSections.payment} onToggle={() => toggleSection('payment')}
              >
                <div className="bg-slate-100 p-3 rounded-lg mb-3">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Rekening 1</p>
                  <Input label="Nama Bank" name="nama_bank" type="text" onChange={handleChange} />
                  <Input label="Nomor Rekening" name="nomor_rekening" type="number" onChange={handleChange} />
                  <Input label="Atas Nama" name="nama_rekening" type="text" onChange={handleChange} />
                </div>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Rekening 2</p>
                  <Input label="Nama Bank" name="nama_bank_2" type="text" onChange={handleChange} />
                  <Input label="Nomor Rekening" name="nomor_rekening_2" type="number" onChange={handleChange} />
                  <Input label="Atas Nama" name="nama_rekening_2" type="text" onChange={handleChange} />
                </div>
              </FormSection>

              <FormSection
                title="Media (Foto & Musik)" icon={<FaImages size={18} />}
                isOpen={openSections.media} onToggle={() => toggleSection('media')}
              >
                <Input label="Foto Sampul (Utama)" name="foto_mempelai" type="file" onChange={handleChange} icon={<FaCamera />} />
                <Input label="Foto Pria" name="foto_mempelai_pria" type="file" onChange={handleChange} icon={<FaCamera />} />
                <Input label="Foto Wanita" name="foto_mempelai_wanita" type="file" onChange={handleChange} icon={<FaCamera />} />
                <Input label="Foto Background" name="foto_mempelai_background" type="file" onChange={handleChange} icon={<FaCamera />} />
                <Input label="Musik Latar" name="musik" type="file" onChange={handleChange} icon={<FaMusic />} />
                <Input label="Galeri Foto" name="galery" type="file" multiple onChange={handleChange} icon={<FaImages />} />
              </FormSection>

              <FormSection
                title="Cerita Cinta" icon={<FaStickyNote size={18} />}
                isOpen={openSections.other} onToggle={() => toggleSection('other')}
              >
                <div className="mb-4">
                  <label className="text-sm text-slate-700 font-medium mb-1.5 block ml-1">Kisah Cinta</label>
                  <textarea
                    name="love_story"
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-white/50 backdrop-blur-sm border border-slate-300 rounded-xl p-3 text-slate-700 placeholder-slate-400 outline-none focus:border-[#475a80] focus:ring-1 focus:ring-[#475a80] transition-all"
                    placeholder="Ceritakan kisah perjalanan cinta anda..."
                  ></textarea>
                </div>
              </FormSection>

              <button type="submit" className="w-full py-4 bg-[#475a80] hover:bg-[#344261] text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                <FaSave /> Simpan Undangan
              </button>
            </form>
          }

          {menu == 'daftarUndangan' &&
            <div className="space-y-3">
              {dataCouple.length === 0 ? (
                <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                  <FaInfoCircle size={40} className="mb-3 opacity-50" />
                  <p>Belum ada data undangan</p>
                </div>
              ) : (
                dataCouple.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-slate-700 text-lg">{item.slug}</h4>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">{item.tipe || 'Undangan'}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <button onClick={() => handleDelete(item.slug)} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <FaTrashAlt size={16} />
                      </button>
                      <button onClick={() => send(item.template, item.slug)} className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-all shadow-sm">
                        <FaWhatsapp size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          }
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-6 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-md mx-auto px-6 pointer-events-auto">
            <div className='bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 h-[60px] flex items-center justify-evenly p-1'>
              <button
                onClick={() => setMenu('buatUndangan')}
                className={`flex-1 flex flex-col items-center justify-center h-full rounded-xl transition-all duration-300 ${menu === 'buatUndangan' ? 'text-orange-500 bg-orange-50' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <FaHome size={22} className={menu === 'buatUndangan' ? 'drop-shadow-sm' : ''} />
                <span className="text-[10px] font-medium mt-1">Buat</span>
              </button>
              <div className="w-[1px] h-8 bg-slate-200"></div>
              <button
                onClick={() => setMenu('daftarUndangan')}
                className={`flex-1 flex flex-col items-center justify-center h-full rounded-xl transition-all duration-300 ${menu === 'daftarUndangan' ? 'text-pink-500 bg-pink-50' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <FaHeart size={22} className={menu === 'daftarUndangan' ? 'drop-shadow-sm' : ''} />
                <span className="text-[10px] font-medium mt-1">Daftar</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
