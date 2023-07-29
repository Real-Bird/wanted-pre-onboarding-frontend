import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Outlet } from "react-router-dom";

function App({ hasToken }: AppProps) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home :: WTDPOFE</title>
      </Helmet>
      {hasToken ? (
        <Navigate to={"todo"} replace />
      ) : (
        <Navigate to={"signin"} replace />
      )}
      <Outlet />
    </HelmetProvider>
  );
}

interface AppProps {
  hasToken: boolean;
}

export default App;
