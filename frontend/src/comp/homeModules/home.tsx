
import { useContext } from "react";
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { authType } from "../../hooks/types/authType";
export function Home(): JSX.Element {
  const { currentUser }: authType = useContext(AuthContext) as authType;
  let navigate = useNavigate();

  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">Welcome {currentUser.name ? currentUser.name : 'Guest'} to my Wrodle!</h1>
          <p>
            <Button onClick={() => navigate('/game')}>
              Play Now
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}