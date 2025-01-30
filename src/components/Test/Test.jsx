import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTest } from "../../api";
import "./Test.scss";
import { TestActions, TestActive, TestEdit } from "./components";
import { STATUSES } from "./constants";
import { TestContext } from "./context";
import { TestHistory } from "./components/History";

const getContentByStatus = (status) => {
  switch (status) {
    case STATUSES.ACTIVE:
      return <TestActive />;
    case STATUSES.EDIT:
      return <TestEdit />;
    default:
      return (
        <>
          <TestActions />
          <TestHistory />
        </>
      );
  }
};

export const Test = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const [testStatus, setTestStatus] = useState(null);
  useEffect(() => {
    getTest(id).then((data) => setTestData(data));
  }, []);

  return (
    <div className="test">
      <h1 className="test__header">{testData?.title}</h1>
      <TestContext.Provider
        value={{
          setTestStatus: setTestStatus,
          setTestData: setTestData,
          testData: testData,
        }}
      >
        {getContentByStatus(testStatus)}
      </TestContext.Provider>
    </div>
  );
};
