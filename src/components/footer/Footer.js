import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <section className={styles.footer}>
            <hr className={ styles.footer_separator} />
            <section className={styles.footer_social_media}>
                <a href="/">Social</a>
            </section>
            <section className={styles.footer_info}>
                <section className={styles.footer_info_left}>
                        Magnus
                </section >
                <section className={styles.footer_info_center}>

                </section>
                <section className={styles.footer_info_right}>
                </section>
            </section>
        </section>
    )
};

export default Footer;