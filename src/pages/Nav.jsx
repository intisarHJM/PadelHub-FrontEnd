import { Link } from "react-router-dom"

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
      <Link to="/about">about </Link>
      <Link to="/equipment"> equipments </Link>
      <Link to="/home"> home </Link>
       <Link to="/reservation"> Reservation </Link>
        <Link to="/profile"> Profile </Link>

    </>
  )

  return (
    <header>
      <Link to="/"></Link>
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
