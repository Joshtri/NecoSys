import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddItemSampah from '../ItemSampah/AddItemSampah';
import ViewItemSampah from '../ItemSampah/ViewItemSampah';
import EditItemSampah from '../ItemSampah/EditItemSampah';
import DeleteConfirmation from '../ItemSampah/DeleteItemSampah';
import useUserProfile from '../../hooks/useUserProfile';
import Breadcrumbs from '../Breadcrumbs';
import { PiHouseFill } from 'react-icons/pi';
import { FaTrash, FaEye, FaEdit, FaPlusCircle } from 'react-icons/fa';
import { FaWarehouse } from 'react-icons/fa6';

function ItemSampahData() {
  const [itemSampah, setItemSampah] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const userProfile = useUserProfile();

  const breadcrumbPaths = [
    { label: 'Home', link: '/', icon: <PiHouseFill /> },
    { label: 'Dashboard', link: '/dashboard', icon: <FaWarehouse /> },
    { label: 'Data Item Sampah', icon: <FaWarehouse /> }, // Breadcrumb terakhir tanpa link
  ];

  // Fetch item sampah data from backend
  useEffect(() => {
    async function fetchItemSampah() {
      try {
        let url = `${import.meta.env.VITE_BASE_URL}/item/sampah`;
        if (userProfile.role === 'pengepul') {
          url = `${url}?pengepulId=${userProfile.id}`;
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
      fetchItemSampah(); // Fetch data only when userProfile.id is available
    }
  }, [userProfile]);

  const handleAddItem = (newItem) => {
    setItemSampah((prevState) => [...prevState, newItem]);
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
      {/* Breadcrumbs */}
      <Breadcrumbs paths={breadcrumbPaths} />

      <h2 className="text-center">Data Item Sampah</h2>
      <hr />

      {/* Add Item Sampah Button */}
      <Link to="#" onClick={() => setShowModal(true)} className="mb-3 btn btn-primary align-items-center">
        <FaPlusCircle className="me-2" /> Add New Item Sampah
      </Link>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Harga Per Kg</th>
            <th>Kategori Sampah</th>
            {userProfile.role === 'admin' && <th>Pengepul</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemSampah.length > 0 ? (
            itemSampah.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.hargaPerKg}</td>
                <td>{item.kategoriSampah?.nama || 'Unknown'}</td>
                {userProfile.role === 'admin' && <td>{item.pengepul?.namaBankSampah || 'Unknown'}</td>}
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    {/* View Button */}
                    <Button
                      variant="info"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => setViewItem(item)}
                    >
                      <FaEye className="me-2" /> View
                    </Button>

                    {/* Edit Button */}
                    <Button
                      variant="warning"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => setEditItem(item)}
                    >
                      <FaEdit className="me-2" /> Edit
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="danger"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={() => {
                        setDeleteItemId(item.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash className="me-2" /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Item Sampah Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add Item Sampah Modal */}
      <AddItemSampah show={showModal} handleClose={() => setShowModal(false)} handleAddItem={handleAddItem} />

      {/* View Item Sampah Modal */}
      {viewItem && <ViewItemSampah show={true} handleClose={() => setViewItem(null)} item={viewItem} />}

      {/* Edit Item Sampah Modal */}
      {editItem && (
        <EditItemSampah
          show={true}
          handleClose={() => setEditItem(null)}
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
