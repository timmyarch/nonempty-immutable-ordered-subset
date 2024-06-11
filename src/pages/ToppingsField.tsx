import { NonEmptyOrderedImmutableSet } from "@/Collections";
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
  selectedToppings: NonEmptyOrderedImmutableSet<number>;
  setState: SetState<SelectionState>;
  allToppings: Topping[];
}) {
  const selectedToppingIds = new Set<number>(
    selectedToppings && selectedToppings.toArray().map((id) => id)
  );

  const unSelectedToppings = allToppings.filter(
    ({ id }) => !selectedToppingIds.has(id)
  );

  const handleCheck = (topping: number) =>
    setState((prev) => ({
      ...prev,
      toppings: prev.toppings
        ? NonEmptyOrderedImmutableSet(prev.toppings.head(), [
            ...prev.toppings.tailArray(),
            topping,
          ]) // It is a fact this is a non-empty array.
        : NonEmptyOrderedImmutableSet(topping, []),
    }));

  const handleUnCheck = (topping: number) => {
    setState((prev) => {
      if (!prev.toppings) {
        throw "Impossible";
      }

      const newToppings = prev.toppings
        .toArray()
        .filter((id) => id !== topping);

      if (newToppings.length > 0) {
        const [head, ...tail] = newToppings;

        return {
          ...prev,
          toppings: NonEmptyOrderedImmutableSet(head, tail),
        };
      } else {
        return {
          ...prev,
          toppings: null,
        };
      }
    });
  };

  const allToppingsMap = new Map(
    allToppings.map(({ id, label }) => [id, label])
  );

  return (
    <>
      Toppings: <br />
      <br />
      {selectedToppings &&
        selectedToppings.toArray().map((topping) => (
          <label>
            <input
              type="checkbox"
              checked={true}
              onChange={() => handleUnCheck(topping)}
            />
            &nbsp; {allToppingsMap.get(topping)} <br /> <br />
          </label>
        ))}
      {unSelectedToppings.map((topping) => (
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => handleCheck(topping.id)}
          />
          &nbsp; {topping.label} <br /> <br />
        </label>
      ))}
    </>
  );
}
