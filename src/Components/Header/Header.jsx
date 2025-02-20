import { useState, useRef , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import {
  RiMessage3Line,
  RiLogoutBoxLine,
  RiUser3Line,
  RiSearchLine,
} from "react-icons/ri";
import { RxBell } from "react-icons/rx";
import MessagePopup from "../MessagePopup/MessagePopup";

const Header = ({ addedItems, setAddedItems, handleRemoveItem }) => {
  const [showMenu, setShowMenu] = useState(false);
  const[token, setToken] = useState("")
  const [loggedUser, setLoggedUser] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const handleMenuToggle = () => setShowMenu(!showMenu);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // Toggle popup visibility
  const togglePopup = () => setShowPopup(!showPopup);

  const handleLogout = async () => {
    setToken(null);
    setLoggedUser(null);
    navigate("/");
    localStorage.clear();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to sidebar tab based on search query
    navigateToSidebarTab(searchQuery);
  };

  const navigateToSidebarTab = (query) => {
    // Define sidebar tabs with names or IDs that correspond to your app structure
    const sidebarTabs = ["Home", "Dashboard", "Productivity","Overall Equipment Efficiency(OEE)","Warehouse","Inventory","Machine Analysis","Power Analysis","Report","Help and Support"]; // Example tab names
    const matchedTab = sidebarTabs.find((tab) =>
      tab.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedTab) {
      // Navigate to matched tab
      navigate(`/${matchedTab.toLowerCase()}`); // Adjust route as needed
    }
  };

  // const highlightQuery = (text) => {
  //   if (!searchQuery) return text;
  //   const regex = new RegExp(`(${searchQuery})`, "gi");
  //   return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  // };

   // Close popup if clicked outside
   const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false); // Close the popup
    }
  };

  useEffect(() => {
    // Add event listener when the popup is open
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount or when popup closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // Handle delete item
  // const handleDelete = (index) => {
  //   const updatedItems = addedItems.filter((_, i) => i !== index);
  //   setAddedItems(updatedItems);
  // };

  return (
    <>
      <header className="header">
        { <div className="company-header">
          <h6>OPFACT</h6>
        </div> }
        <div className="search-message">
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search"
              placeholder="Type to search..."
            />
            <button type="submit" className="search-btn">
              <RiSearchLine size={24} color="#666" />
            </button>
          </form>
          <div className="notification">
            <span className="message-icon-div">
              <RiMessage3Line className="message-icon" onClick={openDialog} color="#666" />
            </span>
            {isDialogOpen && <MessagePopup onClose={closeDialog} />}
          </div>
          <div className="notification">
            <span className="message-icon-div">
              <RxBell className="message-icon" color="#666" onClick={togglePopup}/>
              <span className="notification-count">{addedItems?.length || 0}</span>
            </span>
          </div>
          {/* Notification Popup */}
      {showPopup && (
        <div className={`notification-popup visible`} ref={popupRef}>
          <h3>Added Materials</h3>
          {addedItems.length === 0 ? (
            <p>No materials added yet.</p>
          ) : (
            <ul>
              {addedItems.map((item, index) => (
                <li key={index}>
                  {item.rawMaterialName} - {item.currentStock} units
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveItem(item)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setShowPopup(false)} style={{ marginTop: "20px" }}>
            Close
          </button>
        </div>
      )}
          <div className="user-menu">
            <svg
              className="svg-profile"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              onClick={handleMenuToggle}
            >
              <path
                fillRule="evenodd"
                d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                clipRule="evenodd"
              />
            </svg>

            {showMenu && (
              <div className="dropdown-menu">
                <li>
                  <RiUser3Line className="profile-img" size={22} />
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <RiLogoutBoxLine size={22} />
                  <a className="logout-link" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
