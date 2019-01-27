import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderComponent from "./HeaderComponent.jsx";
import QuestionComponent from "./QuestionComponent.jsx";
import SubmitComponent from "./SubmitComponent.jsx";
import BasicOptionsComponent from "./BasicOptionsComponent.jsx";
import starter from "./../../img/starter.svg";
import soup from "./../../img/soup.svg";
import main from "./../../img/main.svg";
import dessert from "./../../img/dessert.svg";
import asian from "./../../img/asian.svg";
import indian from "./../../img/indian.svg";
import french from "./../../img/french.svg";
import italian from "./../../img/italian.svg";
import fast from "./../../img/fast.svg";
import british from "./../../img/british.svg";
import openSocket from 'socket.io-client';

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {
      title: "feed.us",
      foodTypeItems: [
        {
            name: "Starter",
            image: starter,
            active: false
        },
        {
            name: "Soup",
            image: soup,
            active: false
        },
        {
            name: "Main",
            image: main,
            active: false
        },
        {
            name: "Dessert",
            image: dessert,
            active: false
        },
    ],
    foodCuisineItems: [
        {
            name: "Asian",
            image: asian,
            active: false
        },
        {
            name: "Indian",
            image: indian,
            active: false
        },
        {
            name: "Italian",
            image: italian,
            active: false
        },
        {
            name: "French",
            image: french,
            active: false
        },
        {
            name: "British",
            image: british,
            active: false
        },
        {
            name: "Fast",
            image: fast,
            active: false
        },
    ]
    
    };

    const socket = openSocket('https://' + document.domain + ':' + location.port + '/ws');
    socket.on('connect', function(msg) {
        console.log("socket connected!")
    });
    socket.on('menus', function (json){

    });
    this.lunch_id = location.pathname.slice(7);
    this.socket = socket;
  }

  onItemSelected = (optionsName, itemName) => {
    let options = this.state[optionsName];
    options.forEach(element => {
        if(element.name == itemName) {
            element.active = !element.active;
        }
    });

    this.setState({[optionsName]: options});
  }

  onSubmit = (submitName) => {
    if(submitName == "submitInitial") {
        console.log("Initial submission");
        console.log(this.state);
        var types = this.state.foodTypeItems
            .filter(function(type){return type.active})
            .map(function(type){return type.name});
        var cuisines = this.state.foodCuisineItems
            .filter(function(cuisine){return cuisine.active})
            .map(function(cuisine){return cuisine.name});
        var response = {
            lunch: this.lunch_id,
            types: types,
            cuisines: cuisines
        };
        this.socket.emit('get_pref_lunch', response)
    }
  }

  Basic = () => {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <QuestionComponent question="What do you fancy?" subtitle="Click multiple options"></QuestionComponent>
            <BasicOptionsComponent name="foodTypeItems" onItemSelected={this.onItemSelected} items={this.state.foodTypeItems}></BasicOptionsComponent>
            <QuestionComponent question="What cuisine do you like?" subtitle="Click multiple options"></QuestionComponent>
            <BasicOptionsComponent name="foodCuisineItems" onItemSelected={this.onItemSelected} items={this.state.foodCuisineItems}></BasicOptionsComponent>
            <SubmitComponent name="submitInitial" onSubmit={this.onSubmit}></SubmitComponent>
        </div>
    );
  }

  Vote = () => {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <QuestionComponent question="We picked based on your choices" subtitle="Vote for the best one of these"></QuestionComponent>
            <SubmitComponent name="submitVote" onSubmit={this.onSubmit}></SubmitComponent>
        </div>
    );
  }

  Final = () => {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <QuestionComponent question="Done :)" subtitle="Meet your friends and go for lunch to..."></QuestionComponent>
            <SubmitComponent name="submitVote" onSubmit={this.onSubmit}></SubmitComponent>
        </div>
    );
  }
  
  render() {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <QuestionComponent question="What do you fancy?" subtitle="Click multiple options"></QuestionComponent>
            <BasicOptionsComponent name="foodTypeItems" onItemSelected={this.onItemSelected} items={this.state.foodTypeItems}></BasicOptionsComponent>
            <QuestionComponent question="What cuisine do you like?" subtitle="Click multiple options"></QuestionComponent>
            <BasicOptionsComponent name="foodCuisineItems" onItemSelected={this.onItemSelected} items={this.state.foodCuisineItems}></BasicOptionsComponent>
            <SubmitComponent name="submitInitial" onSubmit={this.onSubmit}></SubmitComponent>
        </div>
    );
  }
}
export default MainComponent;

const wrapper = document.getElementById("react-app");
wrapper ? ReactDOM.render(<MainComponent />, wrapper) : false;
