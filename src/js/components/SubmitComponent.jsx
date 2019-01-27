import React, { Component } from "react";
import { Section, Container, Button} from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import PropTypes from 'prop-types';

class SubmitComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: ""
      };
  }
  render() {
    return (
        <Section>
            <Container>
                <Button className="is-danger is-fullwidth is-medium is-outlined" onClick={() => this.props.onSubmit(this.props.name)}>Submit</Button>
            </Container>
        </Section>
    );
  }
}
SubmitComponent.propTypes = {
    name: PropTypes.string
};

export default SubmitComponent;