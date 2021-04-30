import { useEffect, useState } from "react";
import Chip from "../Chip/Chip";

import styles from "./ChipsInput.module.css";

const ChipsInput = ({ value, setValue }) => {
  const makeArrayFromString = (string) => {
    return string
      .split(/,(?!"*,*")/)
      .map((value) => value.trim())
      .filter((value) => value);
  };

  const [chipsArray, setChipsArray] = useState(makeArrayFromString(value));

  const [inputValue, setInputValue] = useState("");

  const [hasOpenedQuotes, setHasOpenedQuotes] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const re = /"/g;
    if (inputValue.match(re) === null || !(inputValue.match(re).length % 2)) {
      setHasOpenedQuotes(false);
    } else {
      setHasOpenedQuotes(true);
    }
  }, [inputValue]);

  useEffect(() => {
    const newString = chipsArray.join(", ");
    if (value !== newString) {
      setValue(newString);
      setChipsArray(makeArrayFromString(newString));
    }
  }, [value, chipsArray, setValue]);

  const addChip = (e) => {
    e.repeat = false;
    if (e.key === "," && inputValue && !hasOpenedQuotes) {
      setChipsArray([...chipsArray, inputValue]);
      setInputValue("");
    }
    if (e.keyCode === 8 && !inputValue) {
      const copyOfChipsArray = [...chipsArray];
      copyOfChipsArray.splice(copyOfChipsArray.length - 1, 1);
      setChipsArray(copyOfChipsArray);
    }
  };

  const handleInput = (e) => {
    if (hasOpenedQuotes) {
      setInputValue(e.target.value);
    } else if (!hasOpenedQuotes && e.nativeEvent.data !== ",") {
      setInputValue(e.target.value);
    }
    setHasError(false);
  };

  const blurInput = () => {
    if (hasOpenedQuotes) {
      setHasError(true);
    } else if (inputValue) {
      setChipsArray([...chipsArray, inputValue]);
      setInputValue("");
    }
  };

  const placeholder = value ? null : "введите ключевые слова";

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputDiv}>
        {chipsArray.map((chip, index) => (
          <Chip
            value={chip}
            key={index}
            index={index}
            chipsArray={chipsArray}
            setChipsArray={setChipsArray}
          />
        ))}
        <input
          className={styles.rootInput}
          placeholder={placeholder}
          type="text"
          onChange={handleInput}
          onKeyDown={addChip}
          value={inputValue}
          onBlur={blurInput}
        />
      </div>
      {hasError ? (
        <span className={styles.error}>Закройте кавычки с двух сторон</span>
      ) : null}
    </div>
  );
};

export default ChipsInput;
