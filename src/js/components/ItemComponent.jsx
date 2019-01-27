import React, { Component } from "react";
import { Section, Container, Columns, Media, Image, Button} from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const itemButtonStyle = {
    height:"auto"
}

class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false
      };
  }
  render() {
    const classes = classNames({
        "is-large": true, //we always want this class
        "is-block": true,
        "is-active": this.state.active,
        "is-outlined": true,
     });

    return (
        <Columns.Column has-text-centered="true">
        <center>
            <Button className={classes} style={itemButtonStyle}  onClick={() => {this.setState({active: !this.state.active}); this.props.onItemSelected(this.props.item.name)}}>
                <Media.Item renderas="figure">
                    <Image renderas="p" size={64} alt="64x64" src={this.props.item.image} />
                </Media.Item>
				<h2 className="subtitle"><strong>{this.props.item.name}</strong></h2>

            </Button>
        </center>
        </Columns.Column>
    );
  }
}

ItemComponent.propTypes = {
    item: PropTypes.object,
    onItemSelected: PropTypes.func
};
export default ItemComponent;