import styles from './Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__inner} />
      <div className={styles.loader__orbit}>
        <div className={styles.loader__dot} />
        <div className={styles.loader__dot} />
        <div className={styles.loader__dot} />
        <div className={styles.loader__dot} />
      </div>
    </div>
  )
}

export default Loading