import React, { useState, useEffect } from "react";
//  on creation and due date
const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_URL}/job`)
      .then((response) => response.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Job Number</th>
          <th>Job Description</th>
          <th>Location</th>
          <th>Creation Date</th>
          <th>Due Date</th>
        </tr>
        {jobs.map((job) => {
          return (
            <tr>
              <td>{job.Job_ID}</td>
              <td>{job.Job_Desc}</td>
              <td>{job.Address_}</td>
              <td>{job.Creation_Date.substring(0, 10)}</td>
              <td>{job.Due_Date.substring(0, 10)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default JobList;
