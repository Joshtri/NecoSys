import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';

function ViewTransaksi() {
  const [transaksi, setTransaksi] = useState(null);
  const { id } = useParams(); // Mengambil ID transaksi dari URL

  // Fetch transaksi data by ID
  useEffect(() => {
    async function fetchTransaksiDetail() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transaksi/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaksi data');
        }
        const result = await response.json();
        if (result.status === "success") {
          setTransaksi(result.data); // Set the data from the response
        } else {
          alert('Failed to fetch transaksi details');
        }
      } catch (error) {
        console.error('Error fetching transaksi detail:', error);
        alert('Error fetching transaksi detail');
      }
    }

    fetchTransaksiDetail();
  }, [id]);

  if (!transaksi) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Detail Transaksi {transaksi.id}</h2>
      <Card>
        <Card.Body>
          <Card.Title>Anggota: {transaksi.anggota ? transaksi.anggota.nama : 'Unknown'}</Card.Title>
          <Card.Text>
            <strong>Status:</strong> {transaksi.statusTransaksi}
          </Card.Text>
          <Card.Text>
            <strong>Total Transaksi:</strong> {transaksi.totalTransaksi}
          </Card.Text>
          <Card.Text>
            <strong>Tanggal Transaksi:</strong> {new Date(transaksi.tanggalTransaksi).toLocaleString()}
          </Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Items:</strong>
              {Array.isArray(transaksi.itemTransaksi) && transaksi.itemTransaksi.length > 0 ? (
                transaksi.itemTransaksi.map((itemTrans, idx) => (
                  <div key={idx}>
                    <div>
                      <strong>Item:</strong> {itemTrans.itemSampah.nama} ({itemTrans.kuantitas})
                    </div>
                    <div>
                      <strong>Kategori:</strong> {itemTrans.itemSampah.kategoriSampah.nama}
                    </div>
                    <div>
                      <strong>Total Harga:</strong> {itemTrans.totalHarga}
                    </div>
                  </div>
                ))
              ) : (
                <span>No items</span>
              )}
            </ListGroup.Item>
          </ListGroup>
          <Button variant="secondary" className="mt-3" onClick={() => window.history.back()}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewTransaksi;
