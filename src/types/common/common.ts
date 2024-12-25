export type Nullable<Type> = Type extends Array<unknown> ? Type : Type | null | undefined;

export type Fn = () => void;

export type Mapped<Key extends string | number, Value = unknown> = {
  [key in Key]: Value;
};
