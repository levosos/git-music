import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Users from '../Users';

const styles = _ => ({
  header: {
    backgroundColor: '#fdcb6e',
  },
  card: {
    margin: 15,
  },
  actions: {
    height: 50,
    display: 'flex',
    backgroundColor: '#ffeaa7',
  },
  avatar: {
    width: 50,
    height: 50,
    padding: 3,
    backgroundColor: grey[100],
  },
});

class Description extends React.Component {
  render() {
    const { classes } = this.props;
    const user = Users[this.props.user];

    return (
      <Card className={classes.card}>
        <CardHeader className={classes.header}
          avatar={<Avatar src={"/avatars/" + user.avatar + ".png"} className={classes.avatar} />}
          title={<b>{user.name}</b>}
          subheader={this.props.date}
        />
        <CardContent className={classes.content}>
          <Typography component="p">
            {this.props.children}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);
