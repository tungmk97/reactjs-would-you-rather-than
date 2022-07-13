import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import PollTeaser from './PollTeaser';

const PollContent = (props) => {
  const { pollType, question, noanswered } = props;

  switch (pollType) {
    case 'POLL_TEASER':
      return <PollTeaser question={question} noanswered={noanswered} />;
    case 'POLL_QUESTION':
      return <PollQuestion question={question} />;
    case 'POLL_RESULT':
      return <PollResult question={question} />;
    default:
      return;
  }
};

export class UserCard extends Component {
  static propTypes = {
    author: PropTypes.object,
    question: PropTypes.object,
    pollType: PropTypes.string,
    noanswered: PropTypes.bool,
    question_id: PropTypes.string,
  };
  render() {
    const { author, question, pollType, badPath, noanswered = null} = this.props;

    if (badPath) {
      return <Redirect to="/questions/bad_id" />;
    }

    return (
      <Segment.Group>
        <Header as="h4" textAlign="left" block attached="top">
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <PollContent
                pollType={pollType}
                question={question}
                noanswered={noanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps(
  { users, questions, userLogged },
  { match, question_id }
) {
  let author,
    question,
    pollType,
    badPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = 'POLL_TEASER';
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[userLogged];

    if (question === undefined) {
      badPath = true;
    } else {
      author = users[question.author];
      pollType = 'POLL_QUESTION';
      if (Object.keys(user.answers).includes(question.id)) {
        pollType = 'POLL_RESULT';
      }
    }
  }

  return {
    badPath,
    question,
    author,
    pollType,
  };
}

export default connect(mapStateToProps)(UserCard);
