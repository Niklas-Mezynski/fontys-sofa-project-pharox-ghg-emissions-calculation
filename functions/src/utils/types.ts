// Create a type that checks if an object satisfies the given structure
export type CheckStructureOfConst<T, S> = {
  [K in keyof S]: K extends keyof T ? T[K] : never;
};

// // A conditional type that extracts a type from a union that has a given literal type
// type Extract<A, B> = A extends { type: B } ? A : never;

// // A conditional type that extracts a type from a union that has a given property with the given literal type
// type ExtractGeneric<A, K extends string, B> = A extends { [Key in K]: B }
//   ? A
//   : never;

export type UnknownObject = {
  [key: string]: any;
};
