import { forwardRef, ReactElement, useEffect, useImperativeHandle, useState } from "react";
export const Nanw = forwardRef(
  (
    props: {
      children: ReactElement[];
      step?: number;
      onStepChange?: (step: number) => boolean;
      onOk?: (step: number) => void;
      onCancel?: (step: number) => void;
    },
    ref
  ) => {
    const { step, onStepChange, children, onOk } = props;
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
      } else if (step === children.length) {
        onOk && onOk(step);
      }
    }
    function setStep(step: number) {
      setInternalStep(step);
    }
    return (
      <>
        <h1>step {internalStep}</h1>
        <div>
          {children.map((x: any, i: number) => (i === internalStep ? <span key={i}>{x}</span> : <span key={i}></span>))}
        </div>
        <input
          type="button"
          disabled={internalStep === 0}
          value="Prev"
          onClick={() => handleStepChange(internalStep - 1)}
        ></input>
        <input
          type="button"
          value={internalStep === children.length - 1 ? "Done" : "Next"}
          onClick={() => handleStepChange(internalStep + 1)}
        ></input>
      </>
    );
  }
);
