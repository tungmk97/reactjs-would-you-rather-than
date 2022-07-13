import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  Label,
  Divider,
  Segment,
  Grid,
  Header
} from 'semantic-ui-react';

const leaderColor = ['red', 'grey', 'blue'];

const TOP_LEADER = 3;

export class Leaderboard extends Component {
  static propType = {
    leaderInfo: PropType.array.isRequired,
  };
  render() {
    const { leaderInfo } = this.props;

    return (
      <>
        {leaderInfo.map((leader, index) => (
          <Segment.Group key={leader.id}>
            <Label corner="left" icon="chess king" color={leaderColor[index]} />
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={3} verticalAlign="middle">
                  <Image src={leader.avatarURL} />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Header as="h4" textAlign="left">
                    {leader.name}
                  </Header>
                  <Grid>
                    <Grid.Column width={13}>Number of question answered</Grid.Column>
                    <Grid.Column width={3}>{leader.answerCount}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={13}>Number of question created</Grid.Column>
                    <Grid.Column width={3}>{leader.questionCount}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3} textAlign="center">
                  <Segment.Group>
                    <Header as="h4" block attached="top" content="Score" />
                    <Segment>
                      <Label circular color="green" size="big">
                        {leader.questionCount + leader.answerCount}
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const leaderInfo = Object.values(state.users)
  .map((user) => ({
    id: user.id,
    avatarURL: user.avatarURL,
    name: user.name,
    questionCount: user.questions.length,
    answerCount: Object.values(user.answers).length,
    total: Object.values(user.answers).length + user.questions.length,
  }))
  .sort((a, b) => b.total - a.total)
  .slice(0, TOP_LEADER);
return {
  leaderInfo,
};
}


export default connect(mapStateToProps)(Leaderboard);
