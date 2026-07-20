import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/user.store";
import { getToken } from "../helper/helper";

const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  let { userVerifyRequest } = userStore();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await userVerifyRequest();
        let result = getToken();
        if (result) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
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
  return isAuthorized ? children : navigate("/login");
};

export default PrivateRoute;
