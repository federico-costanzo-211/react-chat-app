import { useState } from 'react';

import styles from './Textbar.module.css'

function Textbar({ addMessageCallback }){
    const [ message, setMessage ] = useState();
    
    function handleSubmit(event){
        event.preventDefault();

        if (message) {
            addMessageCallback(message);
            setMessage('');
        }
        else alert("Message not valid.");
    }

    return (
        <form autoComplete={"off"} className={styles.Textbar} onSubmit={handleSubmit}>
            <input type="text" id="MessageInput" value={message} onChange={(event) => setMessage(event.target.value)} autoFocus={true} />
            <input id="SendButton" type="submit" value=">>>" />
            <p>testing</p>
        </form>
    )
}

export { Textbar };