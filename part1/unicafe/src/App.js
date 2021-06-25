import { useState } from "react";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveGoodFeedback = () => setGood(good + 1);
  const giveNeutralFeedback = () => setNeutral(neutral + 1);
  const giveBadFeedback = () => setBad(bad + 1);

  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(2);
  const positive = (good / total).toFixed(2) + "%";

  return (
    <>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <Button text={"good"} handleClick={giveGoodFeedback} />
      <Button text={"neutral"} handleClick={giveNeutralFeedback} />
      <Button text={"bad"} handleClick={giveBadFeedback} />
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <Statistic text={"good"} value={good} />
            <Statistic text={"neutral"} value={neutral} />
            <Statistic text={"bad"} value={bad} />
            <Statistic text={"average"} value={average} />
            <Statistic text={"positive"} value={positive} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;
