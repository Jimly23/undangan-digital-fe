import bg from "../assets/theme/royal-gold/bg.png"; 
import atas from "../assets/theme/royal-gold/atas.png"; 
import bawah from "../assets/theme/royal-gold/bawah.png"; 
import atasDua from "../assets/theme/royal-gold/atas-dua.png"; 
import bawahDua from "../assets/theme/royal-gold/bawah-dua.png";
import bingkai from "../assets/theme/royal-gold/bingkai.png";
import lingkaran from '../assets/theme/royal-gold/lingkaran.png';

import mempelai from "../assets/theme/default/mempelai.png";
import pria from "../assets/theme/default/pria.png";
import wanita from "../assets/theme/default/wanita.png";

import Layout from "../layout/Layout";
import { getCouple } from "../api/coupleApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const RoyalGold = () => {
  const navigate = useNavigate();
  const {slug, tamu} = useParams();
  const [dataCouple, setDataCouple] = useState();

  useEffect(()=>{
    const getData = async () => {
      try {
        const data = await getCouple(slug); // Ambil data dari API
        if (data.couple) {
          setDataCouple(data.couple);
        } else {
          navigate('/404'); // Redirect ke halaman 404 jika data tidak ditemukan
        }
      } catch (err) {
        navigate('/404'); // Redirect ke halaman 404 jika terjadi error
      }
    }
    getData();
  }, [])

  const background = [atasDua, atas, bawah, bawahDua, bg, lingkaran];
  const fotoDefault = [mempelai, pria, wanita];
  return (
    <Layout tamu={tamu} background={background} bingkai={bingkai} dataCouple={dataCouple} fotoDefault={fotoDefault} warnaPrimary='#b78641' posisiLingkaran={'w-[210px] -mt-12 ms-[35px]'}/>
  )
}

export default RoyalGold