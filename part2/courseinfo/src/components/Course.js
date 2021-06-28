import Part from "./Part";

const Course = ({ course }) => {
  const { name, parts } = course;

  const totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <section className="course">
      <h2>{name}</h2>
      <section className="content">
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
        <b>total of {totalExercises} exercises</b>
      </section>
    </section>
  );
};

export default Course;
