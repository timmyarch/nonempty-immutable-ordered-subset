import { useState } from "react";
import { SizeField, SodasField } from "./Fields";
import { ToppingsField } from "./ToppingsField";
import styles from "../styles/Styles";

/* * * * * * * *
 * FIELD TYPES
 */

export const AllSizes = ["Small", "Medium", "Large"] as const;

export type Size = (typeof AllSizes)[number]; // Union: "Small" | "Medium" | "Large"

export type Topping = {
  id: number;
  label: string;
};

/** Returns all possible toppings. */
const fetchAllToppings = (): Topping[] => [
  { id: 0, label: "Pepperoni" },
  { id: 1, label: "Sausage" },
  { id: 2, label: "Mushroom" },
  { id: 3, label: "Bacon" },
  { id: 4, label: "Pineapple" },
];

/**
 * Component State
 *
 * Representation Invariant: If there are no toppings selected,
 * the toppings field MUST be null (instead of empty list).
 *
 * Filed nullity is important as it determines what order they are
 * rendered and what color border they are rendered with.
 *
 * Selected fields (denoted by non-null value) are rendered first
 * and have a red border. Unselected fields (denoted by null value)
 * are rendered last and have a black border.
 */
export type SelectionState = {
  size: Size | null;
  toppings: Topping[] | null;
  numSodas: number | null;
};

/**
 * The Pizza ordering App.
 */
export default function App() {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    size: null,
    toppings: null,
    numSodas: null,
  });

  const allToppings = fetchAllToppings();

  // List of Field [Key, Value] Pairs, re-ordered with Non-null fields first, and null fields last.
  const orderedFields: [string, any | null][] = [
    ...Object.entries(selectionState).filter(
      ([fieldKey, fieldValue]) => fieldValue !== null
    ),
    ...Object.entries(selectionState).filter(
      ([fieldKey, fieldValue]) => fieldValue === null
    ),
  ];

  return (
    <>
      <h2 style={styles.title}>Pizza Time!</h2>

      {/* Render each field based on oreder they appear in orderedFields list. */}
      {orderedFields.map(([fieldKey, fieldValue]) => (
        <div
          key={fieldKey}
          style={{
            ...styles.fieldDiv,
            borderColor: fieldValue === null ? "black" : "red",
          }}
        >
          {(() => {
            switch (fieldKey) {
              case "size":
                return (
                  <SizeField size={fieldValue} setState={setSelectionState} />
                );

              case "toppings":
                return (
                  <ToppingsField
                    selectedToppings={fieldValue}
                    setState={setSelectionState}
                    allToppings={allToppings}
                  />
                );

              case "numSodas":
                return (
                  <SodasField
                    numSodas={fieldValue}
                    setState={setSelectionState}
                  />
                );
            }
          })()}
        </div>
      ))}
    </>
  );
}
