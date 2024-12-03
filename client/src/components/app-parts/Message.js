import styles from './Message.module.css';

function Message({text}){
    return (
        <p className={ styles.Message }>{text}</p>
    );
}

export { Message };