import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NoteApp from "./NoteApp";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NoteApp/>
    </StrictMode>
)