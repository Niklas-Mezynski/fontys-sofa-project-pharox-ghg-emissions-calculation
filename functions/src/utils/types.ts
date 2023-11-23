// Create a type that checks if an object satisfies the given structure
export type CheckStructureOfConst<T, S> = {
  [K in keyof S]: K extends keyof T ? T[K] : never;
};

export type UnknownObject = {
  [key: string]: unknown;
};
