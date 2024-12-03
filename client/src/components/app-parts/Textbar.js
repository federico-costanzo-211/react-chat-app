import styles from './Textbar.module.css'

function Textbar(){
    return (
        <form className={styles.Textbar}>
            <input type="text" id="MessageInput" autoFocus="true" />
            <input id="SendButton" type="submit" value=">>>" />
            <p>testing</p>
        </form>
    )
}

export { Textbar };