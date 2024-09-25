import { useState } from 'react';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: "this is title 1" },
    { id: 2, title: "this is title 2" }
  ]);
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(null);

  let formSubmit = (event) => {
    event.preventDefault();

    if (input.trim() === "") {
      alert("title is required");
    } else {
      edit ? upgradeData() : createNote();
    }
  };

  let dlt = (delId) => {
    let newNotes = notes.filter((note) => note.id !== delId);
    setNotes(newNotes);
  };

  let editData = (noteObj) => {
    setEdit(true);
    setUpdate(noteObj);
    setInput(noteObj.title);
  };

  let createNote = () => {
    let newNote = {
      id: notes.length + 1,
      title: input
    };
    setNotes([newNote, ...notes]);
    setInput('');
  };

  let upgradeData = () => {
    if (!update.id || !input) {
      console.error("update.id or input is undefined or null");
      return;
    }

    const upgradedNotes = notes.map((item) => {
      if (item.id === update.id) {
        return { ...item, title: input }; // Update the title
      }
      return item;
    });

    setNotes(upgradedNotes);
    setEdit(false);
    setInput('');
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className='card-header'>
                <h5>Title</h5>
              </div>
              <div className="card-body">
                <form action="" onSubmit={formSubmit}>
                  <input
                    type="text"
                    placeholder='title'
                    className='form-control my-3'
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                  />
                  <button type='submit' className='btn btn-primary w-100'>{edit ? "Update" : "Submit"}</button>
                </form>
              </div>
            </div>

          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header">
                <h5>List</h5>
              </div>
              <div className="card-body">
                <ul style={{ listStyle: 'none' }} className='p-0'>
                  {
                    notes.map((note, index) => {
                      return (
                        <li key={index} className='alert alert-primary d-flex justify-content-between'>
                          <span>{note.title}</span>
                          <div className="d-flex btn-group">
                            <button className='btn btn-outline-primary' onClick={() => { editData(note) }}>Edit</button>
                            <button className='btn btn-danger' onClick={() => { dlt(note.id) }}>Delete</button>
                          </div>
                        </li>
                      )
                    })
                  }

                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default App;