import {
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { WorkerList } from '../Worker/WorkerList.tsx';
import { Worker, WorkerView } from '../Worker/WorkerView.tsx';
import { WorkersMarkers } from '../Worker/WorkersMarkers.tsx';
import { workers } from '../mockData.tsx';
import { CurrentLocationButton } from './CurrentLocationButton.tsx';
import { MapSearchbar } from './MapSearchbar.tsx';
import { G_MAPS_API_KEY } from './mapConfig.tsx';

export function MyMap() {
  const [center, setCenter] = useState({
    lat: 12.9202,
    lng: 124.1228,
  });

  const [zoom, setZoom] = useState(15);

  const [workerToInspect, setWorkerToInspect] = useState<Worker | null>(null);
  const [workersWithinBound, setWorkersWithinBound] = useState<Worker[]>([]);

  useEffect(() => {
    console.log(workerToInspect);
  }, [workerToInspect]);

  const handleBoundsChanged = (e: MapCameraChangedEvent) => {
    const { bounds } = e.detail;

    const withinBounds = workers.filter((worker) => {
      const { lat, lng } = worker.coordinates;

      return (
        lat >= bounds.south &&
        lat <= bounds.north &&
        lng >= bounds.west &&
        lng <= bounds.east
      );
    });

    setWorkersWithinBound(withinBounds);
  };

  return (
    <APIProvider apiKey={G_MAPS_API_KEY}>
      <Map
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
        defaultCenter={center}
        center={center}
        zoom={zoom}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
        onCenterChanged={(e) =>
          setCenter({ lat: e.detail.center.lat, lng: e.detail.center.lng })
        }
        onZoomChanged={(e) => setZoom(e.detail.zoom)}
      >
        <MapSearchbar onRecenter={setCenter} />

        <WorkersMarkers
          workersList={workers}
          onInspectWorker={setWorkerToInspect}
        />

        {workerToInspect && (
          <InfoWindow
            position={workerToInspect?.coordinates}
            onClose={() => setWorkerToInspect(null)}
          >
            <WorkerView data={workerToInspect} />
          </InfoWindow>
        )}

        <CurrentLocationButton
          onRecenter={(coords) => {
            setCenter(coords);
            setZoom(15);
          }}
        />

        {workersWithinBound.length > 0 && (
          <WorkerList data={workersWithinBound} />
        )}
      </Map>
    </APIProvider>
  );
}
