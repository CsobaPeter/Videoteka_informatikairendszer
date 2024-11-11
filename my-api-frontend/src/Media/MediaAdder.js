// src/Media/MediaAdder.js
import React, { useState } from 'react';
import MediaService from './MediaService';
import AddForm from '../components/AddForm';
import '../App.css'

const MediaAdder = () => {
    const [media, setMedia] = useState({ name: '', description: '', genre: '', rating: 1, duration: '', stock: ''});

    const handleChange = (e) => setMedia({ ...media, [e.target.name]: e.target.value });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        MediaService.create(media);
    };

    return (
        <AddForm
            fields={[
                { label: 'Name', name: 'name', value: media.name, onChange: handleChange, required: true },
                { label: 'Description', name: 'description', value: media.description, onChange: handleChange, required: true },
                { label: 'Genre', name: 'genre', value: media.genre, onChange: handleChange, required: true },
                { label: 'Rating', name: 'rating', type: 'number', value: media.rating, onChange: handleChange, required: true },
                { label: 'Duration', name: 'duration', type: 'number', value: media.duration, onChange: handleChange, required: true },
                { label: 'Stock', name: 'stock', type: 'number', value: media.stock, onChange: handleChange, required: true },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default MediaAdder;