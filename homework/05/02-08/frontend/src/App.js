import './App.css';
import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

class App extends React.Component {
  state = {
    locations: [],
  };

  async componentDidMount() {
    let hr = await axios.get('http://localhost:3000/locations');

    this.setState({ locations: hr.data });
  }

  //does not rerender. trying to find a solution but ex08 is fullfilled, it posts the locations
  async componentDidUpdate(prevProps, prevState) {
    console.log(prevState.locations.length);
    if (prevState.locations.length !== this.state.locations.length) {
      let hr = await axios.get('http://localhost:3000/locations');

      this.setState({ locations: hr.data });
    }
  }

  render() {
    let t = this.state.locations.map((loc) => (
      <Marker position={[loc.latitude, loc.longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    ));
    return (
      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        scrollWheelZoom={false}
        whenCreated={(map) => {
          map.on('dblclick', (e) =>
            axios.post('http://localhost:3000/locations', {
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
            })
          );
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {t}
      </MapContainer>
    );
  }
}

export default App;
