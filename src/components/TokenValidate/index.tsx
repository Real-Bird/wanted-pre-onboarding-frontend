import { TokenStorage } from "../../instances/TokenStorage";
import { useState, useEffect } from "react";
import { Layout } from "../common/Layout";
import App from "../../App";
import { Spinner } from "../common";

export const TokenValidate = ({ tokenStorage }: TokenValidateProps) => {
  tokenStorage.initializedToken();
  const [isLoading, setIsLoading] = useState(true);
  const hasToken = !!tokenStorage.get();

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Layout title="Loading">
          <Spinner />
        </Layout>
      ) : (
        <App hasToken={hasToken} />
      )}
    </>
  );
};

interface TokenValidateProps {
  tokenStorage: TokenStorage;
}
