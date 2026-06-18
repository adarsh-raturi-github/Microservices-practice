import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return (
    <section className="hero-card">
      <div>
        <span className="text-uppercase text-primary fw-semibold mb-3 d-inline-block">
          Ticketing platform
        </span>
        <h1>Sell tickets easily and keep your event management smooth.</h1>
        <p>
          GitTix helps teams build, publish and track event tickets with a
          clean, fast interface. Sign in to manage orders or create your first
          event in seconds.
        </p>
        <div className="hero-actions">
          <a href="/auth/signup" className="btn btn-primary">
            Create account
          </a>
          <a href="/auth/signin" className="btn btn-outline-primary">
            Sign in
          </a>
        </div>
      </div>
      <div className="mt-5">
        <div
          className="p-4 rounded-3"
          style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}
        >
          <strong>Status:</strong>{" "}
          {currentUser ? "Signed in" : "Not signed in yet"}
        </div>
      </div>
    </section>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("LANDING PAGE!");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");

  return data;
};

export default LandingPage;
