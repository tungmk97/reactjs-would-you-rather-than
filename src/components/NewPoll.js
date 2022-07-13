import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Form,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

export class NewPoll extends Component {
  static propTypes = {
    userLogged: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired,
  };
  state = {
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: '',
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { userLogged, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, userLogged);
      setTimeout(() => res('success'), 2000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: '',
      });
      this.setState({ validSubmit: true });
    });
  };
  render() {
    const disabled = this.state.option1 === '' || this.state.option2 === '';

    if (this.state.validSubmit) {
      return <Redirect to="/" />;
    }
    
    return (
      <Segment.Group>
        <Header as="h3" textAlign="left" block attached="top">
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Please enter question:</p>
            <br />
            <p>
              <strong>Would you rather...</strong>
            </p>
            <br />
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id="option1"
                placeholder="Enter option one..."
                value={this.state.option1}
                onChange={this.handleChange}
                required
              />
              <br />
              or
              <br />
              <Form.Input
                id="option2"
                placeholder="Enter option two..."
                value={this.state.option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button positive size="tiny" fluid disabled={disabled}>
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ userLogged }) => {
  return {
    userLogged,
  };
};

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);
