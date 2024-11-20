// src/Media/MediaUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MediaService from './MediaService';
import AddForm from '../components/AddForm';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const MediaUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Using useNavigate hook for navigation
    const [media, setMedia] = useState({ name: '', description: '', genre: '', rating: 1, duration: '', stock: '' });

    useEffect(() => {
        MediaService.getById(id).then((response) => setMedia(response.data));
    }, [id]);

    const handleChange = (e) => setMedia({ ...media, [e.target.name]: e.target.value });

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedMedia = {
            ...media,
            rating: parseInt(media.rating),
            type: parseInt(media.type),
            duration: parseInt(media.duration),
            stock: parseInt(media.stock)
        };

        MediaService.update(id, parsedMedia);
        timeout(100).then(() => navigate('/media/list'));
    };

    const mediaTypes = ['DVD', 'VHS', 'BluRay', 'CD', 'Vinyl', 'Cassette', 'Digital', 'Other'];


    return (
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
    );
};

export default MediaUpdate;