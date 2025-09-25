import { MapContainer, TileLayer, CircleMarker, Tooltip, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { GENDER_COLORS } from "../constants/colors";
import './MapPage.css';

const MapPage = ({ data }) => {
    // { 'NY : 2, 'Seattle': 10}
    const usersByCity = data.reduce((acc, curr) => {
        let city = curr.address.city;
        if (!acc[city]) {
            acc[city] = { count: 0, lat: curr.address.coordinates.lat, lng: curr.address.coordinates.lng }
        }
        acc[city].count += 1
        return acc;
    }, {});

    const cityGroups = Object.entries(usersByCity).map(([city, info]) => ({ city, ...info }))

    const maleIcon = L.icon({
        iconUrl: 'https://img.icons8.com/?size=100&id=1814&format=png&color=000000',
        iconSize: [25, 25],
    });

    const femaleIcon = L.icon({
        iconUrl: 'https://img.icons8.com/?size=100&id=12140&format=png&color=000000',
        iconSize: [25, 25],
    });

    return (
        <div>
            <h1>Map View</h1>
            <MapContainer center={[0, 20]} zoom={2} scrollWheelZoom={false} className="map-container">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    data.map((item) => {
                        const markerColor = GENDER_COLORS[item.gender.toLowerCase()]

                        return (
                            // <CircleMarker
                            //     key={item.id}
                            //     center={[item.address.coordinates.lat, item.address.coordinates.lng]}
                            //     radius={8}
                            //     color={markerColor} // stroke color
                            //     fillColor={markerColor} // fill
                            //     fillOpacity={0.7}
                            //     icon={item.gender == 'male' ? maleIcon : femaleIcon}
                            // >
                            //     <Tooltip>
                            //         <strong>{item.firstName} {item.lastName}</strong>
                            //         <br />
                            //         {item.email}
                            //     </Tooltip>
                            // </CircleMarker>


                            <Marker
                                key={item.id}
                                position={[item.address.coordinates.lat, item.address.coordinates.lng]}
                                icon={item.gender == 'male' ? maleIcon : femaleIcon}
                            >
                                <Tooltip>
                                    <strong>{item.firstName} {item.lastName}</strong>
                                    <br />
                                    {item.email}
                                </Tooltip>
                            </Marker>
                        )
                    })
                }
            </MapContainer>

            <h1>By City</h1>
            <MapContainer center={[0, 20]} zoom={5} scrollWheelZoom={false} className="map-container">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    cityGroups.map((item, index) => {
                        return (
                            <Marker key={index} position={[item.lat, item.lng]}>
                                <Popup>
                                    Users in {item.city} - {item.count}
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </MapContainer>
        </div>
    );
};

export default MapPage;
