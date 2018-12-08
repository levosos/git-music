import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
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
import red from '@material-ui/core/colors/red';
import Tooltip from '@material-ui/core/Tooltip';

const styles = _ => ({
  header: {
    backgroundColor: '#7BDCB5',
    height: 33,
  },
  card: {
    margin: 15,
    marginLeft: 50,
    marginRight: 50,
  },
  actions: {
    height: 50,
    display: 'flex',
    backgroundColor: grey[200],
  },
  avatar: {
    width: 50,
    height: 50,
    padding: 3,
    backgroundColor: grey[100],
  },
  favorite: {
    color: red[500],
  },
});

class Note extends React.Component {
    handleLikeClicked = _ => {
        var likes = this.state.likes;
        
        if (this.state.liked) { --likes; }
        else { ++likes; }
        
        this.setState({
            likes: likes,
            liked: !this.state.liked,
        });
    }
    state = {
        liked: this.props.liked,
        likes: this.props.likes,
    };
    
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
            <Tooltip title="Like">
                <IconButton onClick={this.handleLikeClicked}>
                    <Badge invisible={!this.state.likes} badgeContent={this.state.likes}>
                        <FavoriteIcon className={this.state.liked ? classes.favorite : undefined} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Tooltip title="Share">
                <IconButton>
                    <ShareIcon />
                </IconButton>
            </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

Note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Note);
