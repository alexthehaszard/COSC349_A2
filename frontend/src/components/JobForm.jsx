import React, { useState } from "react";
import "./JobForm.css";

function JobForm() {
  const initialFormData = {
    jobid: "",
    jobdesc: "",
    duedate: "",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/job", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If the form submission is successful, clear the form
        setFormData(initialFormData);
        console.log("Form submitted and cleared");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("error occurred:", error);
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="jobid">Job ID (optional):</label>
        <input
          type="number"
          id="jobid"
          name="jobid"
          value={formData.jobid}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="jobdesc">Job Description:</label>
        <input
          type="text"
          id="jobdesc"
          name="jobdesc"
          value={formData.jobdesc}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="duedate">Due Date:</label>
        <input
          type="date"
          id="duedate"
          name="duedate"
          value={formData.duedate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default JobForm;
