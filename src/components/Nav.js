import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu,
  Responsive,
  Image,
  Grid,
  Button,
  Container,
} from 'semantic-ui-react';
import { setuserLogged } from '../actions/userLogged';

class Nav extends Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.setuserLogged(null);
  };

  render() {
    const { userLogged, users } = this.props;

    return (
      <Container>
        <Responsive as={Menu} minWidth={700} pointing secondary>
          <Menu.Item name="home" as={NavLink} to="/" exact />
          <Menu.Item name="new poll" as={NavLink} to="/add" />
          <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image src={users[userLogged].avatarURL} avatar spaced="right" verticalAlign="bottom"/>
                {users[userLogged].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button content="Logout" labelPosition="right" basic compact icon="log out" size="mini"
                onClick={this.handleLogout}
              />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
        <Responsive as={Fragment} minWidth={400} maxWidth={700}>
          <Grid columns={2} padded="vertically">
            <Grid.Row>
              <Grid.Column>
                <Image src={users[userLogged].avatarURL} avatar spaced="right" verticalAlign="bottom"/>
                {users[userLogged].name}
              </Grid.Column>
              <Grid.Column verticalAlign="bottom" textAlign="right">
                <Button content="Logout" labelPosition="right" basic compact icon="log out" size="mini" onClick={this.handleLogout} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact />
                  <Menu.Item name="new poll" as={NavLink} to="/add" />
                  <Menu.Item
                    name="leader board"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive as={Fragment} maxWidth={400}>
          <Grid padded="vertically" columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Image src={users[userLogged].avatarURL} avatar spaced="right" verticalAlign="bottom"
                />
                {users[userLogged].name}
                <Button content="Logout" labelPosition="right" basic compact icon="log out" size="mini" floated="right"
                  onClick={this.handleLogout}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="Home" as={NavLink} to="/" exact />
                  <Menu.Item name="New Poll" as={NavLink} to="/add" />
                  <Menu.Item
                    name="Leader Board"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    );
  }
}

const mapStateToProps = ({ users, userLogged }) => {
  return {
    userLogged,
    users,
  };
};

export default connect(mapStateToProps, { setuserLogged })(Nav);
