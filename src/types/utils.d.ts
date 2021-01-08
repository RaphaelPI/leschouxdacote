declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// eslint-disable-next-line @typescript-eslint/ban-types
type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never

// https://fettblog.eu/typescript-better-object-keys/
interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}
