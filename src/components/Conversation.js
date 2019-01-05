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
            content: <span>I think I like it! Let's ask <Tag user='paul'>paul</Tag>, <Tag user='george'>george</Tag>, and <Tag user='ringo'>ringo</Tag> what they think</span>,
            thumbUpClicked: true,
            thumbUpCount: 1,
          },    
          {
            user: 'martin',
            date: 'April 3, 1969 11:21',
            content: <span>Thanks! This idea came to me after talking with <Tag user='george'>george</Tag>, so I think he would be ok with that</span>
          },
          {
            user: 'paul',
            date: 'April 3, 1969 17:08',
            thumbUpCount: 2,
            thumbDownCount: 1,
            content: <span>Do you think it would be better with a distortion?</span>
          },
          {
            user: 'george',
            date: 'April 3, 1969 18:12',
            content: <span><Tag user='paul'>Paul</Tag> I don't use any effects in this song so I think it's not such a good idea to use it here. Let's stick with the <Tag user='martin'>producer</Tag>'s suggestion!</span>
          },
          {
            user: 'paul',
            date: 'April 4, 1969 11:43',
            thumbUpClicked: true,
            thumbUpCount: 4,
            content: <span>OK let's do it!</span>
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
                thumbDownCount={note.thumbDownCount}
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
