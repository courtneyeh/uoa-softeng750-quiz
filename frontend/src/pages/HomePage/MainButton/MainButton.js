import { Button } from "reactstrap";
import styles from './MainButton.module.css'
import { useState } from "react";

export default function MainButton() {
  const [pressed, setPressed] = useState(true);

  return <Button className={styles.mainButton}
                 onClick={() => setPressed(!pressed)}>{pressed ? "Pressed" : "Not Pressed"}</Button>
}