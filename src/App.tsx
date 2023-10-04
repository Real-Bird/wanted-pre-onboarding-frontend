import { Navigate, Outlet } from "react-router-dom";

function App({ hasToken }: AppProps) {
  return (
    <>
      {hasToken ? (
        <Navigate to={"todo"} replace />
      ) : (
        <Navigate to={"signin"} replace />
      )}
      <Outlet />
    </>
  );
}

interface AppProps {
  hasToken: boolean;
}

export default App;
