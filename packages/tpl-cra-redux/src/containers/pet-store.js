import React from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";

import { listPets } from "../actions";
import { selectPets } from "../selectors";

import { Container, Jumbotron } from "../components/layout";

@connect(state => ({
  pets: selectPets(state),
}))
export default class extends React.PureComponent {
  componentDidMount() {
    this.listPets();
  }

  listPets = () => {
    this.props.dispatch(listPets({ org: "36node" }));
  };

  render() {
    const { pets } = this.props;
    return (
      <DocumentTitle title="@36node - Pet Store Example">
        <Container>
          <Jumbotron> Pets in store. </Jumbotron>
          <div>
            {pets.map(pet => (
              <div key={pet.id}>{pet.name}</div>
            ))}
          </div>
        </Container>
      </DocumentTitle>
    );
  }
}
