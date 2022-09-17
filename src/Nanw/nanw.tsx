import { forwardRef, ReactElement, useEffect, useImperativeHandle, useState } from "react";
import { IStepProps } from "./Step";
interface INanw {
  children: ReactElement[];
  step?: number;
  onStepChange?: (step: number) => boolean;
  onOk?: (step: number) => void;
  onCancel?: (step: number) => void;
  showAll?: boolean;
}
export const Nanw = forwardRef((props: INanw, ref) => {
  const { step, onStepChange, children, onOk, showAll } = props;
  const [internalStep, setInternalStep] = useState(step || 0);
  useImperativeHandle(ref, () => ({
    setStep(step: number) {
      setStep(step);
    },
  }));

  useEffect(() => {
    setInternalStep(step || 0);
  }, [step]);

  function handleStepChange(step: number) {
    if (step >= 0 && step < children.length) {
      if (onStepChange && onStepChange(step)) {
        setInternalStep(step);
      }
      if (!onStepChange) {
        setInternalStep(step);
      }
    }
  }
  function handleOnOk() {
    onOk && onOk(internalStep);
    window.opener.postMessage({ event: "nanwOkClicked" });
  }
  function setStep(step: number) {
    setInternalStep(step);
  }
  const currentStepProps = children[internalStep].props as IStepProps;
  return (
    <>
      {!showAll && (
        <>
          <h1>step {internalStep}</h1>
          <div>
            {children.map((x: any, i: number) =>
              i === internalStep ? <span key={i + "Step"}>{x}</span> : <span key={i + "Step"}></span>
            )}
          </div>
        </>
      )}
      {showAll && (
          <div>
            {children.map((x: any, i: number) => (
              <span key={i + "Step"}>{x}</span>
            ))}
          </div>
      )}
      <input
        type="button"
        value="Prev"
        disabled={internalStep === 0 || currentStepProps.disableButtons?.includes("prev")}
        onClick={() => handleStepChange(internalStep - 1)}
      />
      {internalStep !== children.length - 1 && (
        <input
          type="button"
          value="Next"
          disabled={currentStepProps.disableButtons?.includes("next")}
          onClick={() => handleStepChange(internalStep + 1)}
        />
      )}
      {internalStep === children.length - 1 && <input type="button" value="Done" onClick={handleOnOk} />}
      {currentStepProps?.extraButtons &&
        currentStepProps?.extraButtons.map((p: any, index: number) => (
          <input key={index + "ExtraButtons"} type="button" onClick={p.onClick} value={p.title} />
        ))}
    </>
  );
});
