import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <Header currentUser={currentUser} />
        </div>
      </header>
      <main className="app-content">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>

      <style jsx global>{`
        html,
        body {
          min-height: 100%;
          margin: 0;
          padding: 0;
          background: #f4f7fb;
        }

        body {
          background: linear-gradient(180deg, #edf2fb 0%, #f8fafc 100%);
        }

        * {
          box-sizing: border-box;
        }

        a {
          text-decoration: none;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }

        .app-header {
          background: rgba(255, 255, 255, 0.96);
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 14px 50px rgba(15, 23, 42, 0.06);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }

        .app-header .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
        }

        .brand {
          font-size: 1.45rem;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0f172a;
        }

        .app-header .nav-link {
          color: #334155;
          margin-left: 1rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .app-header .nav-link:hover {
          color: #2563eb;
        }

        .app-content {
          flex: 1;
          padding: 3rem 0 4rem;
        }

        .hero-card,
        .form-card {
          background: #ffffff;
          border-radius: 1.5rem;
          padding: 2.25rem;
          box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(15, 23, 42, 0.08);
        }

        .hero-card {
          max-width: 980px;
          margin: 0 auto;
        }

        .hero-card h1,
        .form-card h1 {
          font-size: clamp(2rem, 2.2vw, 3rem);
          line-height: 1.05;
          margin-bottom: 1rem;
          color: #0f172a;
        }

        .hero-card p,
        .form-card p {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 1.75rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .btn-primary {
          border-radius: 999px;
          padding: 0.95rem 1.7rem;
          font-weight: 600;
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          border: none;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
        }

        .btn-outline-primary {
          border-radius: 999px;
          padding: 0.95rem 1.7rem;
          font-weight: 600;
          color: #2563eb;
          border-color: #2563eb;
          background: transparent;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .btn-outline-primary:hover {
          background: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
        }

        .form-card {
          max-width: 460px;
          margin: 0 auto;
        }

        .form-group label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 0.45rem;
          display: inline-block;
        }

        .form-control {
          border-radius: 0.95rem;
          border: 1px solid rgba(148, 163, 184, 0.35);
          background: #f8fafc;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .form-control:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.15);
          background: #ffffff;
        }

        .form-card .btn {
          width: 100%;
          padding: 0.95rem 1.2rem;
        }

        .errors {
          margin-top: 1rem;
          padding: 1rem 1rem;
          border-radius: 1rem;
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        @media (max-width: 768px) {
          .app-content {
            padding: 2rem 1rem 3rem;
          }
          .app-header .container {
            flex-wrap: wrap;
            justify-content: center;
          }
          .app-header .nav-link {
            margin-left: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
