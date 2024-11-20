import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct way to use navigate
import MediaService from './MediaService';
import AddForm from '../components/AddForm';
import '../App.css';

const MediaAdder = () => {
    const navigate = useNavigate(); // Using useNavigate hook for navigation
    const [media, setMedia] = useState({ name: '', description: '', genre: '', rating: 1, duration: '', stock: '' });
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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

        // Call MediaService to create new media
        MediaService.create(parsedMedia);

        // Open the modal after submission
        setIsModalOpen(true);
    };

    const handleAddMore = () => {
        // Close the modal and reset the form to add more media
        setIsModalOpen(false);
        setMedia({ name: '', description: '', genre: '', rating: 1, duration: '', stock: '' });
    };

    const handleGoToMediaList = () => {
        // Navigate to /media/list
        setIsModalOpen(false);
        navigate('/media/list');
    };

    const mediaTypes = ['DVD', 'VHS', 'BluRay', 'CD', 'Vinyl', 'Cassette', 'Digital', 'Other'];

    return (
        <div>
            {/* AddForm Component */}
            <AddForm
                fields={[
                    { label: 'Name', name: 'name', type: 'text', value: media.name, onChange: handleChange, required: true },
                    { label: 'Description', name: 'description', type: 'text', value: media.description, onChange: handleChange, required: true },
                    { label: 'Genre', name: 'genre', type: 'text', value: media.genre, onChange: handleChange, required: true },
                    { label: 'Rating', name: 'rating', type: 'number', value: media.rating, onChange: handleChange, required: true },
                    { label: 'Type', name: 'type', type: 'dropdown', value: media.type, onChange: handleChange, required: true, options: mediaTypes },
                    { label: 'Duration', name: 'duration', type: 'number', value: media.duration, onChange: handleChange, required: true },
                    { label: 'Stock', name: 'stock', type: 'number', value: media.stock, onChange: handleChange, required: true },
                ]}
                onSubmit={handleSubmit}
            />

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Success!</h2>
                        <p>Your media has been added successfully.</p>
                        <div className="modal-buttons">
                            <button onClick={handleAddMore}>I want to add more</button>
                            <button onClick={handleGoToMediaList}>Media List Page</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaAdder;
