import React, { Component } from "react";
import { Button } from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import classNames from 'classnames';

class MenuItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false
      };
  }
  render() {
    let classes = classNames({
        "is-large": true, //we always want this class
        "is-fullwidth": true,
        "is-outlines": true,
        "is-success": this.state.active
    });

    return (
        <Button className={classes} key={this.props.item} onClick={() => {
            this.setState({active: !this.state.active});
            this.props.onItemSelected(this.props.item)}}>
            {this.props.item}</Button>
    );
  }
}
export default MenuItemComponent;