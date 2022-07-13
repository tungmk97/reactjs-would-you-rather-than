import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

export class Home extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired,
  };

  render() {
    const { userQuestionData } = this.props;

    return <Tab panes={panes({ userQuestionData })} className="tab" />;
  }
}

const panes = (props) => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: 'Questions',
      render: () => (
        <Tab.Pane>
          {userQuestionData.answered.map((question) => (
            <UserCard
              key={question.id}
              noanswered={true}
              question_id={question.id}
            />
          ))}
        </Tab.Pane>
      ),
    },

    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {userQuestionData.noanswered.map((question) => (
            <UserCard
              key={question.id}
              question_id={question.id}
              noanswered={false}
            />
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

const mapStateToProps = ({ userLogged, users, questions }) => {
  const answeredIds = Object.keys(users[userLogged].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const noanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      noanswered,
    },
  };
};

export default connect(mapStateToProps)(Home);
