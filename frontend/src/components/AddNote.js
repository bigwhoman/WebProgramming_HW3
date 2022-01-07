import React, {useState} from 'react';

function AddNote({handleAddNote}) {
    const [noteText, setNoteText] = useState('');
    const characterLimit = 200;

    function handleChange(event) {
        if (characterLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }

    }

    function handleSaveClick(event) {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText("");
        }
    }

    return (
        <div className={"note new"}>
            <textarea
                rows={"8"}
                cols={"8"}
                placeholder={"type to add note..."}
                value={noteText}
                onChange={handleChange}
            >

            </textarea>
            <div className={"note-footer"}>
                <small className={"footer-date"}>
                    {characterLimit - noteText.length}
                </small>
                <button
                    className={"save"}
                    onClick={handleSaveClick}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default AddNote;