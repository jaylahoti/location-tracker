import React, { Component } from 'react';
import SideBar from './components/SideBar';
import MapContainer from './components/Map';
import Loader from 'react-loader-spinner';
import * as AuthenticateAPI from './api-service';

export default class App extends Component {

  constructor(props){
    super(props);
      this.state = {
        persons: "",
        name: "",
        location: null,
        liveLocation: null,
        loading: false
      };
  }

  componentDidMount() {
    AuthenticateAPI.onAuthenticate("https://route.freshvnf.com/delivery_details/live_data")
    .then((res)=>{
      this.setState({ liveLocation: res.live_location });
    })
    AuthenticateAPI.onAuthenticate("https://freshvnf-api.firebaseio.com/tracked-locations.json?shallow=true")
    .then((res)=>{
      const personkey = Object.keys(res)
      this.setState({ persons: personkey });
    })
  }

  getName = (id, value)=>{
    this.setState({[id]:value}, () => this.trackLocation())
  }

  trackLocation = () =>{
    const { name } = this.state
    if(name !== "AllBoys"){
      this.setState({ loading: true }, () => {
        AuthenticateAPI.onAuthenticate("https://freshvnf-api.firebaseio.com/tracked-locations/" + name + ".json")
        .then((res)=>{
          this.setState({ loading: false, location: res });
        })
      })
    }else{
      this.setState({ location: null });
    }
  }

  render(){
    const { persons, name, location, liveLocation, loading } = this.state;
    return (
      <div className="container">
        <SideBar person={persons} getName={this.getName}/>
        { loading ?
          <div className="loader-sub">
            <Loader type="RevolvingDot" color="#00BFFF"
             height="80"
             width="80"/>
           </div>
           :
           <MapContainer
           deliveryBoyName={name}
           coordinates={location}
           liveData={liveLocation}/>
         }
      </div>
    );
  }
}
