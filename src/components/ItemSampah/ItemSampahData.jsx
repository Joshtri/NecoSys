import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddItemSampah from '../ItemSampah/AddItemSampah';
import ViewItemSampah from '../ItemSampah/ViewItemSampah';
import EditItemSampah from '../ItemSampah/EditItemSampah';
import DeleteConfirmation from '../ItemSampah/DeleteItemSampah';
import useUserProfile from '../../hooks/useUserProfile';

function ItemSampahData() {
  const [itemSampah, setItemSampah] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const userProfile = useUserProfile();

  // Fetch item sampah data from backend
  useEffect(() => {
    async function fetchItemSampah() {
      try {
        // Tentukan URL endpoint berdasarkan role
        let url = `${import.meta.env.VITE_BASE_URL}/item/sampah`;
        if (userProfile.role === 'pengepul') {
          url = `${import.meta.env.VITE_BASE_URL}/item/sampah?pengepulId=${userProfile.id}`;
        }

        const response = await axios.get(url);
        if (response.data.status === 'success') {
          setItemSampah(response.data.data);
        } else {
          alert('Failed to fetch item sampah data');
        }
      } catch (error) {
        console.error('Error fetching item sampah data:', error);
        alert('Error fetching item sampah data');
      }
    }

    if (userProfile.id) {
      fetchItemSampah(); // Hanya panggil ketika userProfile.id sudah tersedia
    }
  }, [userProfile]); // Jalankan ulang ketika userProfile berubah

  const handleAddItem = (newItem) => {
    setItemSampah((prevState) => [...prevState, newItem]); // Add the new item to the list
  };

  const handleUpdateItem = (updatedItem) => {
    setItemSampah(itemSampah.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/item/sampah/${id}`);
      if (response.status === 200) {
        setItemSampah(itemSampah.filter((item) => item.id !== id));
        alert('Item Sampah deleted successfully');
        setShowDeleteModal(false);
      } else {
        alert('Failed to delete item sampah');
      }
    } catch (error) {
      console.error('Error deleting item sampah:', error);
      alert('Error deleting item sampah');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Data Item Sampah</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Item Sampah
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Harga Per Kg</th>
            <th>Kategori Sampah</th>
            {userProfile.role === 'admin' && <th>Pengepul</th>} {/* Tambahkan kolom pengepul jika admin */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemSampah.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>{item.hargaPerKg}</td>
              <td>{item.kategoriSampah?.nama}</td>
              {userProfile.role === 'admin' && <td>{item.pengepul?.namaBankSampah}</td>} {/* Tampilkan nama pengepul jika admin */}
              <td className="">
                <Button variant="info" onClick={() => { setViewItem(item); setShowModal(true); }}>
                  View
                </Button>
                <Button variant="warning" onClick={() => { setEditItem(item); }}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => { setDeleteItemId(item.id); setShowDeleteModal(true); }}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Item Sampah Modal */}
      <AddItemSampah
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAddItem={handleAddItem}
      />

      {/* View Item Sampah Modal */}
      {viewItem && (
        <ViewItemSampah
          show={showModal}
          handleClose={() => setShowModal(false)}
          item={viewItem}
        />
      )}

      {/* Edit Item Sampah Modal */}
      {editItem && (
        <EditItemSampah
          show={showModal}
          handleClose={() => setShowModal(false)}
          item={editItem}
          handleUpdateItem={handleUpdateItem}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDeleteItem={handleDeleteItem}
        itemId={deleteItemId}
      />
    </div>
  );
}

export default ItemSampahData;
