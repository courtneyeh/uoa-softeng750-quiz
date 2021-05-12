import { Button } from "reactstrap";
import styles from './MainButton.module.css'
import { useState } from "react";

export default function MainButton({ initialState }) {
  const [pressed, setPressed] = useState(initialState);

  return <Button className={styles.mainButton}
                 onClick={() => setPressed(!pressed)}>{pressed ? "Pressed" : "Not Pressed"}</Button>
}