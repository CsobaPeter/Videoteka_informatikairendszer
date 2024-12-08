import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserManagement/AuthContext";
import MediasService from "./MediasService";
import TextInput from "../components/form/TextInput";
import NumberInput from "../components/form/NumberInput";
import DropdownInput from "../components/form/DropdownInput";
import Modal from "../components/form/Modal";

const MediaAdder = () => {
    const { auth } = useContext(AuthContext);
    const mediaService = MediasService(auth.username);
    const navigate = useNavigate();

    const [media, setMedia] = useState({
        name: "",
        description: "",
        genre: "",
        rating: 1,
        duration: "",
        stock: "",
        type: 0,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const mediaTypes = [
        "DVD",
        "VHS",
        "BluRay",
        "CD",
        "Vinyl",
        "Cassette",
        "Digital",
        "Other",
    ];

    const handleChange = (e) =>
        setMedia({ ...media, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedMedia = {
            ...media,
            rating: parseInt(media.rating),
            type: parseInt(media.type),
            duration: parseInt(media.duration),
            stock: parseInt(media.stock),
        };

        const errors = [
            nameValidation(media.name),
            descriptionValidation(media.description),
            genreValidation(media.genre),
            ratingValidation(media.rating),
            durationValidation(media.duration),
            stockValidation(media.stock),
        ].filter((error) => error);

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        mediaService.create(parsedMedia);
        setIsModalOpen(true);
    };

    const handleAddMore = () => {
        setIsModalOpen(false);
        setMedia({
            name: "",
            description: "",
            genre: "",
            rating: 1,
            duration: "",
            stock: "",
            type: 0,
        });
    };

    const handleGoToMediaList = () => {
        setIsModalOpen(false);
        navigate("/media/list");
    };

    // Validation Functions
    const nameValidation = (value) => {
        if (!value.trim()) return "Name is required.";
        if (value.length > 15) return "Name must be at most 15 characters.";
        return "";
    };

    const descriptionValidation = (value) => {
        if (!value.trim()) return "Description is required.";
        return "";
    };

    const genreValidation = (value) => {
        if (!value.trim()) return "Genre is required.";
        return "";
    };

    const ratingValidation = (value) => {
        const numericValue = parseInt(value);
        if (isNaN(numericValue) || numericValue < 1 || numericValue > 10) {
            return "Rating must be between 1 and 10.";
        }
        return "";
    };

    const durationValidation = (value) => {
        const numericValue = parseInt(value);
        if (isNaN(numericValue) || numericValue < 1 || numericValue > 1440) {
            return "Duration must be between 1 and 1440 minutes.";
        }
        return "";
    };

    const stockValidation = (value) => {
        const numericValue = parseInt(value);
        if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
            return "Stock must be between 0 and 100.";
        }
        return "";
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
                    validation={nameValidation}
                />

                <TextInput
                    label="Description"
                    name="description"
                    value={media.description}
                    onChange={handleChange}
                    required
                    validation={descriptionValidation}
                />

                <TextInput
                    label="Genre"
                    name="genre"
                    value={media.genre}
                    onChange={handleChange}
                    required
                    validation={genreValidation}
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
                    label="Duration (minutes)"
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

                <button type="submit">Submit</button>
            </form>

            <Modal
                isOpen={isModalOpen}
                title="Success!"
                message="Your media has been added successfully."
                onAction={handleAddMore}
                actionText="Add More"
                onClose={handleGoToMediaList}
                type="add"
            />
        </div>
    );
};

export default MediaAdder;
