function About() {
  return (
    <div className="about">
      <h2>What Am I Looking At?</h2>
      <p>
        This dashboard shows near-Earth asteroids, space rocks whose orbits
        bring them relatively close to Earth. Pick a date to see which asteroids
        are passing by that day, pulled live from NASA's Near-Earth Object
        database.
      </p>

      <h3>Potentially Hazardous</h3>
      <p>
        This doesn't mean an asteroid is on a collision course. It's a
        classification NASA uses, based on an asteroid's size and how close it
        passes, to flag objects worth continued tracking.
      </p>

      <h3>Distance</h3>
      <p>
        How far the asteroid actually passes from Earth at its closest point.
        Even "close" approaches are usually millions of kilometers away, for
        reference, the Moon is about 384,000 km from Earth.
      </p>

      <h3>Using the Dashboard</h3>
      <p>
        Use the date picker to jump to any day. Search by name or drag the speed
        slider to filter the list. Click any asteroid for more detail.
      </p>
    </div>
  );
}

export default About;
