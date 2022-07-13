import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const PageNotFound = () => {
  return (
    <Container textAlign="center">
      <Header as="h3">404 Error</Header>
      <p>Wrong path. Try again!!!</p>
    </Container>
  );
};

export default PageNotFound;
