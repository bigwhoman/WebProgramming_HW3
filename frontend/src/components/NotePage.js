import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Search from "./Search";
import NotesList from "./NotesList";
import {nanoid} from "nanoid";

function NotePage({userToken,setToken}) {
    // console.log("----users token----->",userToken)
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': userToken
        },
    };
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    let responder = undefined;
    let savedNotes = undefined;
    useEffect(() => {
        fetch('http://localhost:8000/notes/all', requestOptions)
            .then(async response => {
                savedNotes=(await response.json()).notes;
                // console.log("saved notes---->",savedNotes);
            })
            .catch(err => {
                // console.log("---error in all notes--->", err.message)
            }).finally(()=>{
            if (savedNotes) {
                setNotes(savedNotes);
                // console.log("notes---->",notes);
            }
        })
    }, []);

    const addNote = (description) => {
        const date = new Date();
        const op = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userToken
            },
            body: JSON.stringify({description:description})
        };
        fetch('http://localhost:8000/notes/new', op)
            .then(async response => {
                console.log("create note response")
                responder = response;
                return response.json();
            })
            .then(data => {
                if (!responder.ok)
                    throw new Error(data.error);
                console.log('data---->',data);

            })
            .catch(err => {
                console.log("---error--->", err.message)
            })
        // const newNote = {
        //     // id: nanoid(),
        //     description: description,
        //     // date: date.toLocaleDateString()
        // }
        // const newNotes = [...notes, newNote];
        // setNotes(newNotes);
    }

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }
    return (
        <>
            <div className={`${darkMode && 'dark-mode'}`}>
                <div className={"container"}>
                    <Header handleDarkMode={setDarkMode} setToken={setToken}/>
                    <Search handleSearchNote={setSearchText}/>
                    <NotesList
                        notes={notes.filter(
                            (note) =>
                                note.description.toLowerCase().includes(searchText)
                        )}
                        handleAddNote={addNote}
                        handleDeleteNote={deleteNote}
                        userToken={userToken}
                    />
                </div>
            </div>
        </>
    );
}

export default NotePage;