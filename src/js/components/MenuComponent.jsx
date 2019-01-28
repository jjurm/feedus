import React, { Component } from "react";
import { Section, Container, Columns, Media, Image, Button } from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuItemComponent from "./MenuItemComponent.jsx";

class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active:{}
      };
  }

  onItemSelected = (itemName) => {
    this.props.onItemSelected(itemName);
  }

  render() {
    let itemsRow = [];

    this.props.menu.forEach(i => {
         
    itemsRow.push(<MenuItemComponent item={i} key={i} onItemSelected={this.onItemSelected}></MenuItemComponent>);
    });

    return (
        <Section>
            <Container>
                <Columns>
                    {itemsRow}
                </Columns>
            </Container>
        </Section>
    );
  }
}

MenuComponent.propTypes = {
    menu: PropTypes.array,
    onItemSelected: PropTypes.func
};

export default MenuComponent;