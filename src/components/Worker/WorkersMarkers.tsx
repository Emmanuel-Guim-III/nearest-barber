import { Marker } from '@vis.gl/react-google-maps';
import { Fragment } from 'react/jsx-runtime';
import { Worker } from './WorkerView';

type Props = {
  workersList: Worker[];
  onInspectWorker: (w: Worker) => void;
};

type WorkerMarkerProps = {
  data: Worker;
  onInspectWorker: (w: Worker) => void;
};

export function WorkersMarkers({ workersList, onInspectWorker }: Props) {
  const WorkerMarker = ({ data, onInspectWorker }: WorkerMarkerProps) => {
    const { lat, lng } = data.coordinates;
    const center = { lat, lng };

    return <Marker position={center} onClick={() => onInspectWorker(data)} />;
  };

  return workersList ? (
    <>
      {workersList.map((worker, i) => (
        <Fragment key={i}>
          <WorkerMarker data={worker} onInspectWorker={onInspectWorker} />
        </Fragment>
      ))}
    </>
  ) : null;
}
