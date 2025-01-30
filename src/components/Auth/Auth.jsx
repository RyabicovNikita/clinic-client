import { useActionState, useEffect, useLayoutEffect, useState } from "react";
import { loginUser } from "../../api/api";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export const Auth = () => {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(handleAction, { email: null, password: null });
  const [cookies, setCookie, removeCookie] = useCookies([]);

  async function handleAction(prevState, formData) {
    const email = formData.get("email");
    const pass = formData.get("password");
    const res = await loginUser(email, pass, setCookie);
    if (res.error) {
      setServerError(res.error);
      return;
    }
    navigate("/complaints");
  }

  return (
    <form className="border border rounded-3 p-3 w-50" action={formAction}>
      {serverError && (
        <div class="alert alert-danger" role="alert">
          {serverError}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Адрес электронной почты
        </label>
        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Пароль
        </label>
        <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        Отправить
      </button>
    </form>
  );
};
