import { Message } from './Message.js'
import { useState } from 'react';

import styles from './Messageboard.module.css'

function Messageboard(){
    const [ messageList, setMessageList ] = useState([
      <Message text="testing" />,
      <Message text="testing 2" />,
      <Message text="testing 3" />
    ]);

    return (
      <div className={ styles.Messageboard }>
        {messageList}
      </div>
    );
}

export { Messageboard };