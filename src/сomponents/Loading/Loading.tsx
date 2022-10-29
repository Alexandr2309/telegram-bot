import "./Loading.css";
import { ReactComponent as Logo } from "./loader_icon.svg";

export const Loading = () => {
  return (
    <div className="loading">
      <Logo className="loading-logo" width="50" height="50" />
    </div>
  );
};
