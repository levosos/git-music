import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Note from './components/Note';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import Description from './components/Description';
import Tag from './components/Tag';
import Divider from '@material-ui/core/Divider';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
  notes = [
    {
      user: 'john',
      date: 'April 2, 1969 16:32',
      content: <span>After talking with <Tag user='paul'>paul</Tag>, I added a solo to 'Something'</span>
    },    
    {
      user: 'martin',
      date: 'April 3, 1969 11:21',
      content: <span>I think I like it! Let's ask <Tag user='ringo'>ringo</Tag> and <Tag user='george'>george</Tag> what they think</span>
    },
    {
      user: 'paul',
      date: 'April 3, 1969 17:08',
      thumbUpClicked: true,
      thumbUpCount: 1,
      content: <span>I think I like it! Let's ask <Tag user='ringo'>ringo</Tag> and <Tag user='george'>george</Tag> what they think</span>
    },
  ];
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <PrimarySearchAppBar />
          <Description user='martin' date='November 27, 1967 10:10'>
          Hi guys
          </Description>
          <Divider />
          <div>
            {this.notes.map((note) => {
              return <Note
                        thumbUpClicked={note.thumbUpClicked}
                        thumbUpCount={note.thumbUpCount}
                        user={note.user}
                        date={note.date}
                      >
                        {note.content}
                      </Note>})}
          </div>
          <Divider />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
