import "./header.scss";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src={logo}></img>
    </div>
  );
}
