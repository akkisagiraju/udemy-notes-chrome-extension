import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const ViewAllNotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    let cancel = false;
    Axios.get('http://localhost:3001/api/notes')
      .then((response) => {
        if (!cancel) {
          setNotes(response.data);
        }
      })
      .catch((error) => console.log(error));

    return () => {
      cancel = true;
    };
  }, []);
  return (
    <div className="container">
      {notes.map((note) => (
        <div className="card my-1" key={note.id}>
          <img
            src={`https://img.youtube.com/vi/${note.url.substring(
              32,
              43
            )}/mqdefault.jpg`}
            class="card-img-top"
            alt="thumbanil"
          />
          <div className="card-body">
            <h6 className="card-title">{note.title}</h6>
            <p className="card-text font-weight-light">
              Timestamp - {note.timestamp}
            </p>
            <p className="card-text">{note.note}</p>
            <a href={note.url} target="_blank" className="btn btn-primary">
              Go to the video
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewAllNotes;
