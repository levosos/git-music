import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Note from './components/Note';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import Description from './components/Description';
import SubmitNote from './components/SubmitNote';
import Tag from './components/Tag';
import Divider from '@material-ui/core/Divider';
import Breadcrumb from './components/Breadcrumb';
import Wavesurfer from './components/Wavesurfer';
import Typography from '@material-ui/core/Typography';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
  state = {
    notes: [
      {
        user: 'john',
        date: 'April 2, 1969 16:32',
        content: <span>After talking with <Tag user='paul'>paul</Tag>, I added a solo to 'Something'</span>,
        thumbUpClicked: true,
        thumbUpCount: 1,
      },    
      {
        user: 'martin',
        date: 'April 3, 1969 11:21',
        content: <span>I think I like it! Let's ask <Tag user='ringo'>ringo</Tag> and <Tag user='george'>george</Tag> what they think</span>
      },
      {
        user: 'paul',
        date: 'April 3, 1969 17:08',
        thumbUpCount: 2,
        content: <span>I think I like it! Let's ask <Tag user='ringo'>ringo</Tag> and <Tag user='george'>george</Tag> what they think</span>
      },
    ],
  };
  
  handleSubmit = message => {
    var notes = this.state.notes;
    notes.push({
      user: 'martin',
      date: 'April 5, 1969 20:09',
      content: message
    });
    this.setState({
      notes: notes,
    })
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <PrimarySearchAppBar />
        <div style={{marginLeft: 15, marginTop: 15}}>
        <Typography variant='h6' color="primary">
          <Breadcrumb image="TheBeatles.jpg">
            <b>The Beatles</b>
          </Breadcrumb>
          <span> / </span>
          <Breadcrumb image="Abbey_Road.jpg">
            <b>Abbey Road</b>
          </Breadcrumb>
          <span> / </span>
          <Breadcrumb>
            <b>Oh! Darling</b>
          </Breadcrumb>
        </Typography>
        </div>
        <div style={{marginLeft: 15, marginTop: 15}}>
        <Typography variant='h4'>
          Changed the effects in the main solo
        </Typography>
        </div>
        <Description user='martin' date='November 27, 1967 10:10' />
        <Wavesurfer />
        <Divider />
        {this.state.notes.map((note) => {
          return <Note
                    thumbUpClicked={note.thumbUpClicked}
                    thumbUpCount={note.thumbUpCount}
                    user={note.user}
                    date={note.date}
                  >
                    {note.content}
                  </Note>})}
        <Divider />
        <SubmitNote onSubmit={this.handleSubmit}/>
      </MuiThemeProvider>
    );
  }
}

export default App;
