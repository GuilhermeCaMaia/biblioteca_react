import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-navbar navbar-expand-lg navbar-light bg-dark navbar navbar-dark">
            <div className="container-fluid ">
                {/* logo */}
                <a className="navbar-brand" href="#">Navbar</a>
                {/*button menu sandwich */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* itens do do menu*/}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            
                            {/* <a class="nav-link active" aria-current="page" href="#"></a> */}
                            <Link className="nav-link" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/autor"}>Cadastrar Autor</Link>
                            {/* <a class="nav-link" href="#">Cadastrar Autor</a> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/livro"}>Cadastrar Livro</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Catalogo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;