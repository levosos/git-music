import React from 'react';
import Note from './Note';
import Tag from './Tag';
import SubmitNote from './SubmitNote';
import Divider from '@material-ui/core/Divider';

class Conversation extends React.Component {
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
        <>
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
        </>
    );
  }
}

export default Conversation;
