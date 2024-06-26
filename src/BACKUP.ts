/**
 * # Key Ideas: Constraints eliminate errors
 *
 * - Single Source of Truth - State should not duplicate information.
 *
 * - Design state with type-constraints that make errors impossible.
 *
 * (seems trivial on smaller scale, but significant at large scale. eg Insights filters)
 */

/**
 * # Key Ideas: Abstraction simplifies programming
 *
 * - Non-trivial data structures can be represented as abstract interfaces.
 *
 * - An underlying concrete data-structure (and functions that interact with it)
 * can fullfull the implementation of the data structure.
 *
 * - The user of your data structure may have no knowledge of what your underlying
 * representation data structure or implementation is.
 */

type Point = [number, number];
type Triple<T, U, V> = [T, U, V];

/**
 * Represents a mathematical/abstract set of T's,
 * and provides a method to iterate on elements
 * in an order that preserves insertion order.
 */
export interface OrderedSet<T> {
  /** Adds elt to represented set.  */
  //   add: (elt: T) => void;
  /** Returns whether elt is a member of represented set. */
  has: (elt: T) => boolean;
  /** Returns a new set that is an intersection of this and other. */
  //   intersection: (other: OrderedSet<T>) => OrderedSet<T>;
  /** Returns an array of all elements of this set, in the same order as insertion. */
  toArray: () => T[];
}

function CreateOrderedSet__MAP<T>(elts: T[]): OrderedSet<T> {
  const representationMap = new Map(elts.map((elt) => [elt, undefined]));

  return {
    // add: (elt: T) => representationMap.set(elt, undefined),
    has: (elt: T) => representationMap.has(elt),
    toArray: () => Array.from(representationMap.keys()),
  };
}

function CreateOrderedSet__ARRAY<T>(elts: T[]): OrderedSet<T> {
  /** The elements of repArray exactly represent the elements of the set
   * The order of repArray exactly represents the order of the set.
   *
   * Representation Invariant: repArray must not contain duplicates*/
  const representationArray: T[] = [];

  function has(elt: T): boolean {
    return representationArray.some((v) => elt === v);
  }

  function add(elt: T) {
    if (!has(elt)) {
      representationArray.push(elt);
    }
  }

  for (const elt of elts) {
    add(elt);
  }

  return {
    // add,
    has,
    toArray: () => [...representationArray],
  };
}

export const OrderedSet = CreateOrderedSet__ARRAY;

// export type NonEmptyOrderedSet<T> = {
//   has: (elememnt: T) => boolean;
//   toArray: () => T[];
//   toNonEmptyArray: () => NonEmptyArray<T>;
// };

export type NonEmptyContainer<T, Container> = {
  has: (elememnt: T) => boolean;
  toArray: () => T[];
  toNonEmptyContainer: () => Container;
};

export type MyNonEmptyArray<T> = NonEmptyContainer<T, Array<T>>;
export type NonEmptyOrderedSet<T> = NonEmptyContainer<T, NonEmptyArray<T>>;

const s = NonEmptyOrderedSet({
  head: 5,
  tail: [],
});

export type NonEmptyArray<T> = {
  head: T;
  tail: T[];
};

export function NonEmptyOrderedSet<T>(
  elts: NonEmptyArray<T>
): NonEmptyOrderedSet<T> {
  /** The elements of repArray exactly represent the elements of the set
   * The order of repArray exactly represents the order of the set.
   *
   * Representation Invariant: repArray must not contain duplicates*/
  const representationArray: T[] = [elts.head];

  function has(elt: T): boolean {
    return representationArray.some((v) => elt === v);
  }

  function add(elt: T) {
    if (!has(elt)) {
      representationArray.push(elt);
    }
  }

  for (const elt of elts.tail) {
    add(elt);
  }

  return {
    has: has,
    toArray: () => [...representationArray],
    // toNonEmptyArray: () => {
    //   const [head, ...tail] = representationArray;
    //   return { head, tail };
    // },
    toNonEmptyContainer: () => {
      const [head, ...tail] = representationArray;
      return { head, tail };
    },
  };
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

/**
 * Key Ideas: Representation Invariants
 *
 * - Constraints that cannot be enforced by static typing can be
 * specified in english as "representation invariants".
 *
 * - Representation invariants should be thought of as an extention of
 * static type checking enforcemnt.
 *
 * - Functions are easier to implement if "invariants" can be assumed true.
 *
 * - Onus is on every mutator to preserve the invariants by the end of their execution.
 *
 * (nullity of empty topings is an example of a representation invariant)
 */

// // Question: How can we make these sets immutable?

// export interface NonEmptyOrderedImmutableSet<T> {
//   /** Returns whether elt is a member of represented set. */
//   has: (elt: T) => boolean;
//   /** Returns an array of all elements of this set, in the same order as insertion. */
//   toArray: () => T[];
//   head: () => T;
//   tailArray: () => T[];
// }

// export function NonEmptyOrderedImmutableSet<T>(
//   head: T,
//   tail: T[]
// ): NonEmptyOrderedImmutableSet<T> {
//   /** The elements of repArray exactly represent the elements of the set
//    * The order of repArray exactly represents the order of the set.
//    *
//    * Representation Invariant: repArray must not contain duplicates.
//    *
//    * Is the following a representation invariant? "repArray must be non-empty"
//    * Why or why not?
//    */
//   const representationArray: T[] = [head];

//   function has(elt: T): boolean {
//     return representationArray.some((v) => elt === v);
//   }

//   function add(elt: T) {
//     if (!has(elt)) {
//       representationArray.push(elt);
//     }
//   }

//   for (const elt of tail) {
//     add(elt);
//   }

//   return {
//     // add,
//     has,
//     toArray: () => [...representationArray],
//     head: () => head,
//     tailArray: () => representationArray.filter((elt) => elt !== head),
//   };
// }

// const l1 = [];
// const l2 = [3];
// const l3 = [1, 2];

// const l4: [number, ...number[]] = [1, ...[2]];

// /**
//  * Key Ideas: Complicated Type Constraints
//  *
//  * - A complicated type can be broken into multiple simpler types
//  * and then recombined.
//  *
//  * For example, you don't need fancy syntax to encode a complicated constraint.
//  * By breaking them down into simpler parts, we were able to use simple syntax to encode
//  * and enforce these constraints.
//  *
//  * - Typscript's compiler will do it's best to narrow types, but the language is not
//  * expressive enough to allow Typescript to infer everything that is true.
//  *
//  * Sometimes, Type casting is a necesity. But only Type cast when you are absolutely
//  * sure of the fact. (Add a comment annotating how you know. )
//  */

// /**
//  * Closing thoughts:
//  *
//  * Type constraints can eliminate erros by making error states impossible to be represented.
//  *
//  * Data Structures should represent an abstract idea that's easy to reason about. The underlying
//  * implementation should be hidden and of no consequence to the user.
//  *
//  * English-language Representation Invariants can encode constraints that are not enforced by type constraints.
//  * They make programming easier to reason about; but they must be strictly self-enforced by the programmer.
//  *
//  * Constraints that can be encoded as a complicated type may perhaps be more
//  * convenient to encode as an english language representation invariant. Where to
//  * draw the line between the tradeoffs is a decision up to the programmer.
//  */
