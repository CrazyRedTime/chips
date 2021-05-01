import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import styles from './Chip.module.css'

const Chip = ({ value, index, chipsArray, setChipsArray }) => {

  const [chipValue, setChipValue] = useState(value);

  useEffect(() => {
    setChipValue(value);
  }, [value]);

  const saveChipValue = (e) => {
    setChipValue(e.target.innerText);
  };

  useEffect(() => {
    if (value !== chipValue) {
      const copyOfChipsArray = [...chipsArray];
      copyOfChipsArray.splice(index, 1, chipValue);
      setChipsArray(copyOfChipsArray)
    }
  }, [chipValue, value, chipsArray, index, setChipsArray])

  const deleteChip = (e) => {
    e.preventDefault();
    const copyOfChipsArray = [...chipsArray];
    copyOfChipsArray.splice(index, 1);
    setChipsArray(copyOfChipsArray);
  }

  return (
    <div className={styles.chipContainer}>
      <span
        className={styles.chip}
        contentEditable
        suppressContentEditableWarning
        onBlur={saveChipValue}
      >
        {value}
      </span>
      <button className={styles.deleteButton} onClick={deleteChip}>
      </button>
    </div>
  );
};

export default Chip;
