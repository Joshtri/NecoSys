// import React from 'react';
import useUserProfile from '../hooks/useUserProfile';

function MyProfile() {
  const userProfile = useUserProfile();

  return (
    <div className="profile-container p-4">
      <h1 className="profile-title mb-4">Profil Saya</h1>

      {/* Data Profil */}
      <div className="profile-section">
        <p><strong>Nama:</strong> {userProfile.nama || '-'}</p>
        <p><strong>Email:</strong> {userProfile.email || '-'}</p>
        <p><strong>Nomor Telepon:</strong> {userProfile.noTelepon || '-'}</p>
        <p><strong>Alamat:</strong> {userProfile.alamat || '-'}</p>

        {/* Data khusus untuk pengepul */}
        {userProfile.role === 'pengepul' && (
          <>
            <p><strong>Nama Bank Sampah:</strong> {userProfile.namaBankSampah || '-'}</p>
            <p><strong>Deskripsi Bank Sampah:</strong> {userProfile.deskripsiBankSampah || '-'}</p>
          </>
        )}
      </div>

      {/* Tombol Edit */}
      <div className="edit-section mt-4">
        <button
          className="btn btn-primary"
          onClick={() => alert('Fitur edit belum tersedia.')}
        >
          Edit Profil
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
