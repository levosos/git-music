import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    container: {
        marginTop: 15,
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const snackbarStyles = theme => ({
    snackbar: {
      backgroundColor: green[600],
    },
    icon: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes } = props;
  
    return (
      <SnackbarContent
        className={classes.snackbar}
        message={
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            Now the world knows what you think!
          </span>
        }
      />
    );
  }
  
MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const MySnackbarContentWrapper = withStyles(snackbarStyles)(MySnackbarContent);
  
class SubmitNote extends React.Component {
    state = {
        disabled: true,
        value: '',
        open: false,
    };

    handleTextChange = event => {
        const message = event.target.value;

        this.setState({
            disabled: message === '',
            value: message,
        });
    };

    handleSubmit = _ => {
        this.props.onSubmit(this.state.value);
        this.setState({
            disabled: true,
            value: '',
            open: true,
        });
    };

    handleSnackbarClosed = _ => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <TextField
                    label="Write a note"
                    placeholder="Let everyone know what's on your mind"
                    value={this.state.value}
                    // helperText="Tip: You can tag other users by typing '@' before their name"
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleTextChange}
                />
                <Grid
                    container
                    justify="flex-end"
                >
                    <Button
                        disabled={this.state.disabled}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmit}
                    >
                        Tell us
                        <SendIcon className={classes.rightIcon} />
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={4000}
                        onClose={this.handleSnackbarClosed}
                    >
                        <MySnackbarContentWrapper />
                    </Snackbar>
                </Grid>
            </div>
        );
    }
}

SubmitNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitNote);
