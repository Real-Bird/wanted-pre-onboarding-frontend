import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("wtd-token")) {
      setHasToken(true);
    }
  }, [hasToken]);
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

export default App;
