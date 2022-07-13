import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Button, Form, Radio } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/users';

export class PollQuestion extends Component {
  static propTypes = {
    userLogged: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = (event, { value }) => this.setState({ value });

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { userLogged, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(userLogged, question.id, this.state.value);
    }
  };

  render() {
    const { question } = this.props;
    const isDisabled = this.state.value === '' ? true : false;

    return (
      <>
        <Header as="h4">Would you rather</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Radio label={question.optionOne.text} value="optionOne" name="radioGroup" checked={this.state.value === 'optionOne'}
              onChange={this.handleChange}
            />
            <br />
            <Radio label={question.optionTwo.text} value="optionTwo" name="radioGroup" checked={this.state.value === 'optionTwo'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Button color="green" size="tiny" fluid positive disabled={isDisabled} content="Submit"/>
          </Form.Field>
        </Form>
      </>
    );
  }
}

function mapStateToProps({ userLogged }) {
  return {
    userLogged,
  };
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(
  PollQuestion
);
