import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'
function Map({searchResults}) {
    const [selectedLocation,setSelectedLocation] = useState({});
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates);

    const [viewport, setViewport] =useState({
        width:'100%',
        height:'100%',
        latitude: center.latitude,
        longitude:center.longitude,
        zoom:11
    })
    return (
        <ReactMapGL
            mapStyle="mapbox://styles/beckem/cksk7kdtc0mll17qvltse85z4"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role="img"
                            className="cursor-pointer text-2xl hover:animate-bounce"
                            onClick={()=>setSelectedLocation(result)}
                            aria-label="push-bin"
                        >📌</p>
                    </Marker>

                    {selectedLocation.long === result.long ?(
                        <Popup
                            onClose={()=>setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):(false)}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map
