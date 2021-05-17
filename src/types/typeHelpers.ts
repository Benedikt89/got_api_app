////TYPE Checkers
import {CharacterType, DataPayloadType} from "./data-types";

export function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}

export function isCharacter(data: DataPayloadType): data is CharacterType {
  return (data as CharacterType)._dataType === 'characters';
}