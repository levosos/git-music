import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Note from './components/Note';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import Tag from './components/Tag';
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
      content: <span>After talking with <Tag user='paul'>paul</Tag>, I added a solo to 'Something'</span>
    },    
    {
      user: 'paul',
      date: 'November 30, 1967 17:08',
      content: <span>I think I like it! Let's ask <Tag user='ringo'>ringo</Tag> and <Tag user='george'>george</Tag> what they think</span>
    },
  ];
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <PrimarySearchAppBar />
          <div>
            {this.notes.map((note) => {return <Note user={note.user} date={note.date}>{note.content}</Note>})}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
