import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

function Note({ id, description, date, handleDeleteNote }) {
    return (
        <div className={'note'}>
            <span>{description}</span>
            <div className={"note-footer"}>
                <small className={'footer-date'}>{date}</small>
                <small className={'footer-date'}> noteId: {id} </small>
                <MdDeleteForever
                    className={"delete-icons"}
                    size={'2em'}
                    onClick={() => handleDeleteNote(id)}
                />
            </div>
        </div>
    );
}

export default Note;