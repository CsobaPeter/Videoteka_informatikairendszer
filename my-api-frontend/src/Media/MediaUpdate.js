// src/Media/MediaUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MediaService from './MediaService';
import AddForm from '../components/AddForm';
import '../App.css'

const MediaUpdate = () => {
    const { id } = useParams();
    const [media, setMedia] = useState({ name: '', genre: '', rating: 1 });

    useEffect(() => {
        MediaService.getById(id).then((response) => setMedia(response.data));
    }, [id]);

    const handleChange = (e) => setMedia({ ...media, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        MediaService.update(id, media);
    };

    return (
        <AddForm
            fields={[
                { label: 'Name', name: 'name', value: media.name, onChange: handleChange, required: true },
                { label: 'Genre', name: 'genre', value: media.genre, onChange: handleChange, required: true },
                { label: 'Rating', name: 'rating', type: 'number', value: media.rating, onChange: handleChange, required: true },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default MediaUpdate;