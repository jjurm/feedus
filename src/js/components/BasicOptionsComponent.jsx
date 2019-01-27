import React, { Component } from "react";
import { Section, Container, Columns } from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import ItemComponent from "./ItemComponent.jsx";

import PropTypes from 'prop-types';

class BasicOptionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  onItemSelected = (itemName) => {
    this.props.onItemSelected(this.props.name, itemName);
  }

  render() {
    let itemsRow = []

    this.props.items.forEach(i => {
        itemsRow.push(<ItemComponent key={i.name} item={i} onItemSelected={this.onItemSelected}/>)
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

BasicOptionsComponent.propTypes = {
    items: PropTypes.array,
    onItemSelected: PropTypes.func
};
export default BasicOptionsComponent;