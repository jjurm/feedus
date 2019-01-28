import React, { Component } from "react";
import { Media, Image, Card, Heading, Content, Columns } from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import restaurant from "./../../img/restaurant.jpg";
import bumpkin from "./../../img/bumpkin.jpg";
import coffee from "./../../img/coffee.jpg";

class RestaurantComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: ""
      };
  }

  
  render() {
    let r1 = this.props.restaurants[0];
    let r2 = this.props.restaurants[1];
    let r3 = this.props.restaurants[2];
    
    return (
        <Columns>
        <Columns.Column>
        <Card>
            <Card.Content>
            <Media>
            <Media.Item renderAs="figure" position="left">
                <Image renderAs="p" alt="64x64" size={128} src={restaurant} />
            </Media.Item>
            <Media.Item>
                <Heading size={4}>{r1.name}</Heading>
                <Heading subtitle size={6}>
                {r1.web}<br/>
                {r1.address1}<br/>
                {r1.address2}<br/>
                </Heading>
            </Media.Item>
            </Media>
            <Content>
            {r1.open}<br/>  
            </Content>
            </Card.Content>   
            </Card>
        </Columns.Column>
        <Columns.Column>
        <Card>
            <Card.Content>
            <Media>
            <Media.Item renderAs="figure" position="left">
                <Image renderAs="p" alt="64x64" size={128} src={bumpkin} />
            </Media.Item>
            <Media.Item>
                <Heading size={4}>{r2.name}</Heading>
                <Heading subtitle size={6}>
                {r2.web}<br/>
                {r2.address1}<br/>
                {r2.address2}<br/>
                </Heading>
            </Media.Item>
            </Media>
            <Content>
            {r2.open}<br/>  
            </Content>
            </Card.Content>   
            </Card>
        </Columns.Column>
        <Columns.Column>
        <Card>
            <Card.Content>
            <Media>
            <Media.Item renderAs="figure" position="left">
                <Image renderAs="p" alt="64x64" size={128} src={coffee} />
            </Media.Item>
            <Media.Item>
                <Heading size={4}>{r3.name}</Heading>
                <Heading subtitle size={6}>
                {r3.web}<br/>
                {r3.address1}<br/>
                {r3.address2}<br/>
                </Heading>
            </Media.Item>
            </Media>
            <Content>
            {r3.open}<br/> 
            </Content>
            </Card.Content>   
            </Card>
        </Columns.Column>
        </Columns>
    );
  }
}
export default RestaurantComponent;