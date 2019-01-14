import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';

const styles = _ => ({
  tag: {
    backgroundColor: '#7BDCB5',
  },
});

class Tag extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <UserInfo user={this.props.user}>
          <span className={classes.tag}>@{this.props.children}</span>
      </UserInfo>
    );
  }
}

Tag.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tag);
