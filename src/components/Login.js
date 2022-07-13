import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Image,
  Form,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import { setuserLogged } from '../actions/userLogged';

export class Login extends Component {
  state = {
    loading: false,
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginGridLayout
            image={<BrandImage />}
            form={<ConnectedLoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
      </Fragment>
    );
  }
}

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the game!</Header.Content>
    <Header.Subheader>Sign in to continue</Header.Subheader>
  </Header>
);

const LoginGridLayout = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const BrandImage = () => (
  <Image
    src="https://i.pinimg.com/originals/08/13/71/0813717e53c866dd3c96f00fc078a193.jpg"
    size="medium"
    centered
  />
);

class LoginForm extends Component {
  state = {
    value: '',
  };
  static propTypes = {
    onLoading: PropTypes.func.isRequired,
  };

  onChange = (event, { value }) => {
    this.setState({ value });
  };

  generateDropdownData = () => {
    const { users } = this.props;

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL !== undefined ? user.avatarURL : "Default Link"},
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onLoading, setuserLogged } = this.props;
    const userLogged = this.state.value;

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setuserLogged(userLogged));
  };

  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as="h2" color="green">
          Log in
        </Header>
        <Form.Dropdown
          placeholder="Choose Friend"
          value={value}
          selection
          scrolling
          options={this.generateDropdownData()}
          onChange={this.onChange}
          fluid
          required
        />
        <Form.Button content="Press to login" positive disabled={disabled} fluid />
      </Form>
    );
  }
}

const ConnectedLoginForm = connect(mapStateToProps, { setuserLogged })(
  LoginForm
);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default Login;
