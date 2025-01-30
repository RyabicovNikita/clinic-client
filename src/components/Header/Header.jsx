import { Link } from "react-router";

export const Header = () => (
  <header className="w-100 p-3 position-absolute top-0">
    <nav className="d-flex justify-content-end">
      <Link to={"/login"} className="btn btn-primary">
        Я сотрудник
      </Link>
    </nav>
  </header>
);
