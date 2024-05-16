import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <img
          src="https://seekvectors.com/files/download/Netflix-Logo-19.png"
          alt=""
          width={80}
        />
      </div>
      <div className="header_nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <SearchOutlined />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
