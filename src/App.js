import React, { useState, Suspense } from 'react';
import NoteForm from './Pages/NoteForm';
const ViewAllNotes = React.lazy(() => import('./Pages/ViewAllNotes'));

const App = () => {
  const [index, setIndex] = useState(0);
  return (
    <div style={{ width: '400px', height: '540px' }}>
      <section className="text-center bg-info text-light py-2">
        <h3>Open Notes</h3>
      </section>
      <ul className="nav justify-content-center">
        <li className="nav-item" onClick={() => setIndex(0)}>
          <span
            style={{ cursor: 'pointer' }}
            className={
              index === 0 ? 'nav-link text-primary' : 'nav-link text-secondary'
            }
          >
            Create a note
          </span>
        </li>
        <li className="nav-item" onClick={() => setIndex(1)}>
          <span
            style={{ cursor: 'pointer' }}
            className={
              index === 1 ? 'nav-link text-primary' : 'nav-link text-secondary'
            }
          >
            See all notes
          </span>
        </li>
      </ul>
      {index === 0 ? (
        <NoteForm />
      ) : (
        <Suspense fallback={<div>Loading..</div>}>
          <ViewAllNotes />
        </Suspense>
      )}
    </div>
  );
};

export default App;
