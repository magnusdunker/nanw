export type disableAbleButtons = "ok" | "cancel" | "next" | "prev";
export interface IStepProps {
  children: any;
  extraButtons?: { onClick: (e: any) => void; title: string }[];
  disableButtons?: disableAbleButtons[];
  validate?: () => boolean;
}
export function Step(props: IStepProps) {
  return <div>{props.children}</div>;
}
