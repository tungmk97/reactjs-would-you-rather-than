import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { handleInitialData } from './actions/sharedAction';
import { connect } from 'react-redux';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import UserCard from './components/UserCard';
import NewPoll from './components/NewPoll';
import Leaderboard from './components/Leaderboard';
import PageNotFound from './components/PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { userLogged } = this.props;
    return (
      <Router>
        <div className="App">
          {userLogged === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <Nav />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/questions/bad_id" component={PageNotFound} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={PageNotFound} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 700 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

function mapStateToProps({ userLogged }) {
  return {
    userLogged,
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
