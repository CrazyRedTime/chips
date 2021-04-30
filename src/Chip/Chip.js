import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Chip = ({ value, index, chipsArray, setChipsArray }) => {

  const [chipValue, setChipValue] = useState(value);

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

  return (
    <div>
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={saveChipValue}
      >
        {value}
      </span>
    </div>
  );
};

export default Chip;
