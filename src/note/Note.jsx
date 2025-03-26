import { useContext, useState } from "react";
import { NotesDispatch } from "./NoteContext";
import Dialog from "../Dialog";

export default function Note({note}){
    const [isEdit,setIsEdit] = useState(false);
    const [isDialogDelete,setIsDialogDelete] = useState(false);
    const dispatch = useContext(NotesDispatch);
    
    function handleEditText(e){
        dispatch({
            ...note,
            type: 'EDIT_NOTE',
            title: e.target.value
        });
    }

    function handleEditCategory(e){
        dispatch({
            ...note,
            type: 'EDIT_NOTE',
            category: e.target.value
        });
    }

    function handleEditContent(e){
        dispatch({
            ...note,
            type: 'EDIT_NOTE',
            content: e.target.value
        });
    }
    

    let component;

    if(isEdit){
        component = (
            <>
            <input type="text" onChange={handleEditText} name="title_note" id="title_note" value={note.title} placeholder="Title Note" className="border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200" />
            <input type="text" onChange={handleEditCategory} name="category_note" id="category_note" value={note.category} placeholder="Category Note" className="border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200 mt-2" />
            <textarea name="content_note" onChange={handleEditContent} id="content_note" placeholder="Content" value={note.content} className="border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200 mt-2"></textarea>
            <div className="flex justify-between mt-5">
                <span onClick={()=>{setIsEdit(false)}}>
                    <svg className="w-10 h-10 rounded-xl border border-gray-400 p-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 21V13H6V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H18ZM16 21H8V15H16V21Z"></path></svg>
                </span>

                <span onClick={()=> {setIsDialogDelete(true)}}>
                    <svg className="w-10 h-10 rounded-xl border border-gray-400 p-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(243,15,15,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg>
                </span>
            </div>
            </>
        );
    }else{
        component =(
            <>
            <h1 className="font-semibold text-xl text-gray-900 break-words">{note.title}</h1>
            <h4 className="font-medium break-words">{note.category}</h4>
            <p className="text-gray-900 break-words">{note.content}</p>
            <div className="flex justify-between mt-5">
                <span onClick={()=>{setIsEdit(true)}}>
                    <svg className="w-10 h-10 rounded-xl border border-gray-400 p-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z"></path></svg>
                </span>

                <span onClick={()=> {setIsDialogDelete(true)}}>
                    <svg className="w-10 h-10 rounded-xl border border-gray-400 p-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(243,15,15,1)"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"></path></svg>
                </span>
            </div>
            </>
        );
    }
    

    return(
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg mt-5 md:mt-0 mb-4">
            {component}
            <Dialog
            isOpen={isDialogDelete}
            onClose={() => setIsDialogDelete(false)}
            onConfirm={() => {
                dispatch({
                    ...note,
                    type: "DELETE_NOTE",
                    id:note.id
                });
                setIsDialogDelete(false);
            }}
            title={note.title}
        />
        </div>
    );
}