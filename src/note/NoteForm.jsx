import { useContext, useRef, useState } from "react";
import { NotesContext, NotesDispatch } from "./NoteContext";

export default function NoteForm({onSearch}){
    const [isAdd,setIsAdd] = useState(false);
    const titleText = useRef("");
    const categoryText = useRef("");
    const contentText = useRef("");

    const notes = useContext(NotesContext);
    const dispatch = useContext(NotesDispatch);

    let component;

    function handleChangeSearch(e){
        onSearch(e.target.value);
    }

    function handleAdd(){
        if(titleText.current.value && categoryText.current.value && contentText.current.value){
            setIsAdd(false);
            dispatch({
                type: 'ADD_NOTE',
                title: titleText.current.value,
                category: categoryText.current.value,
                content: contentText.current.value
            });
        }else{
            alert("Please fill out this field before saving.");
        }
    }

    if(isAdd){
        component = (
            <>
                <div className="shadow-lg rounded-lg border border-gray-200 p-4 mt-10">
                    <div className="md:grid md:grid-cols-2 gap-4">
                        <input required ref={titleText} type="text" name="title_note" id="title_note" placeholder="Title Note" className="border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200" />
                        <input required ref={categoryText} type="text" name="category_note" id="category_note" placeholder="Category Note" className="border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200 md:mt-0 mt-5" />
                    </div>
                    <textarea required ref={contentText} name="content_note" id="content_note" placeholder="Content" className="border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200 mt-5"></textarea>
                    <div className="flex flex-row mt-3 gap-4 justify-end">
                        <button onClick={handleAdd} role="button" type="button" className="w-20 cursor-pointer text-white bg-gray-900  hover:bg-white hover:text-gray-900 hover:border hover:border-gray-400 focus:outline-none rounded-lg px-2 py-2 text-center">
                            Save
                        </button>
                        <button role="button" type="button" onClick={() => { setIsAdd(false); }} className="cursor-pointer text-white bg-gray-900  hover:bg-white hover:text-gray-900 hover:border hover:border-gray-400 focus:outline-none rounded-lg px-2 py-2 text-center w-20">
                            Cancel
                        </button>
                    </div>
                </div>
            </>
        )
    }else{
        component = (
            <>
            <div className="md:flex md:justify-between md:items-center mt-5">
                <h1 className="font-medium text-center md:text-left text-lg text-gray-900">Total Note {notes.length}</h1>
                <div className="md:grid md:grid-cols-4 gap-3">
                    <input onChange={handleChangeSearch} type="text" name="search_note" id="search_note" placeholder="Search by Title/Category" className="mt-3 md:mt-0 md:col-span-3 border border-gray-200 block w-full text-lg rounded-md px-3 py-2 placeholder-gray-400 focus:outline focus:outline-gray-200" />
                    <button role="button" type="button" onClick={()=>{setIsAdd(true);}} className="w-full mt-3 md:mt-0 cursor-pointer text-gray-900 border border-gray-300 hover:bg-gray-900 hover:text-white  focus:outline-none rounded-lg px-2 py-2 text-center inline-flex items-center">
                    <svg className="w-7 h-7 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                        Add Note
                    </button>
                </div>
            </div>
            </>
        )
    }

    return(
        <div>
            {component}
        </div>
    );
}