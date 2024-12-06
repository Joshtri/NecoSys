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
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/' element={<Login/>}/>

          {/* <Route path="/admin/pengguna" element={<PenggunaPage />} />
          <Route path="/admin/anggota" element={<AnggotaPage />} /> */}

           {
            // ini bisa diakses utk pengepul dan admin, jadi endpoint awalan admin dihilangkna.
           }

                   {/* Rute yang hanya dapat diakses oleh admin */}
        <Route
          path="/admin/pengguna"
          element={<ProtectedRoute element={PenggunaPage} allowedRoles={['admin']} />}
        />
        <Route
          path="/admin/anggota"
          element={<ProtectedRoute element={AnggotaPage} allowedRoles={['admin']} />}
        />
        <Route
          path="/admin/pengepul"
          element={<ProtectedRoute element={PengepulPage} allowedRoles={['admin']} />}
        />
        <Route
          path="/admin/pengepul/:id"
          element={<ProtectedRoute element={ViewPengepulPage} allowedRoles={['admin']} />}
        />

        {/* Rute yang dapat diakses oleh admin dan pengepul */}
        <Route
          path="/kategori-sampah"
          element={<ProtectedRoute element={KategoriSampahPage} allowedRoles={['admin', 'pengepul']} />}
        />
        <Route
          path="/item-sampah"
          element={<ProtectedRoute element={ItemSampahPage} allowedRoles={['admin', 'pengepul']} />}
        />
        <Route
          path="/transaksi"
          element={<ProtectedRoute element={TransaksiPage} allowedRoles={['admin', 'pengepul']} />}
        />
        <Route
          path="/transaksi/add"
          element={<ProtectedRoute element={AddTransaksiPage} allowedRoles={['admin', 'pengepul']} />}
        />
        <Route
          path="/transaksi/view/:id"
          element={<ProtectedRoute element={ViewTransaksiPage} allowedRoles={['admin', 'pengepul']} />}
        />


          {/* <Route path="/admin/kategori-sampah" element={<KategoriSampahPage />} />
          <Route path="/admin/item-sampah" element={<ItemSampahPage />} />
          <Route path="/admin/transaksi" element={<TransaksiPage />} />


          <Route path="/transaksi/add" element={<AddTransaksiPage />} />
          <Route path="/transaksi/view/:id" element={<ViewTransaksiPage />} />

          <Route path='/admin/pengepul' element={<PengepulPage/>}/>
          <Route path="/admin/pengepul/:id" element={<ViewPengepulPage />} /> */}

          {/* Rute wildcard untuk halaman 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
