import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const MediaSelect = ({ medias, selectedMedia, onMediaChange }) => {
    return (
        <div>
            <label>Select Media:</label>
            <Typeahead
                id="media-typeahead"
                labelKey={(option) => `${option.name}`}
                options={medias.map((media) => ({
                    id: media.mediaId,
                    name: media.name,
                    disabled: media.stock === 0,
                    style: { color: media.stock === 0 ? "#d3d3d3" : "black" }
                }))}
                placeholder="Search for a media..."
                onChange={onMediaChange}
                selected={selectedMedia}
                renderMenuItemChildren={(option) => (
                    <div style={option.style}>
                        {option.name} {option.disabled && "(Out of Stock)"}
                    </div>
                )}
            />
        </div>
    );
};

export default MediaSelect;

const MediaControlledSelection = ({ medias, selectedMedia, onMediaChange, defaultSelected }) => {
    return (
        <div>
            <label>Select Media:</label>
            <Typeahead
                id="media-typeahead"
                labelKey={(option) => `${option.name}`}
                options={medias.map((media) => ({
                    id: media.mediaId,
                    name: media.name,
                    disabled: media.stock === 0,
                    style: {color: media.stock === 0 ? "#d3d3d3" : "black"}
                }))}
                placeholder="Search for a media..."
                onChange={onMediaChange}
                selected={selectedMedia}
                defaultSelected={defaultSelected}
                renderMenuItemChildren={(option) => (
                    <div style={option.style}>
                        {option.name} {option.disabled && "(Out of Stock)"}
                    </div>
                )}
            />
        </div>);
};


export {MediaControlledSelection};