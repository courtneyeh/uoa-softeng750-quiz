import styles from './Quote.module.css'

const quotes = require('quote-lib');

export default function Quote() {
  const quote = quotes.getRandom();

  return (
    <div className={styles.quoteSection}>
      <b>{quote?.quote}</b>
      <p>{quote?.author}</p>
    </div>
  );
}