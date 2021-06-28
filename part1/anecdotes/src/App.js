import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectRandomAnecdote = () => {
    let randomSelection = Math.floor(Math.random() * anecdotes.length);
    while (randomSelection === selected) {
      randomSelection = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomSelection);
  };

  const voteSelectedAnecdote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const mostVotes = votes.reduce((acc, value) => Math.max(acc, value));

  const anecdoteWithMostVotes =
    anecdotes[votes.findIndex((n) => n === mostVotes)];

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={voteSelectedAnecdote}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>
        {anecdoteWithMostVotes} ({mostVotes} votes)
      </p>
    </div>
  );
};
export default App;
