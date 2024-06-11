import { Topping, SelectionState } from "./App";
import { SetState } from "./Fields";

/**
 * The Toppings field.
 */
export function ToppingsField({
  selectedToppings,
  setState,
  allToppings,
}: {
  selectedToppings: Topping[];
  setState: SetState<SelectionState>;
  allToppings: Topping[];
}) {
  const selectedToppingIds = new Set<number>(
    selectedToppings && selectedToppings.map(({ id }) => id)
  );

  const unSelectedToppings = allToppings.filter(
    ({ id }) => !selectedToppingIds.has(id)
  );

  const handleCheck = (topping: Topping) =>
    setState((prev) => ({
      ...prev,
      toppings: prev.toppings ? [...prev.toppings, topping] : [topping],
    }));

  const handleUnCheck = (topping: Topping) => {
    setState((prev) => ({
      ...prev,
      toppings:
        prev.toppings && prev.toppings.filter(({ id }) => id !== topping.id),
    }));
  };

  return (
    <>
      Toppings: <br />
      <br />
      {selectedToppings &&
        selectedToppings.map((topping) => (
          <label key={topping.id}>
            <input
              type="checkbox"
              checked={true}
              onChange={() => handleUnCheck(topping)}
            />
            &nbsp; {topping.label} <br /> <br />
          </label>
        ))}
      {unSelectedToppings.map((topping) => (
        <label key={topping.id}>
          <input
            type="checkbox"
            checked={false}
            onChange={() => handleCheck(topping)}
          />
          &nbsp; {topping.label} <br /> <br />
        </label>
      ))}
    </>
  );
}
