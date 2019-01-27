import React, { Component } from "react";
import { Section, Container, Hero, Heading} from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import PropTypes from 'prop-types';


const titleStyle = {
    "padding-top":"1rem"
  };

class QuestionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        }
  render() {
    return (
        <Hero color="primary">
          <Hero.Body>
            <Container className="has-text-centered">
              <Heading>{this.props.question}</Heading>
              <Heading subtitle>
                {this.props.subtitle}
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
    );
  }
}

QuestionComponent.propTypes = {
    question: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default QuestionComponent;
