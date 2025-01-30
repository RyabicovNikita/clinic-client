import { useParams } from "react-router";
import { HistoryCard } from "./components/Card";

export const TestHistory = () => {
  const { id: testID } = useParams();
  const historyJSON = localStorage.getItem("history");
  if (!historyJSON) return null;
  const history = JSON.parse(historyJSON)?.[testID];
  return (
    <div className="test__history">
      <h2 className="test__history__header">История прохождений</h2>
      {history.map((hData) => (
        <HistoryCard data={hData} />
      ))}
    </div>
  );
};
