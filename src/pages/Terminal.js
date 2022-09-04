import RenderTerminal from "../components/terminal/Terminal";
import styles from "./Terminal.module.css"

function Terminal() {
    return (
        <div>
            <h1 className={styles.title}>Terminal</h1>
            <h6 className={styles.description}>Input help to see available commands</h6>
            <h6 className={styles.description}> Also supports arithmetic and !! for previous command</h6>
            <RenderTerminal/>
        </div>
    );
}

export default Terminal;