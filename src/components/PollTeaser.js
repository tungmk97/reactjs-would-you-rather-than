import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    noanswered: PropTypes.bool.isRequired,
  };
  state = {
    viewPoll: false,
  };
  handleClick = (event) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const { question, noanswered } = this.props;
    const buttonContent = noanswered === true ? 'Answer Poll' : 'Result';

    if (this.state.viewPoll) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }

    return (
      <>
        <Header as="h4" textAlign="left">
          Would you rather
        </Header>
        <p style={{ textAlign: 'center' }}>
          {question.optionOne.text}
          <br />
          or....
          <br />
          {question.optionTwo.text}
        </p>
        <Button
          content={buttonContent}
          fluid
          onClick={this.handleClick}
        />
      </>
    );
  }
}

export default PollTeaser;

