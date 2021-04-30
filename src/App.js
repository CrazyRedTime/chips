import { useState } from "react";
import "./App.css";
import ChipsInput from "./ChipsInput/ChipsInput";

const App = () => {
  const [value, setValue] = useState('это первый чипс, это "второй," чипс');

  return (
    <div>
      <h4>Пример использования готового компонента</h4>
      <div>
        <ChipsInput value={value} setValue={setValue} />
      </div>
      <div>Строковое представление: {value}</div>
    </div>
  );
}

export default App;
