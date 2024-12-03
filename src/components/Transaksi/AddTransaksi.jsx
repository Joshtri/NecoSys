import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTransaksi() {
  const [anggotaList, setAnggotaList] = useState([]);
  const [itemSampahList, setItemSampahList] = useState([]);
  const [selectedAnggota, setSelectedAnggota] = useState('');
  const [selectedItemSampah, setSelectedItemSampah] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch anggota (members) and item sampah (waste items) from the API
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

    fetchAnggota();
    fetchItemSampah();
  }, []);

  // Calculate total price based on quantity and item price
  const calculateTotalPrice = (itemId, quantity) => {
    const selectedItem = itemSampahList.find((item) => item.id === itemId);
    const totalPrice = selectedItem ? selectedItem.hargaPerKg * quantity : 0;
    return totalPrice;
  };

  // Add item to cart
  const handleAddToCart = () => {
    if (!selectedItemSampah || !jumlah || jumlah <= 0) {
      alert('Please select an item and enter a valid quantity');
      return;
    }

    const total = calculateTotalPrice(selectedItemSampah, jumlah);

    const newCartItem = { itemId: selectedItemSampah, jumlah, totalHarga: total };

    // Add the item to the cart
    setCart([...cart, newCartItem]);

    // Reset inputs after adding to the cart
    setSelectedItemSampah('');
    setJumlah('');
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Calculate the total of all items in the cart
    const totalTransaksi = cart.reduce((sum, item) => sum + item.totalHarga, 0);
  
    const newTransaksi = {
      anggotaId: selectedAnggota,
      totalTransaksi: totalTransaksi,  // Pastikan totalTransaksi dihitung dengan benar
      itemTransaksi: cart.map((item) => ({
        itemSampahId: item.itemId,  // ID item sampah
        kuantitas: parseFloat(item.jumlah),  // Pastikan kuantitas adalah angka
        totalHarga: parseFloat(item.totalHarga),  // Pastikan totalHarga adalah angka
      })),
    };
  
    console.log('New Transaksi Data:', newTransaksi);  // Debugging log untuk memeriksa data yang dikirim
    
    // if (newTransaksi.items.length === 0) {
    //   alert("Cart cannot be empty.");
    //   return;
    // }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/transaksi`, newTransaksi);
      console.log('Transaction response:', response.data);  // Debugging log
      navigate('/admin/transaksi');
    } catch (error) {
      console.error('Error adding transaksi', error);
    }
  };
  

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Add New Transaksi</h2>
      <Form onSubmit={handleFormSubmit}>
        {/* Select Anggota (Member) */}
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
                {anggotaList.length > 0 ? (
                  anggotaList.map((anggota) => (
                    <option key={anggota.id} value={anggota.id}>
                      {anggota.nama}
                    </option>
                  ))
                ) : (
                  <option disabled>No Anggota Available</option>
                )}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Select Item Sampah and Quantity */}
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
                {itemSampahList.length > 0 ? (
                  itemSampahList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama} - {item.hargaPerKg} per kg
                    </option>
                  ))
                ) : (
                  <option disabled>No Item Sampah Available</option>
                )}
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

        {/* Cart Summary */}
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
