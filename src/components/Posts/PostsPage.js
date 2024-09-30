import { useNavigate } from "react-router-dom";
import { getCurrentUser, logOut } from "../Auth/helpers/storage";
import "./styles/posts.css";
import UserAvatar from "../../assets/user_avatar.svg";

export default function PostsPage() {
  const navigate = useNavigate();

  const { firstName, lastName } = getCurrentUser();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <header className="posts-header">
      <div className="head-container">
        <p className="header-text">Posts</p>
        <div className="header-user">
          <img src={UserAvatar} alt="user avatar" className="header-avatar" />
          <p>
            {firstName} {lastName}
          </p>
          <p className="header-text" onClick={handleLogOut}>
            Log out
          </p>
        </div>
      </div>
    </header>
  );
}
