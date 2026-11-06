import { Link } from 'react-router-dom'

function About() {
  return (
    <main className="dashboard">
      <h1>About</h1>
      <p>A small PH storefront, built across Weeks 4 and 5.</p>
      <Link to="/">Back to products</Link>
    </main>
  )
}

export default About