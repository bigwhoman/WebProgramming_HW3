import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Search from "./Search";
import NotesList from "./NotesList";
import {nanoid} from "nanoid";

function NotePage({userToken,setToken}) {
    console.log("----users token----->",userToken)
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
    useEffect(() => {
        fetch('http://localhost:8000/notes/all', requestOptions)
            .then(response => {
                console.log("responseeeeeeeee---->>>>     ", response.json())
                responder = response;
                return response.json();
            })
            .then(data => {
                if (!responder.ok)
                    throw new Error(data.error);
                console.log(data);
            })
            .catch(err => {
                console.log("---error--->", err.message)
            })
        const savedNotes = JSON.parse(
            localStorage.getItem('react-notes-app-data')
        );
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(
            'react-notes-app-data',
            JSON.stringify(notes)
        )
    }, [notes]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()
        }
        const op = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userToken
            },
            body: JSON.stringify({description:text})
        };
        fetch('http://localhost:8000/notes/new', op)
            .then(response => {
                console.log("note response---->>>>     ", response.json())
                responder = response;
                return response.json();
            })
            .then(data => {
                if (!responder.ok)
                    throw new Error(data.error);
                console.log(data);
            })
            .catch(err => {
                console.log("---error--->", err.message)
            })
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
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
                                note.text.toLowerCase().includes(searchText)
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