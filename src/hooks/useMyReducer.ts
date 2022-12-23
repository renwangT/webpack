import { useReducer } from "react"
import type { Reducer } from "react"

type Action<S> = {
  type: string
  payload: Partial<S>
}
function myReducer<S, A extends Action<S> = Action<S>>(state: S, action: A): S {
  return {
    ...state,
    ...action.payload
  }
}
export function useMyReducer<S extends Record<PropertyKey, any>>(
  initialValues: S,
  customReducer?: Reducer<S, Action<S>>
) {
  return useReducer<Reducer<S, Action<S>>>(customReducer || myReducer, initialValues)
}
