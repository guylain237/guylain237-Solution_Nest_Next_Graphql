import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-4">Bienvenue ...</h1>
        <div className="d-flex gap-3">
          <Link href="/person">
            <button className="btn btn-outline-success">
              Liste des personnes
            </button>
          </Link>
          <Link href="/animal">
            <button className="btn btn-outline-success">
              Liste des animaux
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
