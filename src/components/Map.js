import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Polyline} from 'google-maps-react';
import customIcon from '../assets/icon.png';
import customIconPin from '../assets/pin.png';
import Loader from 'react-loader-spinner';

export class MapContainer extends Component {
  render(){
    const { deliveryBoyName, coordinates, liveData } = this.props;
    const style = {
      width: '80%',
      height: '100%'
    }
    let iconMarker = new window.google.maps.MarkerImage(
                    customIcon,
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new window.google.maps.Size(15, 15)
                );
    let iconMarkerAll = new window.google.maps.MarkerImage(
                    customIconPin,
                    null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new window.google.maps.Size(15, 15)
                );

    let triangleCoords = [];
    if(coordinates){
      coordinates.map((location)=>{
        triangleCoords.push({lat: location.lat, lng: location.lng})
      })
    }
    const arrow = {
      path: 'M 0,0 1,4 -1,4 0,0 z', // 0,0 is the tip of the arrow
      fillColor: 'red',
      fillOpacity: 1.0,
      strokeColor: 'black',
      strokeWeight: 1,
    };
    if(!liveData){
      return (<div className="loader">
      <Loader type="RevolvingDot" color="#00BFFF"
         height="80"
         width="80"/>
      </div>);
    }
    return(
      <div className="map">
          <Map google={this.props.google}
          options={{
                mapTypeControl: false,
                panControl: false,
                rotateControl: false,
                fullscreenControl: false
              }}
               zoom={11}
               style={style}
               initialCenter={{
                lat: 19.0760,
                lng: 72.8777
              }}
              disableDefaultUI
          >
            { coordinates ? (coordinates.map((loc, index)=> {
                return (
                    <Marker
                      title={deliveryBoyName + "\nTime : " + new Date(loc.time)}
                      key={loc.index}
                      position={{lat: loc.lat, lng: loc.lng}}
                      icon={iconMarker}
                    />
                )
              })) : (liveData.map((loc)=> {
                  return (
                      <Marker
                        title={Object.keys(loc)[0] + "\nTime : " + new Date(Object.values(loc)[0].time)}
                        key={Object.keys(loc)[0]}
                        position={{lat: Object.values(loc)[0].lat, lng: Object.values(loc)[0].lng}}
                        icon={iconMarkerAll}
                      />
                  )
                }))
              }

              { triangleCoords.length > 0 ?
                  <Polyline
                    path={triangleCoords}
                    strokeColor="Red"
                    strokeOpacity={0.3}
                    strokeWeight={2}
                    icons = {[{
                      icon: arrow,
                      offset: '100%',
                      repeat: '100px'
                    }]}
                  /> : <div></div>
              }
          </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBu5nZKbeK-WHQ70oqOWo-_4VmwOwKP9YQ")
})(MapContainer)
