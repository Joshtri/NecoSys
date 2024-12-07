import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    id: '',
    nama: '',
    email: '',
    noTelepon: '',
    alamat: '',
    role: '', // Tambahkan field role
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token tidak ditemukan. Silakan login terlebih dahulu.');
      window.location.href = '/'; // Arahkan ke login jika token tidak ditemukan
      return;
    }

    console.log('Diperoleh token:', token);

    fetchUserProfile(token);
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pengguna/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response Data:', response.data); // Debugging

      // Validasi data berdasarkan role
      if (response.data && response.data.role) {
        const { role, id, nama, email, noTelepon, alamat, namaBankSampah } = response.data;

        if (role === 'pengepul') {
          // Set profil untuk pengepul
          setUserProfile({
            id,
            nama,
            email,
            noTelepon: noTelepon || '',
            alamat: alamat || '',
            namaBankSampah: namaBankSampah || '',
            role,
          });
        } else if (role === 'admin' || role === 'staf') {
          // Set profil untuk pengguna (admin/staf)
          setUserProfile({
            id,
            nama,
            email,
            noTelepon: '', // Tidak ada data noTelepon untuk pengguna
            alamat: '', // Tidak ada data alamat untuk pengguna
            role,
          });
        } else {
          console.error('Role tidak valid:', role);
        }
      } else {
        console.error('Data profil tidak valid:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Token session expired. Mengarahkan kembali ke login.');
        localStorage.removeItem('token'); // Hapus token dari localStorage
        window.location.href = '/'; // Arahkan ke login
      } else {
        console.error('Terjadi kesalahan saat mengambil data profil:', error);
      }
    }
  };

  return userProfile;
};

export default useUserProfile;
