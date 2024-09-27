import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
export default function NavBar() {
  return (
    <div>
      <nav className="navbar  navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" href="/">
            Accueil
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-center align-item-center"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav d-flex ">
              <Link
                href="/person"
                className="nav-link text-white btn btn-outline-success "
              >
                Liste des Personnes
              </Link>
              <Link
                href="/animal"
                className="nav-link text-white btn btn-outline-success "
              >
                Liste des Animaux
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
