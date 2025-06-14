import React, { useRef } from "react";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          ref={emailRef}
          className="input input-sm border rounded"
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          className="input input-sm border rounded"
        />
      </div>

      <button type="submit" className="btn btn-sm rounded">
        Login
      </button>
    </form>
  );
}
