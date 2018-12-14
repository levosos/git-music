import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
    container: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 10,
        marginBottom: 10
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class SubmitNote extends React.Component {
    state = {
        disabled: true,
        message: '',
    };

    handleTextChange = event => {
        const value = event.target.value;
        this.setState({
            disabled: value === '',
            message: value,
        });
    };

    handleSubmit = _ => {
        this.props.onSubmit(this.state.message);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <TextField
                    label="Write a note"
                    placeholder="Enter your note here"
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
                        Send
                        <SendIcon className={classes.rightIcon} />
                    </Button>
                </Grid>
            </div>
        );
    }
}

SubmitNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubmitNote);
