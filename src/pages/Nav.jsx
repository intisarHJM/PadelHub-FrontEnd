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
      <Link to="/">Welcome</Link>
      <Link to="/About">About</Link>
      <Link to="/Equipment">Equipment</Link>
      <Link to="/Court">Court</Link>


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
