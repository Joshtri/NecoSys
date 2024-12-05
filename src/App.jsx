import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import DashboardPage from './pages/DashboardPage'
import PenggunaPage from './pages/Pengguna/PenggunaPage'
import AnggotaPage from './pages/Anggota/AnggotaPage'
import ItemSampahPage from './pages/ItemSampah/ItemSampahPage'
import KategoriSampahPage from './pages/KategoriSampah/KategoriSampahPage'
import TransaksiPage from './pages/Transaksi/TransaksiPage'
import AddTransaksiPage from './pages/Transaksi/AddTransaksiPage'
import ViewTransaksiPage from './pages/Transaksi/ViewTransaksiPage'
import PengepulPage from './pages/Pengepul/PengepulPage'
import ViewPengepulPage from './pages/Pengepul/ViewPengepulPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/' element={<Login/>}/>

          <Route path="/admin/pengguna" element={<PenggunaPage />} />
          <Route path="/admin/anggota" element={<AnggotaPage />} />
          <Route path="/admin/kategori-sampah" element={<KategoriSampahPage />} />
          <Route path="/admin/item-sampah" element={<ItemSampahPage />} />
          <Route path="/admin/transaksi" element={<TransaksiPage />} />


          <Route path="/transaksi/add" element={<AddTransaksiPage />} />
          <Route path="/transaksi/view/:id" element={<ViewTransaksiPage />} />

          <Route path='/admin/pengepul' element={<PengepulPage/>}/>
          <Route path="/admin/pengepul/:id" element={<ViewPengepulPage />} />

          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
