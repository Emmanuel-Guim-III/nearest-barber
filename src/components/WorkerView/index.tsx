import { Worker } from '../WorkersMarkers';

export function WorkerView({ data }: { data: Worker }) {
  const { firstName, lastName, gender, worksAccomplished, rating } = data;

  return (
    <div className="bg-gray-100">
      <h1>
        {firstName} {lastName}
      </h1>
      <p>Gender: {gender}</p>
      <p>Works Accomplished: {worksAccomplished}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}
