import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Search from "./Search";
import NotesList from "./NotesList";

function NotePage({ userToken, setToken }) {
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
                savedNotes = (await response.json()).notes;
            })
            .catch(err => {
            }).finally(() => {
                if (savedNotes) {
                    setNotes(savedNotes);
                }
            })
    }, []);

    const addNote = async (text) => {
        let newNote = undefined;
        let date = null;
        let id = null;

        const op = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userToken
            },
            body: JSON.stringify({ description: text })
        };
        await fetch('http://localhost:8000/notes/new', op)
            .then(async response => {
                responder = response;
                return response.json();
            })
            .then(data => {
                if (!responder.ok)
                    throw new Error(data.error);
                date = data.createdAt;
                id = data.id;
            })
            .catch(err => {
                console.log("---error--->", err.message)
            })

        newNote = {
            id: id,
            description: text,
            date: date
        }

        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    }

    const deleteNote = async (id) => {
        await fetch('http://localhost:8000/notes/' + id, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json',
                'auth-token': userToken
            },
            params: id,
        }).then(async response => {
            responder = response;
            return response.json();
        })
            .then(data => {
                if (!responder.ok)
                    throw new Error(data.error);
            });

        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    }

    return (
        <>
            <div className={`${darkMode && 'dark-mode'}`}>
                <div className={"container"}>
                    <Header handleDarkMode={setDarkMode} setToken={setToken} setNotes={notes} />
                    <Search handleSearchNote={setSearchText} />
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