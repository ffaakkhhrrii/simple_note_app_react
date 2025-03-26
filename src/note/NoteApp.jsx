import { useEffect, useMemo, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import { useImmerReducer } from "use-immer";
import { NotesContext, NotesDispatch } from "./NoteContext";
import Dialog from "../Dialog";

export default function NoteApp() {

    const [notes, dispatch] = useImmerReducer(noteReducer, [],
        () => {
            const savedNotes = localStorage.getItem("notes");
            return savedNotes ? JSON.parse(savedNotes) : [];
        }
    );

    const [searchText,setSearchText] = useState("");

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function noteReducer(draft, action) {
        if (action.type == 'ADD_NOTE') {
            draft.push({
                id: Date.now(),
                title: action.title,
                category: action.category,
                content: action.content
            });
        } else if (action.type == 'EDIT_NOTE') {
            const index = draft.findIndex(note => note.id == action.id);
            draft[index] = { ...action };
        } else if (action.type == 'DELETE_NOTE') {
            const index = draft.findIndex(note => note.id == action.id);
            draft.splice(index, 1);
        }
    }

    const filteredNotes = useMemo(()=>{
        const filteredNotes = notes.filter(note=> note.title.includes(searchText) || note.category.includes(searchText));
        return filteredNotes;
    }, [notes,searchText]);

    function onSearch(text) {
        setSearchText(text);
    }

    return (
        <div>
            <NotesContext.Provider value={notes}>
                <NotesDispatch.Provider value={dispatch}>
                    <h1 className="p-5 text-gray-900 font-medium text-3xl text-center border-b border-gray-400">Simple Note by <a href="https://fkzn.vercel.app" target="_blank" className="underline">@fkhri.zain</a></h1>
                    <div className="md:px-30 px-6">
                        <NoteForm onSearch={onSearch}/>
                        <NoteList notes={filteredNotes} />
                    </div>
                </NotesDispatch.Provider>
            </NotesContext.Provider>
        </div>
    );
}