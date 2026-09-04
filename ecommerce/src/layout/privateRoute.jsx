import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import userStore from "../store/user.store";

const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const { userVerifyRequest } = userStore();

  useEffect(() => {
    (async () => {
      try {
        const verified = await userVerifyRequest();
        setIsAuthorized(verified);
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      } finally {
        setLoading(false); // Set loading to false after verification
      }
    })();
  }, [userVerifyRequest]);

  if (loading) {
    return <></>;
  }
  return isAuthorized ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
