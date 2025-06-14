import React, { useState } from "react";
import * as yup from "yup";

// Define Yup schema outside the component
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [formError, setFormError] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Clear the error for this field
    setFormError({
      ...formError,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(form, { abortEarly: false });
      setFormError({});
      console.log("Form submitted:", form);
      // Submit logic here
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormError(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
          className="input input-sm border rounded"
        />
        {formError.email && (
          <span className="text-xs text-red-800">{formError.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input input-sm border rounded"
        />
        {formError.password && (
          <span className="text-xs text-red-800">{formError.password}</span>
        )}
      </div>

      <button type="submit" className="btn btn-sm rounded">
        Login
      </button>
    </form>
  );
}
