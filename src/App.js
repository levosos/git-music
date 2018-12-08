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
      date: 'November 29, 1967 16:32',
      likes: 2,
      liked: false,
      content: <span>After talking with <Tag user='paul'>paul</Tag>, I added a solo to 'Something'</span>
    },    
    {
      user: 'paul',
      date: 'November 30, 1967 17:08',
      likes: 1,
      liked: true,
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
                        likes={note.likes}
                        liked={note.liked}
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
