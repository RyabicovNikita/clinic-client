import "./Main.scss";
import { Header } from "../Header/Header";
import { useActionState, useEffect, useState } from "react";
import { addComplaint } from "../../api/api";
import { useError } from "../../hooks";
import { DateTime } from "luxon";
import { getCookieToken } from "../../service";
import { useNavigate } from "react-router";

export const MainPage = () => {
  const [successfulMsg, setSuccessfullMsg] = useState(null);
  const [state, formAction, isPending] = useActionState(handleAction, { email: null, password: null });
  const { error, setError } = useError();
  const navigate = useNavigate();

  async function handleAction(prevState, formData) {
    const fullName = formData.get("fullName");
    const phone = formData.get("phone");
    const problem = formData.get("problem");
    const curDate = DateTime.now().toISODate();
    const res = await addComplaint(fullName, phone, problem, curDate);
    if (res.error) setError(res.error);
    else {
      setError(null);
      setSuccessfullMsg("Обращение было успешно отправлено!");
    }
  }

  useEffect(() => {
    const token = getCookieToken();
    if (token) navigate("/complaints");
  }, []);

  return (
    <>
      <Header />
      <div className="main mt-5">
        <main className="d-flex flex-column align-items-center">
          <h1 className="mb-5">Запись к врачу</h1>
          <form className="border border rounded-3 p-3" action={formAction}>
            {error || successfulMsg ? (
              <div class={`alert alert-${error ? "danger" : "success"}`} role="alert">
                {error || successfulMsg}
              </div>
            ) : null}
            <div class="mb-3">
              <label for="inputFIO" class="form-label">
                ФИО
              </label>
              <input name="fullName" class="form-control" id="inputFIO" />
            </div>
            <div class="mb-3">
              <label for="inputPhone" class="form-label">
                Номер телефона
              </label>
              <input name="phone" class="form-control" id="inputPhone" aria-describedby="phone-help" />
              <div id="phone-help" class="form-text">
                '8-999-333-222-11'
              </div>
            </div>
            <div class="mb-3">
              <label for="inputProblem" class="form-label">
                Опишите свою проблему
              </label>
              <textarea name="problem" class="form-control" id="inputProblem" />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary" style={{ width: "150px" }} disabled={isPending}>
                Submit
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};
