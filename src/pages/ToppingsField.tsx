import { OrderedSet, NonEmptyOrderedSet } from "@/Collections";
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
  selectedToppings: NonEmptyOrderedSet<number>;
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
        ? NonEmptyOrderedSet({
            head: prev.toppings.toNonEmptyArray().head,
            tail: [...prev.toppings.toNonEmptyArray().tail, topping],
          }) // It is a fact this is a non-empty array.
        : NonEmptyOrderedSet({ head: topping, tail: [] }),
    }));

  const handleUnCheck = (topping: number) => {
    setState((prev) => {
      return {
        ...prev,
        toppings:
          prev.toppings &&
          (() => {
            const newToppings = prev.toppings
              .toArray()
              .filter((id) => id != topping);

            if (newToppings.length > 0) {
              const [head, ...tail] = newToppings;
              return NonEmptyOrderedSet({
                head,
                tail,
              });
            } else {
              return null;
            }
          })(),
      };
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
