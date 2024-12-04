import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ClientSelect = ({ clients, selectedClient, onClientChange }) => {
    return (
        <div>
            <label>Select Client:</label>
            <Typeahead
                id="client-typeahead"
                labelKey={(option) => `${option.name}`}
                options={clients.map((client) => ({ id: client.clientId, name: client.name }))}
                placeholder="Search for a client..."
                onChange={onClientChange}
                selected={selectedClient}

            />
        </div>
    );
};
export default ClientSelect;

const ClientControlledSelection = ({ clients, selectedClient, onClientChange, defaultSelected }) => {
    return (
        <div>
            <label>Select Client:</label>
            <Typeahead
                clearButton
                id="client-typeahead-controlled"
                placeholder="Search for a client..."
                defaultSelected={defaultSelected}
                labelKey={(option) => `${option.name}`}
                onChange={onClientChange}
                selected={selectedClient}
                options={clients.map((client) => ({ id: client.clientId, name: client.name }))}
            />
        </div>);
};


export {ClientControlledSelection};
