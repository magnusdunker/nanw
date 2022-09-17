import "./App.css";
import { Nanw } from "./Nanw/nanw";
import { Step } from "./Nanw/Step";
import { useRef, useState } from "react";

interface IData {
  step1Input0?: string;
  step1Input1?: string;
}
function App() {
  const [data, setData] = useState<IData>({});
  const nvnwRef = useRef() as any;
  function handleOnChange(e: any) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  return (
    <div className="App">
      <Nanw
        ref={nvnwRef}
        onStepChange={(step) => {
          console.log("onStepChange" + step);
          return true;
        }}
        onOk={(e) => console.log("onOk" + e)}
        onCancel={(e) => console.log("onCancel" + e)}
      >
        <Step>
          <input type="text" name="step1Input0" onChange={handleOnChange} />
        </Step>
        <Step>
          <input type="text" name="step1Input1" onChange={handleOnChange} />
        </Step>
        <Step>step1Input0 = {data.step1Input0}</Step>
        <Step>Step3</Step>
        <Step>Step4</Step>
      </Nanw>
      <div>{JSON.stringify(data)}</div>
      <input type={"button"} value="Goto step4" onClick={() => nvnwRef.current.setStep(4)} />
    </div>
  );
}

export default App;
