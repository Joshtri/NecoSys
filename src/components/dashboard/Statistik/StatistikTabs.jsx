import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StatistikSampah from '../Statistik/StatistikSampah';

function StatistikTabs() {
  // Tambahkan lebih banyak jenis statistik jika diperlukan
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className="statistik-tabs">
      <h2 className="mb-4">Statistik</h2>
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Statistik Sampah</Tab>
          <Tab>Statistik Transaksi</Tab>
          <Tab>Statistik Pengguna</Tab>
        </TabList>

        {/* Tab Panel for Statistik Sampah */}
        <TabPanel>
          <StatistikSampah />
        </TabPanel>

        {/* Tab Panel for Statistik Transaksi */}
        <TabPanel>
          <div className="chart-section mb-4">
            <h3>Statistik Transaksi</h3>
            <p>Visualisasi transaksi yang telah dilakukan selama ini.</p>
            {/* Tambahkan komponen atau grafik untuk statistik transaksi */}
          </div>
        </TabPanel>

        {/* Tab Panel for Statistik Pengguna */}
        <TabPanel>
          <div className="chart-section mb-4">
            <h3>Statistik Pengguna</h3>
            <p>Visualisasi jumlah pengguna dan aktivitas mereka di Eco Bank.</p>
            {/* Tambahkan komponen atau grafik untuk statistik pengguna */}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default StatistikTabs;
