interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: {
    name: string,
    exerciseCount: number
  }[];
}

interface TotalProps {
  courseParts: {
    exerciseCount: number
  }[];
}

const Header = (props: HeaderProps) => <h1>{props.courseName}</h1>;

const Content = (props: ContentProps) => {
  return (
    <p>
      {props.courseParts.map(part => <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
    </p>
  );
};

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;