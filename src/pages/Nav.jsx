import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <div className="nav-user-profile">
        <span className="welcome-msg">Welcome  <span>{user.name}</span></span>
        <Link onClick={handleLogOut} to="/" className="signout-btn">
          Sign Out
        </Link>
      </div>
    )
  }

  const publicOptions = (
    <div className="nav-links">
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/reservation">Reservation</Link>
      <Link to="/equipment">Equipments</Link>
      <Link to="/profile">Profile</Link>
    </div>
  )

  return (
    <header className="main-nav-header">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">Padel<span>Hub</span></Link>
        </div>
        <nav className="nav-content">
          {user ? userOptions : publicOptions}
        </nav>
      </div>
    </header>
  )
}

export default Nav
