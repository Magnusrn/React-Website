import RenderTerminal from "../components/terminal/Terminal";
import styles from "./Terminal.module.css"

function Terminal() {
    return (
        <div>
            <h1 className={styles.title}>Terminal</h1>
            <RenderTerminal/>
        </div>
    );
}

export default Terminal;