import { NotesContext, NotesDispatch } from "./NoteContext";
import Note from "./Note";

export default function NoteList({notes}){

    return(
        <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2 mt-5">
            {
                notes.length>0 ?
                notes.map(note=> (
                    <Note key={note.id} note={note}/>
                )): <p className="text-gray-900 font-medium text-xl text-center col-span-3">Empty Note</p>
            }
        </div>
    );
}