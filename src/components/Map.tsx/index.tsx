import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
} from '@vis.gl/react-google-maps';
import { Fragment } from 'react';
import { G_MAPS_API_KEY } from './mapConfig';
import { workers } from './mockData';

export function MyMap() {
  // const [markerRef, marker] = useMarkerRef();

  // useEffect(() => {
  //   if (!marker) {
  //     return;
  //   }

  //   // do something with marker instance here
  // }, [marker]);

  const center = {
    lat: 12.9202,
    lng: 124.1228,
  };

  type Worker = {
    id: string;
    lat: number;
    lng: number;
  };

  const WorkerMarker = ({ data }: { data: Worker }) => {
    const { lat, lng } = data;
    const center = { lat, lng };

    return (
      <Marker
        // ref={markerRef}
        position={center}
        onDrag={(e) => console.log(e.latLng?.lat(), e.latLng?.lng())}
      />
    );
  };

  const WorkersMarkers = ({ workersList }: { workersList: Worker[] }) => {
    return workersList ? (
      <>
        {workersList.map((worker, i) => (
          <Fragment key={i}>
            <WorkerMarker data={worker} />
          </Fragment>
        ))}
      </>
    ) : null;
  };

  const handleBoundsChanged = (e: MapCameraChangedEvent) => {
    const { bounds } = e.detail;

    const withinBounds = workers.filter(
      (worker) =>
        worker.lat >= bounds.south &&
        worker.lat <= bounds.north &&
        worker.lng >= bounds.west &&
        worker.lng <= bounds.east
    );

    console.log(withinBounds);
  };

  return (
    <APIProvider apiKey={G_MAPS_API_KEY}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={center}
        defaultZoom={15}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
      >
        <WorkersMarkers workersList={workers} />
      </Map>
    </APIProvider>
  );
}
