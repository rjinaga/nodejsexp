export type Predicate<T> = (item: T) => void;
export type ResolvePredicate<T> = (value?: T | PromiseLike<T> | undefined) => void;
export type RejectPredicate<T> = (reason?: unknown) => void;