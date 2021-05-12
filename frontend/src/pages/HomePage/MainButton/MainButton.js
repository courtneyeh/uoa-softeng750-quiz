import { Button } from "reactstrap";
import styles from './MainButton.module.css'
import { useState } from "react";
import usePut from "../../../hooks/usePut";

export default function MainButton({ initialState }) {
  const put = usePut();

  const [pressed, setPressed] = useState(initialState);

  const handleClick = async () => {
    const newState = !pressed;
    setPressed(newState);

    await put(`/api/button`, { pressed: newState });
  }

  return <Button className={styles.mainButton}
                 onClick={handleClick}>{pressed ? "Pressed" : "Not Pressed"}</Button>
}