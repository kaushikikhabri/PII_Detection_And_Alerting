import React, { useState } from "react";
import "./Form.css";

function FormComponent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setFormData({
        ...formData,
        file: file,
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "Please upload a valid PDF or image file.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    let validationErrors = {};
    if (!formData.firstName)
      validationErrors.firstName = "First name is required";
    if (!formData.lastName) validationErrors.lastName = "Last name is required";
    if (!formData.phoneNumber)
      validationErrors.phoneNumber = "Phone number is required";
    if (!formData.address) validationErrors.address = "Address is required";
    if (!formData.file) validationErrors.file = "File upload is required";

    setErrors(validationErrors);

    // If there are no validation errors, send data to the backend
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObj = new FormData();
        formDataObj.append("firstName", formData.firstName);
        formDataObj.append("lastName", formData.lastName);
        formDataObj.append("phoneNumber", formData.phoneNumber);
        formDataObj.append("address", formData.address);
        formDataObj.append("file", formData.file);

        const response = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formDataObj,
        });

        if (response.ok) {
          setSuccessMessage("Form submitted successfully!");
          // Clear form after successful submission
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            file: null,
          });
        } else {
          console.error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <span className="error-text">{errors.firstName}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <span className="error-text">{errors.lastName}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <span className="error-text">{errors.phoneNumber}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error-text">{errors.address}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="file">Upload PDF/Image</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf,image/*"
          onChange={handleFileChange}
        />
        {errors.file && <span className="error-text">{errors.file}</span>}
      </div>

      <button type="submit">Submit</button>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default FormComponent;
