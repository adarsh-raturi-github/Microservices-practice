import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <section className="form-card">
      <h1>Create an account</h1>
      <p className="mb-4 text-muted">
        Sign up to start creating and managing events instantly.
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-4">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group mb-4">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Choose a secure password"
          />
        </div>
        {errors && <div className="errors">{errors}</div>}
        <button className="btn btn-primary mt-4">Sign Up</button>
      </form>
    </section>
  );
};
