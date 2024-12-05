import React from 'react';
import useUserProfile from '../../hooks/useUserProfile';  // Import custom hook

function Dashboard() {
  const userProfile = useUserProfile();  // Use custom hook to get user profile

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Tampilkan data profil */}
      <div className="profile-section">
        <h2>Profil Pengguna</h2>
        <p><strong>Nama:</strong> {userProfile.nama}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        {userProfile.role === 'pengepul' && (
          <>
            <p><strong>No Telepon:</strong> {userProfile.noTelepon || '-'}</p>
            <p><strong>Alamat:</strong> {userProfile.alamat || '-'}</p>
            <p><strong>Nama Bank Sampah:</strong> {userProfile.namaBankSampah || '-'}</p>
          </>
        )}
        {userProfile.role !== 'pengepul' && (
          <p><strong>Role:</strong> {userProfile.role}</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
