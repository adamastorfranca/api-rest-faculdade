import './navbar.css'

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" style={{padding: "0% 11%"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={`${window.location.origin}/uniesp.jpeg`} />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">INÍCIO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/aluno">ALUNO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/professor">PROFESSOR</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/disciplina">DISCIPLINA</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
