import styles from "./Home.module.css"

function Home() {
    console.log("accessed homepage")
    return (
        <div>
            <p className={styles.p}>
            Welcome to Home page    
            </p>
        </div>
    )
}

export default Home;