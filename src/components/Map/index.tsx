import {
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { MapActionButtons } from '../MapActionButtons.tsx';
import { WorkerView } from '../WorkerView/index.tsx';
import { Worker, WorkersMarkers } from '../WorkersMarkers/index.tsx';
import { G_MAPS_API_KEY } from './mapConfig.tsx';
import { workers } from './mockData.tsx';

export function MyMap() {
  const [center, setCenter] = useState({
    lat: 12.9202,
    lng: 124.1228,
  });

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

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error get user location: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  };

  return (
    <APIProvider apiKey={G_MAPS_API_KEY}>
      <Map
        style={{ width: '100vw', height: '100vh', position: 'relative' }}
        defaultCenter={center}
        center={center}
        defaultZoom={15}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
        onCenterChanged={(e) =>
          setCenter({ lat: e.detail.center.lat, lng: e.detail.center.lng })
        }
      >
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

        <MapActionButtons
          onCurrentLocationClick={getUserLocation}
          total={workersWithinBound.length}
        />
      </Map>
    </APIProvider>
  );
}
