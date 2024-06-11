import { Size, AllSizes, Topping, SelectionState } from "./App";
import { Dispatch, SetStateAction } from "react";

export function SizeField({
  size,
  setState,
}: {
  size: Size | null;
  setState: SetState<SelectionState>;
}) {
  function handleChange(value: string) {
    setState(
      (prev) =>
        ({
          ...prev,
          size: value ? value : null,
        } as SelectionState)
    );
  }

  return (
    <>
      Size: <br />
      <br />
      <select
        onChange={(e) => handleChange(e.target.value)}
        value={size ? size : undefined}
      >
        <option value={undefined} />
        {AllSizes.map((size) => (
          <option value={size}>{size}</option>
        ))}
      </select>
    </>
  );
}

export function SodasField({
  numSodas,
  setState,
}: {
  numSodas: number | null;
  setState: SetState<SelectionState>;
}) {
  function getNumber(value: string): number | null {
    if (value === "") return null;
    const number = Number(value);
    return isNaN(number) ? null : number;
  }

  function handleChange(value: string) {
    setState((prev) => ({
      ...prev,
      numSodas: getNumber(value),
    }));
  }

  return (
    <>
      Number of Sodas: <br />
      <br />
      <input type="number" onChange={(e) => handleChange(e.target.value)} />
    </>
  );
}

export type SetState<T> = Dispatch<SetStateAction<T>>;
