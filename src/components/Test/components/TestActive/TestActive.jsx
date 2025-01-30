import { useContext, useState } from "react";
import { TestContext } from "../../context";
import "bootstrap/dist/css/bootstrap.css";
import "./TestActive.css";
import { Pagination } from "../Pagination/Pagination";
import { useParams } from "react-router";
import { DateTime } from "luxon";

export const TestActive = () => {
  const { id: testID } = useParams();
  const [userAnswers, setUserAnswers] = useState([]);
  const { setTestStatus, questions } = useContext(TestContext);
  const [curPage, setCurPage] = useState(0);

  const { _id: questionID, title, answers } = questions[curPage];

  const handleAnswerClick = (questionID, { _id, isRight }, userAnswer) => {
    let curAnswers = userAnswers[questionID]?.answers ?? {};
    curAnswers = { ...curAnswers, [_id]: isRight === userAnswer };

    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [questionID]: { answers: curAnswers } }));
  };
  const onFinishTestClick = () => {
    const answersResult = Object.values(userAnswers).map(({ answers }) => Object.values(answers).every((a) => a));
    const oldAnswersJSON = localStorage.getItem("history");
    let result = {};
    if (!oldAnswersJSON) {
      result = {
        [testID]: [
          {
            date: DateTime.now().toFormat("dd.LL.yyyy|HH:mm:ss"),
            answers: answersResult,
            total: questions.length,
          },
        ],
      };
    } else {
      const oldAnswers = JSON.parse(oldAnswersJSON);
      if (!oldAnswers[testID]) oldAnswers[testID] = [];
      oldAnswers[testID].push({
        date: DateTime.now().toFormat("dd.LL.yyyy|HH:mm:ss"),
        answers: answersResult,
        total: questions.length,
      });
      result = oldAnswers;
    }

    localStorage.setItem("history", JSON.stringify(result));
    setTestStatus(null);
  };
  return (
    <div className="container">
      <h2>{title}</h2>
      <ul className="list-group">
        {answers.map((answer) => (
          <li className="list-group-item d-flex" key={answer._id}>
            <input
              className="form-check-input me-1"
              type="checkbox"
              id={answer._id}
              onChange={({ target }) => handleAnswerClick(questionID, answer, target.checked)}
            />
            <label className="form-check-label ms-2 w-100" role="button" htmlFor={answer._id}>
              {answer.text}
            </label>
          </li>
        ))}
      </ul>
      <Pagination curPage={curPage} setCurPage={setCurPage} onFinishTestClick={onFinishTestClick} />
    </div>
  );
};
