import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Header, Segment, Progress, Label,Button, Icon} from 'semantic-ui-react';

const YourVoteLabel = () => (
  <Label color="orange" ribbon="right" className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

export class PollResult extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    let temp = optionOneVotes - optionTwoVotes;

    return (
      <>
        <Header as="h3">
          Results:
          <Header.Subheader>
            Would you rather
          </Header.Subheader>
        </Header>
        <Segment
          color={temp > 0 ? "green" : "red"}
        >
          {userVote === 'optionOne' && <YourVoteLabel />}
          <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
          <Progress
            percent={((optionOneVotes / totalVotes) * 100).toFixed(2)}
            progress
            color={temp > 0 ? "green" : "red"}
          >
            {optionOneVotes} out of {totalVotes} votes
          </Progress>
        </Segment>
        <Segment
          color={temp > 0 ? "red" : "green"}
          >
          {userVote === 'optionTwo' && <YourVoteLabel />}

          <p style={{ fontWeight: 'bold' }}> {question.optionTwo.text} </p>
          <Progress
            percent={((optionTwoVotes / totalVotes) * 100).toFixed(2)}
            progress
            color={temp > 0 ? "red" : "green"}>
            {optionTwoVotes} out of {totalVotes} votes
          </Progress>
        </Segment>
        <Button size="tiny" floated="right" onClick={this.handleClick}>
          Go Back
        </Button>
      </>
    );
  }
}

const mapStateToProps = ({ users, userLogged }) => {
  return {
    user: users[userLogged],
  };
};

export default withRouter(connect(mapStateToProps)(PollResult));

