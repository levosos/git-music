import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = _ => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    display: 'flex',
  },
});

class Breadcrumb extends React.Component {
    state = {
        anchorEl: null,
    };

    handleEnter = event => {
        if (this.props.image) {
            this.setState({
                anchorEl: event.currentTarget,
            });
        }
        document.body.style.cursor = "pointer";
    };
    
    handleLeave = _ => {
        this.setState({
            anchorEl: null,
        });
        document.body.style.cursor = "default";
    };

    render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <span>
            <span
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
            >
                {this.props.children}
            </span>
            <Popover
                className={classes.popover}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper className={classes.paper}>
                    <img src={"/images/" + this.props.image} height="110" width="110"/>
                </Paper>
            </Popover>
        </span>
    );
  }
}

Breadcrumb.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Breadcrumb);
