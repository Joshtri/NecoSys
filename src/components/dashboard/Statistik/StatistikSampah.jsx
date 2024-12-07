import React from 'react';
import { Bar } from 'react-chartjs-2'; // Grafik untuk visualisasi
import 'chart.js/auto'; // Auto-registrasi grafik

function StatistikSampah() {
  // Data dummy untuk grafik
  const data = {
    labels: ['Plastik', 'Kertas', 'Logam', 'Kaca', 'Organik'],
    datasets: [
      {
        label: 'Jumlah Sampah (kg)',
        data: [50, 30, 20, 10, 40], // Data sampah
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk grafik
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Memungkinkan pengaturan tinggi-lebar custom
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12, // Ukuran font legend lebih kecil
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Ukuran font label x-axis lebih kecil
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12, // Ukuran font label y-axis lebih kecil
          },
        },
      },
    },
  };

  return (
    <div className="chart-section mb-4">
      <h2>Statistik Sampah</h2>
      <div style={{ height: '300px', width: '100%' }}> {/* Atur tinggi grafik */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default StatistikSampah;
