import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <>
        <h3>Welcome {user.name}!</h3>

        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </>
    )
  }

  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/Sign-in">Register</Link>
      <Link to="/Sign-up">Sign In</Link>
    </>
  )

  return (
    <header>
      <Link to="/">
        <img className="logo" src="/images/logo.png" alt="React Auth Logo" />
      </Link>
      <nav>
        {user ? userOptions : publicOptions}
      </nav>
    </header>
  )
}

export default Nav
