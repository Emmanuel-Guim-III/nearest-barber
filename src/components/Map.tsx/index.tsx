import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { G_MAPS_API_KEY } from './mapConfig'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

export function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'main-map',
    googleMapsApiKey: G_MAPS_API_KEY,
  })

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}
