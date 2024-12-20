import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./MetaPages/App";
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import reportWebVitals from "./MetaPages/reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
            <App />
    </React.StrictMode>
);

reportWebVitals();