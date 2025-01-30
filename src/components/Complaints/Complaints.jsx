import { useEffect, useState } from "react";
import { getComplaints } from "../../api/api";
import { getCookieToken } from "../../service";
import { Link, useNavigate } from "react-router";
import { DateTime } from "luxon";
import { useCookies } from "react-cookie";

export const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookieToken();
    getComplaints(token)
      .then((res) => {
        if (res.error) setServerError(res.error);
        else {
          setServerError(null);
          setComplaints(res.body);
        }
      })
      .catch((e) => setServerError(e?.error ?? "Серверная ошибка"));
  }, []);

  const handleLogoutClick = () => {
    removeCookie("token");
    navigate("/login");
  };

  return serverError ? (
    <div className="card">
      <div class="alert alert-danger" role="alert">
        {serverError}
      </div>
      <div className="d-flex justify-content-between p-3">
        <Link className="btn btn-primary" to={"/login"}>
          Login
        </Link>
        <Link className="btn btn-primary" to={"/"}>
          Main
        </Link>
      </div>
    </div>
  ) : (
    <div className="w-100  border border-2">
      <table class="table p-4">
        <thead>
          <tr>
            <th scope="col">Дата отправки</th>
            <th scope="col">ФИО</th>
            <th scope="col">Телефон</th>
            <th scope="col">Проблема</th>
          </tr>
        </thead>
        <tbody>
          {complaints?.map((i) => (
            <tr>
              <th scope="row">{i.date ? DateTime.fromISO(i.date).toFormat("dd.MM.yyyy") : ""}</th>
              <td>{i.fullName}</td>
              <td>{i.phone}</td>
              <td>{i.problem}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <div className="btn btn-primary m-2 w-25" onClick={handleLogoutClick}>
          Logout
        </div>
      </div>
    </div>
  );
};
