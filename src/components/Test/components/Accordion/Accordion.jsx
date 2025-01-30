import { useContext, useEffect, useState } from "react";
import { TestContext } from "../../context";
import { useParams } from "react-router";

const AccordionCard = ({ data }) => {
  const { id: questionID } = useParams();
  const [value, setValue] = useState(data.text);
  const [isRight, setIsRight] = useState(data.isRight);
  const { testData, setTestData } = useContext(TestContext);
  useEffect(() => {
    setValue(data.text);
    setIsRight(data.isRight);
  }, [data]);

  const handleTextAnswerChange = ({ target }) => {
    setValue(target.value);
    const curData = testData?.[questionID]?.answers;
    let newData = {};
    if (!curData) {
      newData = { ...testData, [questionID]: { answers: [{ ...data, text: target.value }] } };
    } else {
      const oldDataAnswerInd = curData.findIndex((i) => i._id === data._id);
      if (oldDataAnswerInd === -1) {
        curData.push({ ...data, text: target.value });
        newData = { ...testData, [questionID]: curData };
      } else {
        curData.splice(oldDataAnswerInd, 1, { ...curData[oldDataAnswerInd], text: target.value });
      }
    }
    setTestData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleCheckedAnswer = ({ target }) => {
    setIsRight(target.checked);
    const curData = testData?.[questionID];
    let newData = {};
    if (!curData) {
      newData = { ...testData, [questionID]: [{ ...data, isRight: target.checked }] };
    } else {
      const oldDataAnswerInd = curData.findIndex((i) => i._id === data._id);
      if (oldDataAnswerInd === -1) {
        curData.push({ ...data, isRight: target.checked });
        newData = { ...testData, [questionID]: curData };
      } else {
        curData.splice(oldDataAnswerInd, 1, { ...curData[oldDataAnswerInd], isRight: target.checked });
      }
    }
    setTestData((prevData) => ({ ...prevData, ...newData }));
  };
  console.log(testData);
  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-body">
          <div className="input-group mb-3">
            <div className="input-group-text gap-2">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                checked={isRight}
                onChange={handleCheckedAnswer}
                aria-label="Checkbox for following text input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </div>
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={handleTextAnswerChange}
              placeholder="Введите текст ответа..."
              aria-label="Text input with checkbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Accordion = ({ editData, setEditData }) => {
  const { testData, setTestData } = useContext(TestContext);
  const handleAddAnswer = (questionID) => {
    const questionsDeepCopy = JSON.parse(JSON.stringify(testData.questions));
    const questionInd = questionsDeepCopy.findIndex((q) => q._id === questionID);

    const { answers } = questionsDeepCopy[questionInd];
    answers.unshift({ text: "Новый вопрос", isRight: false });
    questionsDeepCopy[questionInd].answers = answers;
    console.log(questionsDeepCopy);
    setTestData((prevData) => ({ ...prevData, questions: questionsDeepCopy }));
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      {testData.questions.map(({ _id, title, answers }) => (
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#" + _id}
              aria-expanded="false"
            >
              {title}
            </button>
          </h2>
          <div id={_id} className="accordion-collapse collapse " data-bs-parent="#accordionFlushExample">
            <div className="d-flex align-center flex-column">
              <button className="btn border-black mt-2" onClick={() => handleAddAnswer(_id)}>
                <span>
                  {"Новый вариант ответа "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </span>
              </button>
            </div>

            <div className="accordion-body">
              {answers.map((answer) => (
                <AccordionCard data={answer} editData={editData} setEditData={setEditData} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
