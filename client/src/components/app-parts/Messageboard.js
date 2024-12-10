import { Message } from './Message.js'

import styles from './Messageboard.module.css'

function Messageboard({messageList}){
  return (
      <div className={ styles.Messageboard }>
        { messageList.map((message, index) => <Message text={message} key={index + 1}/>) }
      </div>
    );
}

export { Messageboard };