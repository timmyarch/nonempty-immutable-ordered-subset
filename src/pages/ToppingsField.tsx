import { Topping, SelectionState } from "./App";
import { SetState } from "./Fields";

export function ToppingsField({
  toppings,
  setState,
  allToppings,
}: {
  toppings: SelectionState["toppings"];
  setState: SetState<SelectionState>;
  allToppings: Topping[];
}) {
  return (
    <>
      Toppings: <br />
      <br />
      {allToppings.map(({ id, label }) => (
        <label>
          <input type="checkbox" />
          &nbsp; {label} <br /> <br />
        </label>
      ))}
    </>
  );
}
