
import { useContext } from "react";
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { TAuth } from "../hooks/useAuth";
export function Home() {
  const { currentUser }: TAuth = useContext(AuthContext) as TAuth;
  let navigate = useNavigate();

  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Welcome to my blog!</h1>
          <p className="lead text-muted">Something short and leading about
            the collection below—its contents, the creator, etc. Make it
            short and sweet, but not too short so folks don’t simply skip
            over it entirely.</p>
          <p>
            {currentUser ? (<Button onClick={() => navigate('/game')}>
              Play Now
            </Button>) : null}
          </p>
        </div>
      </div>
    </section>
  );
}