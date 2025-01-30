export const HistoryCard = ({ data }) => {
  const { date: fullDate, answers, total } = data;
  const arrDate = fullDate.split("|");
  const date = arrDate[0];
  const time = arrDate[1];
  return (
    <div class="card">
      <div class="card-header d-flex flex-column justify-content-center">
        <span className="history-date"> {date}</span> <span className="history-time">{time}</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">{`${answers.filter((a) => a).length} из ${total}`}</h5>
        <span class="card-text">
          <div style={{ width: "400px", height: "50px", backgroundColor: "gray" }}>
            {answers.map((a) => (
              <div
                style={{
                  width: `${400 / answers.length || 1}`,
                  height: "inherit",
                  backgroundColor: a ? "green" : "red",
                }}
              ></div>
            ))}
          </div>
        </span>
      </div>
    </div>
  );
};
