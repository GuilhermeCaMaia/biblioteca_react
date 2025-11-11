import { useEffect, useState } from "react";

function Livro(){
    const [livros, setLivros] = useState([]);
    const [livro, setLivro] = useState({
        id: null,
        title: "",
        synopsis: "",
        genre: "",
        year: "",
        autor: { id: "" }
    });

    const [autors, setAutors] = useState([]);

    // Listar livros
    const listarLivros = async () => {
        try {
            const res = await fetch("http://localhost:8080/livro/list");
            const data = await res.json();
            setLivros(data);
        } catch (err) {
            console.error("Erro ao listar livros:", err);
        }
    }

    // Listar livros ao carregar a tela
    useEffect(() => {
        listarLivros();
    }, []);

    // Função para digitar nos inputs
    const eventKeyboard = (e) => {
        setLivro({ ...livro, [e.target.name]: e.target.value });
    };

    // Função para cadastrar ou editar livro
    const createLivro = async (e) => {
        e.preventDefault();
        try {
            let res;
            res = await fetch("http://localhost:8080/livro/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(livro),
            });
        if (res.ok) {
            setLivro({
                id: null,
                title: "",
                synopsis: "",
                genre: "",
                year: "",
                autor: { id: "" }
            });
            listarLivros(); // atualiza lista
        }
        }catch (err) {
            console.error("Erro ao salvar livro:", err);
        }
    }

    // função para editar livro
    const editLivro = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:8080/livro/update/${livro.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(livro),
            });
            if (response.ok) {
                setLivro({
                    id: null,
                    title: "",
                    synopsis: "",
                    genre: "",
                    year: ""
                });
            }
        }catch (err) {
            console.error("Erro ao listar livros:", err);
        }
    }

    const selecionarLivro = (livroSelecionado) => {
        setLivro(livroSelecionado);
    }

    // Função para deletar livro
    const deleteLivro = async (id) => {
        try {
            const response = await fetch('http://localhost:8080/livro/delete/${id}', {
                method: "DELETE",
            });
            if (response.ok) {
                setLivros(livros.filter((l) => l.id !== id));
            } else {
                console.error("Erro ao deletar livro:", response.status);
            }
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
        }
    }

    // Listar autrores ao carregar a tela
    useEffect(() => {
        listarAutors();
    }, []);

    //Listar autores
    const listarAutors = async () => {
        try {
            const res = await fetch("http://localhost:8080/autor/list");
            const data = await res.json();
            setAutors(data);
        } catch (err){
            console.error("Erro ao listar autores:", err);
        }
    };

    const handleAutorChange = (e) => {
        setLivro({ ...livro, autor: { id: e.target.value } });
    };


    return (
        <div className="container p-5">
            <h1>Cadastrar Livro</h1>
            <form>
                <label className="col-sm-2 col-form-label mt-5">Titulo do Livro</label>
                <div>
                    <input
                        type="text"
                        value={livro.title}
                        onChange={eventKeyboard}
                        name="title"
                        className="form-control" />
                </div>
                <label className="col-sm-2 col-form-label mt-5">Sinpse</label>
                <div>
                    <textarea
                        value={livro.synopsis}
                        onChange={eventKeyboard}
                        name="synopsis"
                        className="form-control"
                        rows="3" />
                </div>
                <div>
                    <label className="col-sm-2 col-form-label mt-5">Gênero</label>
                    <input
                        value={livro.genre}
                        onChange={eventKeyboard}
                        name="genre"
                        className="form-control" />
                </div>
                <label className="col-sm-2 col-form-label mt-5">Ano lançamento</label>
                <div>
                    <input
                        value={livro.year}
                        onChange={eventKeyboard}
                        name="year"
                        className="form-control" />
                </div>
                <label className="col-sm-2 col-form-label mt-5">Autor</label>
                <div className="col-md-10">
                    <select
                        name="Autor"
                        value={livro.autor.id}
                        onChange={handleAutorChange}
                        className="form-select">
                            <option value="">Selecione um autor</option>
                            {autors.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                    </select>
                </div>
                <button onClick={createLivro}
                    className="btn btn-success mt-5 shadow-lg">
                    Salvar
                </button>
            </form>
            {/* lista de livros */}
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Sinopse</th>
                        <th>Gênero</th>
                        <th>Ano</th>
                        <th>Autor</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((l, index) => (
                        <tr key={l.id}>
                            <td>{l.id}</td>
                            <td>{l.title}</td>
                            <td>{l.synopsis}</td>
                            <td>{l.genre}</td>
                            <td>{l.year}</td>
                            <td>{l.autor ? l.autor.name : ""}</td>
                            <td>
                                <button onClick={() => selecionarLivro(l)} className="btn btn-warning m-1"
                                    data-bs-toggle="modal" data-bs-target="#EditarModalLabel">
                                    editar
                                </button>
                                <button onClick={() => deleteLivro(l.id)} className="btn btn-danger m-1">
                                    deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal de edição */}
            
        </div>
    );
}

export default Livro;