import React, { useState } from 'react';

function JobForm() {
  const [formData, setFormData] = useState({
    Job_ID: '',
    Job_Desc: '',
    Due_Date: '',
    Address_: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Form submitted with data: ${JSON.stringify(formData)}`);
    // You can also handle form submission logic here, like sending data to an API
  };

  return (
    <form onSubmit={handleSubmit}><div><label htmlFor="Job_ID">Job ID:</label><input
          type="number"
          id="Job_ID"
          name="Job_ID"
          value={formData.Job_ID}
          onChange={handleChange}
          required
        /></div><div><label htmlFor="Job_Desc">Job Description:</label><input
          type="text"
          id="Job_Desc"
          name="Job_Desc"
          value={formData.Job_Desc}
          onChange={handleChange}
          required
        /></div><div><label htmlFor="Due_Date">Due Date:</label><input
          type="date"
          id="Due_Date"
          name="Due_Date"
          value={formData.Due_Date}
          onChange={handleChange}
          required
        /></div><div><label htmlFor="Address_">Address:</label><input
          type="text"
          id="Address_"
          name="Address_"
          value={formData.Address_}
          onChange={handleChange}
          required
        /></div><button type="submit">Submit</button></form>
  );
}

export default JobForm;
