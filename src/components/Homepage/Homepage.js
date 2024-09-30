import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, initUsersData } from "../Auth/helpers/storage";
import PostsPage from "../Posts/PostsPage";

const homePageStyles = {
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#F6F6F6",
};

export default function Homepage() {
  const isSignedIn = getCurrentUser();
  const navigate = useNavigate();
  initUsersData();

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/signIn");
    }
  }, [isSignedIn, navigate]);

  return isSignedIn ? (
    <div style={homePageStyles}>
      <PostsPage />
    </div>
  ) : null;
}
