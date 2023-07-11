import { courseParts, CoursePart } from "./types";

interface HeaderProps {
  courseName: string;
}

interface TotalProps {
  courseParts: {
    exerciseCount: number
  }[];
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface PartProps {
  part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Header = (props: HeaderProps) => <h1>{props.courseName}</h1>;

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <p><em>{props.part.description}</em></p>
          <br />
        </div>
      );
      break;
    case 'group':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <p>project exercises {props.part.groupProjectCount}</p>
          <br />
        </div>
      )
      break;
    case 'background':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <p><em>{props.part.description}</em></p>
          <p>background material here: {props.part.backgroundMaterial}</p>
          <br />
        </div>
      )
      break;
    case 'special':
      return (
        <div>
          <h3>{props.part.name} {props.part.exerciseCount}</h3>
          <p><em>{props.part.description}</em></p>
          <p> required skills: {props.part.requirements.map(requirement => requirement + ', ')}</p>
          <br />
      </div>
      )
    default:
      assertNever(props.part);
      break;
  }
  return <div></div>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {
        props.courseParts.map(part => <Part key={part.name} part={part} />)
      }
    </div>
  );
};

const Total = (props: TotalProps) => {
  return (
    <p>
      Total number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;