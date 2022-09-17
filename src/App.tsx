import "./App.css";
import { Nanw, TextHandler } from "./Nanw/nanw";
import { Step } from "./Nanw/Step";
import { useRef, useState } from "react";

interface IData {
  step1Input0?: string;
  step1Input1?: string;
  step1Input7?: string;
}
function App() {
  const [state, setState] = useState<IData>({});
  const [errors, setErrors] = useState<IData>({});
  const nvnwRef = useRef() as any;
  function handleStep1Validate() {
    // setErrors({ ...errors, step1Input7: "Der er fandme fejl her" });
    return true;
  }
  return (
    <div className="App">
      <Nanw
        ref={nvnwRef}
        onStepChange={(step) => {
          console.log("onStepChange" + step);
        }}
        onOk={(e) => console.log("onOk" + e)}
        onCancel={(e) => console.log("onCancel" + e)}
      >
        <Step validate={handleStep1Validate}>
          <input type="text" {...TextHandler(state, "step1Input0", setState, errors)} />
          <input type="text" {...TextHandler(state, "step1Input5", setState, errors)} />
          <input type="text" {...TextHandler(state, "step1Input6", setState, errors)} />
          <input type="text" {...TextHandler(state, "step1Input7", setState, errors)} />
          <input type="text" {...TextHandler(state, "step1Input8", setState, errors)} />
          <input type="text" {...TextHandler(state, "step1Input9", setState, errors)} />
        </Step>
        <Step>
          <input type="text" {...TextHandler(state, "step1Input1", setState, errors)} />
        </Step>
        <Step
          extraButtons={[
            {
              onClick: (e) => {
                console.log(e);
              },
              title: "Click me",
            },
          ]}
        >
          step1Input0 = {state.step1Input0}
        </Step>
        <Step disableButtons={["next"]}>Step3</Step>
        <Step>Step4</Step>
      </Nanw>
      <div>{JSON.stringify(state)}</div>
      <input type={"button"} value="Goto step4" onClick={() => nvnwRef.current.setStep(4)} />
    </div>
  );
}
export default App;
