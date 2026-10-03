import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import adminStore from "../store/adminStore";
const PrivateRoute = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  let { adminVerifyRequest, adminRequest } = adminStore();
  useEffect(() => {
    (async () => {
      try {
        const verified = await adminVerifyRequest();
        setIsLogin(verified);

        if (verified) {
          await adminRequest();
        }
      } catch (error) {
        console.log(error);

        setIsLogin(false);
      } finally {
        setLoading(false); // Set loading to false after verification
      }
    })();
  }, [adminRequest, adminVerifyRequest]);

  if (loading) {
    return <></>;
  }

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
