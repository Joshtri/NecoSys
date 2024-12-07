import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from '../Breadcrumbs'; // Import Breadcrumbs component
import useUserProfile from '../../hooks/useUserProfile';

function AddTransaksi() {
  const [anggotaList, setAnggotaList] = useState([]);
  const [itemSampahList, setItemSampahList] = useState([]);
  const [pengepulList, setPengepulList] = useState([]);
  const [selectedPengepul, setSelectedPengepul] = useState('');
  const [selectedAnggota, setSelectedAnggota] = useState('');
  const [selectedItemSampah, setSelectedItemSampah] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [cart, setCart] = useState([]);
  const userProfile = useUserProfile();
  const navigate = useNavigate();

  // Breadcrumb paths
  const breadcrumbPaths = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Data Transaksi', link: '/transaksi' },
    { label: 'Add Transaksi', link: '/transaksi/add' },
  ];

  // Fetch anggota, item sampah, and pengepul
  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/anggota`);
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          setAnggotaList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching anggota data', error);
      }
    };

    const fetchItemSampah = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/item/sampah`);
        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          setItemSampahList(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching item sampah data', error);
      }
    };

    const fetchPengepul = async () => {
      if (userProfile.role !== 'pengepul') {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pengepul-diterima`);
          setPengepulList(response.data.data);
        } catch (error) {
          console.error('Error fetching pengepul data', error);
        }
      }
    };

    fetchAnggota();
    fetchItemSampah();
    fetchPengepul();
  }, [userProfile.role]);

  const calculateTotalPrice = (itemId, quantity) => {
    const selectedItem = itemSampahList.find((item) => item.id === itemId);
    return selectedItem ? selectedItem.hargaPerKg * quantity : 0;
  };

  const handleAddToCart = () => {
    if (!selectedItemSampah || !jumlah || jumlah <= 0) {
      alert('Please select an item and enter a valid quantity');
      return;
    }

    const total = calculateTotalPrice(selectedItemSampah, jumlah);
    const newCartItem = { itemId: selectedItemSampah, jumlah, totalHarga: total };

    setCart([...cart, newCartItem]);
    setSelectedItemSampah('');
    setJumlah('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const totalTransaksi = cart.reduce((sum, item) => sum + item.totalHarga, 0);
    const pengepulId = userProfile.role === 'pengepul' ? userProfile.id : selectedPengepul;

    if (!pengepulId) {
      alert('Please select a pengepul');
      return;
    }

    const newTransaksi = {
      pengepulId,
      anggotaId: selectedAnggota,
      totalTransaksi,
      itemTransaksi: cart.map((item) => ({
        itemSampahId: item.itemId,
        kuantitas: parseFloat(item.jumlah),
        totalHarga: parseFloat(item.totalHarga),
      })),
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/transaksi`, newTransaksi);
      navigate('/transaksi');
    } catch (error) {
      console.error('Error adding transaksi', error);
    }
  };

  return (
    <Container className="mt-4">
      {/* Breadcrumbs */}
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className="mb-4 text-center">Add New Transaksi</h2>
      <hr />
      <Form onSubmit={handleFormSubmit}>
        {userProfile.role !== 'pengepul' && (
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="formPengepul">
                <Form.Label>Pengepul</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedPengepul}
                  onChange={(e) => setSelectedPengepul(e.target.value)}
                >
                  <option value="">Select Pengepul</option>
                  {pengepulList.map((pengepul) => (
                    <option key={pengepul.id} value={pengepul.id}>
                      {pengepul.namaBankSampah || pengepul.nama}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        )}

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formAnggota">
              <Form.Label>Anggota</Form.Label>
              <Form.Control
                as="select"
                value={selectedAnggota}
                onChange={(e) => setSelectedAnggota(e.target.value)}
              >
                <option value="">Select Anggota</option>
                {anggotaList.map((anggota) => (
                  <option key={anggota.id} value={anggota.id}>
                    {anggota.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="formItemSampah">
              <Form.Label>Item Sampah</Form.Label>
              <Form.Control
                as="select"
                value={selectedItemSampah}
                onChange={(e) => setSelectedItemSampah(e.target.value)}
              >
                <option value="">Select Item Sampah</option>
                {itemSampahList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama} - {item.hargaPerKg} per kg
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formJumlah">
              <Form.Label>Jumlah (Kg)</Form.Label>
              <Form.Control
                type="number"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                min="1"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleAddToCart}>
          Add Item to Cart
        </Button>

        {cart.length > 0 && (
          <Card className="mt-4 p-3">
            <Card.Header as="h5">Cart Summary</Card.Header>
            <ListGroup variant="flush">
              {cart.map((item, index) => {
                const itemDetail = itemSampahList.find((i) => i.id === item.itemId);
                return (
                  <ListGroup.Item key={index}>
                    {itemDetail ? itemDetail.nama : 'Unknown Item'} - {item.jumlah} Kg - Total: {item.totalHarga} IDR
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Card.Footer>
              <Button variant="success" type="submit">
                Submit Transaksi
              </Button>
            </Card.Footer>
          </Card>
        )}
      </Form>
    </Container>
  );
}

export default AddTransaksi;
