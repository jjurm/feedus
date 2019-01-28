import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route } from 'react-router-dom';
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
import MenuComponent from "./MenuComponent.jsx";
import history from "./history";
import RestaurantComponent from "./RestaurantComponent.jsx";
import FoodTilesComponent from "./FoodTilesComponent.jsx";

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
    selectedFoodTypeItems: [],
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
    ],
    selectedFoodCuisineItems:[],
    menu:[],
    selectedMenus: [],
    initialMenus: [{
        "category": "Starter",
        "name": "PERi-PERi Nuts",
        "cuisine": "Fast"
      },
      {
        "category": "Soup",
        "name": "Garlic Soup",
        "cuisine": "Fast"
      },
      {
        "category": "Main",
        "name": "Beanie Burger",
        "cuisine": "Fast"
      },
      {
        "category": "Dessert",
        "name": "Gooey Caramel Cheesecake",
        "cuisine": "French"
      },
      {
        "category": "Starter",
        "name": "Burrata (V)",
        "cuisine": "French"
      },
      {
        "category": "Soup",
        "name": "Gratinée à l’Oignon",
        "cuisine": "French"
      },
      {
        "category": "Main",
        "name": "Chicken & Leek Pie",
        "cuisine": "French"
      },
      {
        "category": "Dessert",
        "name": "Organic Croissant",
        "cuisine": "French"
      },
      {
        "category": "Starter",
        "name": "Tricolore",
        "cuisine": "Italian"
      },
      {
        "category": "Main",
        "name": "Chicken Milanese",
        "cuisine": "Italian"
      },
      {
        "category": "Soup",
        "name": "Tomato Soup",
        "cuisine": "Italian"
      },
      {
        "category": "Dessert",
        "name": "Tiramisu",
        "cuisine": "Italian"
      },
      {
        "category": "Starter",
        "name": "Zaika Salad",
        "cuisine": "Indian"
      },
      {
        "category": "Soup",
        "name": "Rasam",
        "cuisine": "Indian"
      },
      {
        "category": "Main",
        "name": "Paneer Tikka Masala",
        "cuisine": "Indian"
      },
      {
        "category": "Dessert",
        "name": "Pista Kulfi",
        "cuisine": "Indian"
      },
      {
        "category": "Starter",
        "name": "Kimchi Jeon (V)",
        "cuisine": "Asian"
      },
      {
        "category": "Soup",
        "name": "Hot&Sour Soup",
        "cuisine": "Asian"
      },
      {
        "category": "Main",
        "name": "Peking Duck",
        "cuisine": "Asian"
      },
      {
        "category": "Dessert",
        "name": "Mango Sago Pomelo",
        "cuisine": "Asian"
      },
      {
        "category": "Starter",
        "name": "Homemade Hummus",
        "cuisine": "British"
      },
      {
        "category": "Main",
        "name": "BBQ Baby Black Ribs",
        "cuisine": "British"
      },
      {
        "category": "Soup",
        "name": "Lentil and Carrot Soup",
        "cuisine": "British"
      },
      {
        "category": "Dessert",
        "name": "Apple Crumble & Custard",
        "cuisine": "British"
      }],
      restaurants: [
        {name:"Nandos",
        web:"www.nandos.co.uk",
        address1:"117 Gloucester Rd",
        address2:"Kensingtion, London",
        open:"Closes at 23.30"},
        {name:"Bumpkin",
        web:"www.bumpkinuk.com",
        address1:"102 Old Brompton Rd",
        address2:"South Kensingtion, London",
        open:"Closes at 23.00"},
        {name:"Tombo - Japanese Cafe",
        web:"www.tombocafe.com",
        address1:"29 Thurloe Pl",
        address2:"Kensingtion, London",
        open:"Closes at 21.30"}
      ]
    };
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

  onMenuItemSelected = (itemName) => {
      let menus = this.state.selectedMenus;
      let found = false;
      for (var i=menus.length-1; i>=0; i--) {
        if (menus[i] === itemName) {
            menus.splice(i, 1);
            found = true;
            // break;       //<-- Uncomment  if only the first term has to be removed
        }
      }
      if(!found) menus.push(itemName);
      this.setState({selectedMenus: menus});
      console.log(this.state.selectedMenus);
  }

  onSubmit = (submitName) => {
    if(submitName == "submitInitial") {
        let selectedFoodTypeItems = [];
        this.state.foodTypeItems.forEach(i => {
            if(i.active) {selectedFoodTypeItems.push(i.name)};
        })
        console.log(selectedFoodTypeItems);

        let selectedFoodCuisineItems = [];
        this.state.foodCuisineItems.forEach(i => {
            if(i.active) {selectedFoodCuisineItems.push(i.name)};
        })
        console.log(selectedFoodCuisineItems);

        let m = [];
        this.state.initialMenus.forEach(i => {
            if(selectedFoodTypeItems.indexOf(i.category) > -1 || selectedFoodCuisineItems.indexOf(i.cuisine) > -1) m.push(i.name);
        })
        this.setState({menu:m});
        console.log(m);
        
        history.push("/vote");   
    } else {
        history.push("/final");
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
            <MenuComponent menu={this.state.menu} onItemSelected={this.onMenuItemSelected}></MenuComponent>
            <SubmitComponent name="submitVote" onSubmit={this.onSubmit}></SubmitComponent>
        </div>
    );
  }

  Final = () => {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <QuestionComponent question="Done :)" subtitle="Meet your friends and go for lunch to..."></QuestionComponent>
            <RestaurantComponent restaurants={this.state.restaurants}></RestaurantComponent>
        </div>
    );
  }
  
  render() {
    return (
        <Router history={history}> 
            <Switch>
            <Route exact path="/" component={this.Basic}/>
            <Route path="/vote" component={this.Vote}/>
            <Route path="/final" component={this.Final}/>
            </Switch>
        </Router>
    );
  }
}
export default MainComponent;

const wrapper = document.getElementById("react-app");
wrapper ? ReactDOM.render(<MainComponent />, wrapper) : false;
