import React, { Component } from "react";
import { Section, Container, Columns, Media, Image } from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';

class RestaurantComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: ""
      };
  }
  render() {
    var url = "http://maps.google.com/?q=" +this.props.restaurant.name +"+"+ this.props.restaurant.postcode

    return (
        <div>
            <h1 className="title">Thank you for using feed.us!</h1>
            <h2 className="subtitle"><a href= url>You can find your restaurant of choice by clicking on this link.</a></h2>
        </div>
    );
  }
}
export default RestaurantComponent;