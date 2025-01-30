import { useContext } from "react";
import { TestContext } from "../../context";
import { STATUSES } from "../../constants";
import { Link } from "react-router";

export const TestActions = () => {
  const { setTestStatus } = useContext(TestContext);

  return (
    <div className="test__actions">
      <div onClick={() => setTestStatus(STATUSES.ACTIVE)} className="test__start action">
        Запустить тест
      </div>
      <div onClick={() => setTestStatus(STATUSES.EDIT)} className="test__edit action">
        Редактировать тест
      </div>
      <Link to={"/"} className="test__edit action" style={{ textDecoration: "none", color: "black" }}>
        На главную
      </Link>
    </div>
  );
};
