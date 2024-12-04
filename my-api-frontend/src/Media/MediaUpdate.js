import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../UserManagement/AuthContext";
import MediasService from "./MediasService";
import TextInput from '../components/form/TextInput';  // Reusing TextInput component
import NumberInput from '../components/form/NumberInput';  // Reusing NumberInput component
import DropdownInput from '../components/form/DropdownInput';  // Reusing DropdownInput component
import Modal from '../components/form/Modal';  // Reusable Modal component if you wish to show a success message

const MediaUpdate = () => {
    const { auth } = useContext(AuthContext);
    const mediaService = MediasService(auth.username);
    const { id } = useParams();
    const navigate = useNavigate();
    const [media, setMedia] = useState({ name: '', description: '', genre: '', rating: 1, duration: '', stock: '', type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);  // For showing success modal

    useEffect(() => {
        mediaService.getById(id).then((response) => setMedia(response.data));
    }, []);

    const handleChange = (e) => setMedia({ ...media, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedMedia = {
            ...media,
            rating: parseInt(media.rating),
            type: parseInt(media.type),
            duration: parseInt(media.duration),
            stock: parseInt(media.stock)
        };

        mediaService.update(id, parsedMedia);
        setIsModalOpen(true);  // Show success modal after submission
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/media/list');
    };

    const mediaTypes = ['DVD', 'VHS', 'BluRay', 'CD', 'Vinyl', 'Cassette', 'Digital', 'Other'];

    // Validation Functions
    const ratingValidation = (value) => {
        if (value < 1 || value > 10) return 'Rating must be between 1 and 10.';
        return '';
    };

    const durationValidation = (value) => {
        if (value <= 0) return 'Duration must be a positive number.';
        return '';
    };

    const stockValidation = (value) => {
        if (value < 0) return 'Stock cannot be negative.';
        return '';
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="add-form">
                <TextInput
                    label="Name"
                    name="name"
                    value={media.name}
                    onChange={handleChange}
                    required
                />

                <TextInput
                    label="Description"
                    name="description"
                    value={media.description}
                    onChange={handleChange}
                    required
                />

                <TextInput
                    label="Genre"
                    name="genre"
                    value={media.genre}
                    onChange={handleChange}
                    required
                />

                <NumberInput
                    label="Rating"
                    name="rating"
                    value={media.rating}
                    onChange={handleChange}
                    required
                    validation={ratingValidation}
                />

                <DropdownInput
                    label="Type"
                    name="type"
                    value={media.type}
                    onChange={handleChange}
                    required
                    options={mediaTypes}
                />

                <NumberInput
                    label="Duration"
                    name="duration"
                    value={media.duration}
                    onChange={handleChange}
                    required
                    validation={durationValidation}
                />

                <NumberInput
                    label="Stock"
                    name="stock"
                    value={media.stock}
                    onChange={handleChange}
                    required
                    validation={stockValidation}
                />

                <button type="submit">Update</button>
            </form>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title="Success!"
                    message="Your media has been updated successfully."
                    onAction={handleModalClose}
                    actionText="Go to Media List"
                    onClose={handleModalClose}
                    type="update"
                />
            )}
        </div>
    );
};

export default MediaUpdate;