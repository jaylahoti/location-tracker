import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export default class SideBar extends Component {

  constructor(props){
    super(props)

    this.state = {
      classActive : "",
      classAll : "active",
      setName: ""
    }
  }

  traceLocation = (name)=> {
    this.props.getName('name', name)
    this.setState({setName: name})
    if(name === "AllBoys"){
      this.setState({classAll: "active", classActive: ""})
    }else{
      this.setState({classAll: "", classActive: "active"})
    }
  }

  render(){
    const { person } = this.props;
    const { classActive, classAll, setName } = this.state;
    return(
      <div className="side-bar">
        <div className={`square_btn ${classAll}`}
          onClick={() => this.traceLocation("AllBoys")}>All Delivery Boys</div>
        { person ? (
            person.map((name)=>{
              return(
                <div className={`square_btn ${name === setName ? classActive : ""}`}
                  onClick={() => this.traceLocation(name)} key={name}>{name}</div>
              )
            })
          ) : <div className="side-loader">
                <Loader type="Puff" color="#00BFFF"
                  height="40"
                  width="40"/>
              </div>
        }
      </div>
    )
  }
}
