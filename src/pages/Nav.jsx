import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <div className="nav-user-profile">
        <span className="welcome-msg">Welcome, <span>{user.name}_</span></span>
        <Link onClick={handleLogOut} to="/" className="signout-btn">
          Sign Out_
        </Link>
      </div>
    )
  }

  const publicOptions = (
    <div className="nav-links">
      <Link to="/home">Home_</Link>
      <Link to="/about">About_</Link>
      <Link to="/reservation">Reservation_</Link>
      <Link to="/equipment">Equipments_</Link>
      <Link to="/profile">Profile_</Link>
    </div>
  )

  return (
    <header className="main-nav-header">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">Padel<span>Hub_</span></Link>
        </div>
        <nav className="nav-content">
          {user ? userOptions : publicOptions}
        </nav>
      </div>
    </header>
  )
}

export default Nav
