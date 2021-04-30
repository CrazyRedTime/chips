import { useEffect, useState } from "react";
import Chip from "../Chip/Chip";

const ChipsInput = ({ value, setValue }) => {
  const makeArrayFromString = (string) => {
    return string
      .split(/,(?!"*,*")/)
      .map((value) => value.trim())
      .filter((value) => value);
  };

  const [chipsArray, setChipsArray] = useState(makeArrayFromString(value));

  useEffect(() => {
    console.log(makeArrayFromString(value));
  }, [value]);

  const [inputValue, setInputValue] = useState("");

  const [hasOpenedQuotes, setHasOpenedQuotes] = useState(false);

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
    }
  }, [value, chipsArray, setValue]);

  const addChip = (e) => {
    e.repeat = false;
    if (e.key === "," && inputValue && !hasOpenedQuotes) {
      setChipsArray([...chipsArray, inputValue]);
      setInputValue("");
    }
  };

  const hadleInput = (e) => {
    if (hasOpenedQuotes) {
      setInputValue(e.target.value);
    } else if (!hasOpenedQuotes && e.nativeEvent.data !== ",") {
      setInputValue(e.target.value);
    }
  };

  return (
    <div>
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
        type="text"
        onChange={hadleInput}
        onKeyDown={addChip}
        value={inputValue}
      />
    </div>
  );
};

export default ChipsInput;
