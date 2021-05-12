import styles from './Quote.module.css'

export default function Quote({ quote }) {
  console.log(quote);
  return (
    <div className={styles.quoteSection}>
      <b>{quote?.quote}</b>
      <p>{quote?.author}</p>
    </div>
  );
}