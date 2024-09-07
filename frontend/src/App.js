import { useState } from "react";
import "./App.css";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="App">
      <h1>Job List Application</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Return to Job List" : "Add new job"}
      </button>
      {showForm ? (
        <JobForm setShowForm={setShowForm} /> // Pass setShowForm as a prop
      ) : (
        <JobList />
      )}
    </div>
  );
}

export default App;
