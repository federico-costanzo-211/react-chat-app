import { Message } from './Message.js'

import styles from './Messageboard.module.css'

function Messageboard(){
    return (
      <div className={ styles.Messageboard }>
        <Message text="hello" />
        <Message text="it's me" />
        <Message text="WAAAAAAAAAAAAAAA" />
      </div>
    );
}

export { Messageboard };