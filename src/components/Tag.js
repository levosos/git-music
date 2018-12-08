import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Users from '../Users';

const styles = _ => ({
  popover: {
    pointerEvents: 'none',
  },
  tag: {
    backgroundColor: '#7BDCB5',
  },
  paper: {
    display: 'flex',
    padding: 10,
  },
});

class Tag extends React.Component {
  state = {
    anchorEl: null,
  };

  handleEnter = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleLeave = _ => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const user = Users[this.props.user];

    return (
        <span>
            <span
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                className={classes.tag}
            >
                @{this.props.children}
            </span>
            <Popover
                className={classes.popover}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Paper className={classes.paper}>
                    <Avatar
                        src={"/avatars/" + user.avatar + ".png"}
                        className={classes.avatar} />
                    <Typography component="p">
                        <b>{user.name}</b>
                        <br/>
                        {user.role}
                    </Typography>
                </Paper>
            </Popover>
        </span>
    );
  }
}

Tag.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tag);
