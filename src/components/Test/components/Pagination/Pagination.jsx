import { useContext } from "react";
import { TestContext } from "../../context";

export const Pagination = ({ curPage, setCurPage, onFinishTestClick }) => {
  const { questions } = useContext(TestContext);
  const isLastPage = curPage + 1 === questions.length;
  const isFirstPage = curPage === 0;
  const handleLastItemClick = () => {
    if (isLastPage) onFinishTestClick();
    else setCurPage((prevPage) => prevPage + 1);
  };
  return (
    <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <button
          className={`page-item ${isFirstPage ? "disabled" : ""}`}
          disabled={isFirstPage}
          onClick={() => setCurPage((prevPage) => prevPage - 1)}
        >
          <span className="page-link" href="#">
            Previous
          </span>
        </button>
        {questions.map((q, index) => (
          <li key={index} className="page-item" onClick={() => setCurPage(index)}>
            <span className="page-link" href="#">
              {index + 1}
            </span>
          </li>
        ))}
        <button className="page-item" onClick={handleLastItemClick}>
          <span className="page-link" href="#">
            {isLastPage ? "Finish" : "Next"}
          </span>
        </button>
      </ul>
    </nav>
  );
};
