import Nav from "./Nav"

const About = () => {
  return (
    <div className="page-layout">
      <Nav />

      <div className="about-container">
        <h1 className="form-title">About Us</h1>

        <div className="about-content">
          <div className="about-images-grid">
            <img
              className="about-card-img"
              src="src/assets/Padel-about.jpg"
              alt="Padel Court"
            />
            <img
              className="about-card-img"
              src="src/assets/Padel-about2.jpg"
              alt="Padel Players"
            />
          </div>

          <div className="about-text-card">
            <strong>
              {" "}
              <p>
                Padel Club Raed provides professional courts (indoor and
                outdoor) with the highest specifications. We make it easy for
                you to book, choose equipment, and enjoy the best padel
                facilities in Bahrain.
              </p>
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
