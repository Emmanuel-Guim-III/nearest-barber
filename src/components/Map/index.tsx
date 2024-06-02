import {
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { WorkerList } from '../Worker/WorkerList.tsx';
import { Worker, WorkerView } from '../Worker/WorkerView.tsx';
import { WorkersMarkers } from '../Worker/WorkersMarkers.tsx';
import { workers } from '../mockData.tsx';
import { CurrentLocationButton } from './CurrentLocationButton.tsx';
import { MapNavigationButtons } from './MapNavigationButtons.tsx';
import { MapSearchbar } from './MapSearchbar.tsx';
import { MapZoomButtons } from './MapZoomButtons.tsx';
import { G_MAPS_API_KEY } from './mapConfig.tsx';

export function MyMap() {
  const [center, setCenter] = useState({
    lat: 12.9202,
    lng: 124.1228,
  });

  const [zoom, setZoom] = useState(15);
  const [workerToInspect, setWorkerToInspect] = useState<Worker | null>(null);
  const [workersWithinBound, setWorkersWithinBound] = useState<Worker[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleRecenter = ({ lat, lng }: { lat: number; lng: number }) => {
    setCenter((prevCenter) => ({
      lat: prevCenter.lat + lat,
      lng: prevCenter.lng + lng,
    }));
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => prevZoom - 1);
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
        onDragstart={() => setIsDragging(true)}
        onDragend={() => setIsDragging(false)}
      >
        <MapSearchbar onRecenter={setCenter} />

        {!isDragging && (
          <WorkersMarkers
            workersList={workers}
            onInspectWorker={setWorkerToInspect}
          />
        )}

        {workerToInspect && (
          <InfoWindow
            position={workerToInspect?.coordinates}
            onClose={() => setWorkerToInspect(null)}
          >
            <WorkerView data={workerToInspect} />
          </InfoWindow>
        )}

        <MapNavigationButtons onRecenter={handleRecenter} />

        <CurrentLocationButton
          onRecenter={(coords) => {
            setCenter(coords);
            setZoom(15);
          }}
        />

        <MapZoomButtons onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />

        {workersWithinBound.length > 0 && (
          <WorkerList data={workersWithinBound} />
        )}
      </Map>
    </APIProvider>
  );
}
