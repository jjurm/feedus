import React, { Component } from "react";
import { Section, Container, Columns, Media, Image } from "react-bulma-components";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import food_icon from '../../img/food_icon.gif';

const titleStyle = {
    "paddingTop":"1rem"
  };

class HeaderComponent extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
        <Section>
            <Container>
        <Columns centered={true} breakpoint="mobile">
        <Columns.Column className="is-flex-touch is-flex-desktop is-narrow has-text-centered" breakpoint="flex-touch" narrow has-text-centered="true">
        <h1 className="title is-size-1 has-text-centered" style={titleStyle }>
							feed<span className="has-text-primary">.</span>us
					</h1>
                <Media>
          <Media.Item renderas="figure" position="left">
            <Image renderas="p" size={128} alt="64x64" src={food_icon} />
          </Media.Item>
          </Media>
        
        </Columns.Column>
        </Columns>
                
            </Container>
        </Section>
    );
  }
}
export default HeaderComponent;