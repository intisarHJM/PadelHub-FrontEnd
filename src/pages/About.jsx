import Nav from "./Nav"

const About = () => {
  return (
    <div className="about-page">
      <Nav />
      <h1>About Page</h1>
      <p>
        <img className="about-img" src="src\assets\Padel.jpg" alt="about-img" />
        <br />
        Padel Club Raed provides professional courts (indoor and outdoor) with
        the highest specifications. We make it easy for you to book, choose
        equipment, and enjoy the best padel facilities in Bahrain.
      </p>
    </div>
  )
}

export default About

