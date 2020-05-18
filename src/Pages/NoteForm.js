import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const code = `(function getTimeStamp() {
  return {
    courseName: document.querySelector('[data-purpose*="course-header-title"]')
      .innerText,
    videoName: document.querySelector('[class*="link--is-current"]').innerText,
    timestamp: document.querySelector('[data-purpose*="current-time"]')
      .innerText,
  };
})()`;

const NoteForm = () => {
  const [courseName, setCourseName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [url, setUrl] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        setUrl(tabs[0].url);
      }
    );

    chrome.tabs.executeScript(
      null,
      {
        code,
      },
      (results) => {
        setCourseName(results[0].courseName);
        setVideoName(results[0].videoName);
        setTimestamp(results[0].timestamp);
      }
    );

    return () => {
      console.log('unmounting');
    };
  }, []);

  const submit = () => {
    Axios.post('http://localhost:3001/api/notes', {
      courseName,
      videoName,
      url,
      timestamp,
      note,
    })
      .then((response) => {
        console.log(response);
        setTitle('');
        setUrl('');
        setTimestamp('');
        setNote('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <section className="container">
        <form id="notesForm">
          <div className="form-group">
            <label htmlFor="course-name">Course Name</label>
            <input
              className="form-control"
              aria-describedby="course-name"
              name="course-name"
              id="course-name"
              type="text"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="video-name">Video Name</label>
            <input
              className="form-control"
              aria-describedby="video-name"
              name="video-name"
              id="video-name"
              type="text"
              value={videoName}
              onChange={(event) => setVideoName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              name="url"
              className="form-control"
              aria-describedby="titleHelp"
              id="url"
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timestamp">Timestamp</label>
            <input
              className="form-control"
              aria-describedby="titleHelp"
              name="timestamp"
              id="timestamp"
              type="text"
              value={timestamp}
              onChange={(event) => setTimestamp(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note">Note</label>
            <textarea
              name="note"
              className="form-control"
              id="note"
              rows="3"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
          <button className="btn btn-info" id="submit" onClick={submit}>
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default NoteForm;
