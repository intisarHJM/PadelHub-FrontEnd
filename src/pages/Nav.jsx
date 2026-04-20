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

      <Link to="/About">about</Link>
      <Link to="/Equipment">equipments</Link>
      <Link to="/Court">courts</Link>


    </>
  )

  return (
    <header>
      <Link to="/">

      </Link>
      <nav>
        {user ? userOptions : publicOptions}
      </nav>
    </header>
  )
}

export default Nav
