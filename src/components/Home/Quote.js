import React from 'react'
import styles from '../../styles/Home/quote.module.scss'
import CommaSvg from '../../components/SVGcomponents/CommaSvg'
function Quote() {
  return (
    <div className={styles.quote}>
       <div className={styles.main}>
        <div className={styles.svg}>
        <CommaSvg />
        </div>
        <h1 className={styles.header}>
        Wealth is like sea-water; the more we drink, the thirstier we become; and the same is true of fame.
        </h1>
        <p className={styles.name}>
        Arthur Schopenhauer
        </p>
        <div className={styles.shapes}>
        <p className={styles.circle1}> </p>
        <div className={styles.semicircle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.rectangle}></div>
        </div>
    </div>
    </div>
  )
}

export default Quote