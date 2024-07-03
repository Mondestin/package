import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, Table, Button,
  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback
} from "reactstrap";
import ToggleButton from './ToggleButton.js';
import user1 from "../../assets/images/users/user1.jpg";
import user5 from "../../assets/images/users/user5.jpg";



const ProjectTables = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    gender: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const [userToDelete, setUserToDelete] = useState(null);

  
  useEffect(() => {
    // Fetch data from the API
    fetch('https://microback.onrender.com/api/users')
      .then(response => response.json())
      .then(data => {
        
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = (user) => {
    setEditFormData(user);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.gender) errors.gender = 'Gender is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEditForm = () => {
    const errors = {};
    if (!editFormData.name) errors.name = 'Name is required';
    if (!editFormData.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+$/.test(editFormData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!editFormData.phone) errors.phone = 'Phone number is required';
    if (!editFormData.gender) errors.gender = 'Gender is required';

    setEditFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;
  
    // API call to save the data
    fetch('https://microback.onrender.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newUser => {
      // Update state with new user data
      setUsers([...users, newUser]);
      toggleModal();
      setFormData({
        name: '',
        email: '',
        phone: '',
        gender: ''
      });
      setFormErrors({});
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  };
  

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (!validateEditForm()) return;
  
    // API call to update the user data
    fetch(`https://microback.onrender.com/api/users/${editFormData.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editFormData)
    })
    .then(response => response.json())
    .then(updatedUser => {
      // Update state with updated user data
      const updatedUsers = users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers); // Update the users state with the updated data
      setIsEditModalOpen(false);
      setEditFormData({
        id: '',
        name: '',
        email: '',
        phone: '',
        gender: ''
      });
      setEditFormErrors({});
      e.preventDefault();
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating data:', error);
    });
  };
  
  

  const handleDelete = () => {
    // API call to delete the user
    fetch(`https://microback.onrender.com/api/users/${userToDelete.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Remove the deleted user from state
        const updatedUsers = users.filter(user => user.id !== userToDelete.id);
        setUsers(updatedUsers);
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } else {
        console.error('Failed to delete user');
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Organisation Users</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button color="primary" onClick={toggleModal}>
          <i className="bi bi-plus me-2"></i>Add User
        </Button>
      </div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Users</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Information</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Last login</th>
                <th>Card Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-top">
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={index % 2 === 0 ? user1 : user5}  // Alternating avatar images for demo
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{user.name}</h6>
                        <span className="text-muted">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.lastLogin || 'N/A'}</td>
                  <td>
                     <ToggleButton />
                  </td>
                  <td>
                    <div className="button-group">
                        <Button className="btn" color='warning' size="sm" onClick={() => toggleEditModal(user)}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button  className="btn"color='primary' size="sm"><i class="bi bi-arrow-clockwise"></i></Button>
                        <Button  className="btn" color='danger' size="sm" onClick={() => toggleDeleteModal(user)}>
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </div>
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Add User Modal */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Enter User Data</ModalHeader>
        <Form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                invalid={!!formErrors.name}
              />
              {formErrors.name && <FormFeedback>{formErrors.name}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                invalid={!!formErrors.email}
              />
              {formErrors.email && <FormFeedback>{formErrors.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                invalid={!!formErrors.phone}
              />
              {formErrors.phone && <FormFeedback>{formErrors.phone}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                type="select"
                value={formData.gender}
                onChange={handleInputChange}
                invalid={!!formErrors.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
              {formErrors.gender && <FormFeedback>{formErrors.gender}</FormFeedback>}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success">Save</Button>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit User Data</ModalHeader>
        <Form onSubmit={handleEditFormSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="editName">Name</Label>
              <Input
                id="editName"
                name="name"
                type="text"
                value={editFormData.name}
                onChange={handleEditInputChange}
                invalid={!!editFormErrors.name}
              />
              {editFormErrors.name && <FormFeedback>{editFormErrors.name}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="editEmail">Email</Label>
              <Input
                id="editEmail"
                name="email"
                type="email"
                value={editFormData.email}
                onChange={handleEditInputChange}
                invalid={!!editFormErrors.email}
              />
              {editFormErrors.email && <FormFeedback>{editFormErrors.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="editPhone">Phone</Label>
              <Input
                id="editPhone"
                name="phone"
                type="text"
                value={editFormData.phone}
                onChange={handleEditInputChange}
                invalid={!!editFormErrors.phone}
              />
              {editFormErrors.phone && <FormFeedback>{editFormErrors.phone}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="editGender">Gender</Label>
              <Input
                id="editGender"
                name="gender"
                type="select"
                value={editFormData.gender}
                onChange={handleEditInputChange}
                invalid={!!editFormErrors.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Input>
              {editFormErrors.gender && <FormFeedback>{editFormErrors.gender}</FormFeedback>}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success">Save</Button>
            <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete {userToDelete && userToDelete.name}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectTables;
