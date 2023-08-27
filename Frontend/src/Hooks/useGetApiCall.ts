import { useEffect, useReducer } from "react"
import { axiosInstance } from "../services/axios";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Product } from "../types/product";




type Action = { type: "FETCH_REQUEST" } | { type: "FETCH_SUCCESS"; payload: Product[] } | { type: "FETCH_FAIL", payload: string };






export const useGetApiCall = <T,>(api: string, initialState: T): T => {

  const reducer = (state: T, action: Action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true }

      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false }

      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload }

      default:
        return state
    }

  }

  const [state, dispatch] = useReducer<(state: T, action: Action) => T>(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const data = await axiosInstance.get(api);
        dispatch({ type: 'FETCH_SUCCESS', payload: data.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err as ApiError) })
      }
    }
    fetchData();
  }, [])

  return state;
}