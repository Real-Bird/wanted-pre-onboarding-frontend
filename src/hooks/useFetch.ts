import { useEffect, useState } from "react";

type State<S> = { state: S | null; loading: boolean; error: Error | null };

export function useFetch<T>(asyncFn: () => Promise<T>, hasTrigger?: boolean) {
  const [state, setState] = useState<State<T>>({
    state: null,
    loading: false,
    error: null,
  });

  const onFetching = async () => {
    setState({ ...state, loading: true });
    try {
      const data = await asyncFn();
      setState({
        ...state,
        state: data as T,
        loading: false,
      });
    } catch (e) {
      setState({ ...state, loading: false, error: e as Error });
      throw new Error((e as Error).message);
    }
  };

  useEffect(() => {
    if (hasTrigger) return;
    setState({ ...state, loading: true });
    asyncFn()
      .then((data) =>
        setState({
          ...state,
          state: data as T,
          loading: false,
        })
      )
      .catch((e) => setState({ ...state, loading: false, error: e }));
    return () =>
      setState({
        ...state,
        loading: true,
      });
  }, []);

  return { ...state, onFetching };
}
