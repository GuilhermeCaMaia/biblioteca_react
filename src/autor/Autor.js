import { useEffect, useState } from 'react';
import { NATIONALITIES_PT } from "./nationalities";

function Autor() {
    const [autors, setAutors] = useState([]);
    const [autor, setAutor] = useState({
        id: null, 
        name: "", 
        nationality: ""
    });

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

// Função para digitar nos inputs
const eventKeyboard = (e) => {
    setAutor({...autor, [e.target.name]: e.target.value});
};

// Cadastrar
const createAutor = async (e) => {
    e.preventDefault();
    try{
        let res = await fetch("http://localhost:8080/autor/create", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(autor),
        });

        if (res.ok) {
            setAutor({
                id: null,
                name: "",
                nationality: ""
            });
        listarAutors(); // atualiza lista
        }
    } catch (err) {
        console.error("Erro ao salvar autor:", err);
    }
};

// função para editar autor
const editAutor = async (e) => {
    e.preventDefault();
    try {
        let response = await fetch(`http://localhost:8080/autor/update/${autor.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(autor),
        });
        if (response.ok) {
            setAutor({
                id: null,
                name: "",
                nationality: ""
            });
            listarAutors(); // atualiza lista
        }
    } catch (err) {
        console.error("Erro ao listar livros:", err);
    }
}

const selecionarAutor = (autorSelecionado) => {
    setAutor(autorSelecionado);
}

// função para deletar autor
const deleteAutor = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/autor/delete/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setAutors(autors.filter((a) => a.id !== id));
            console.log(`Autor ${id} deletado com sucesso!`);
        } else {
            console.error("Erro ao deletar autor:", response.status);
        }
    } catch (error) {
        console.error("Erro de rede:", error);
    }
};

    return (
        <div className="container p-5">
            <div>
                <h1>Cadastrar Autor</h1>
                <form>
                    <label className="col-sm-2 col-form-label mt-5">Nome:</label>
                    <div className="col-md-10">
                        <input
                            type="text"
                            value={autor.name}
                            onChange={eventKeyboard}
                            name="name"
                            className="form-control"
                        />
                    </div>
                    <label className="col-sm-2 col-form-label mt-5">Nacionalidade:</label>
                    <div className="col-md-10">
                        <select
                            name="nationality"
                            value={autor.nationality}
                            onChange={eventKeyboard}
                            className="form-select">
                                <option value="">Selecione a nacionalidade</option>
                                    {NATIONALITIES_PT.map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                        </select>
                    </div>
                    <button onClick={createAutor} className="btn btn-success mt-5 shadow-lg">
                        Salvar
                    </button>
                </form>
            </div>

            {/* lista de autores */}
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Nacionalidade</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {autors.map((a, index) => (
                        <tr key={a.id}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.nationality}</td>
                            <td>
                                <button onClick={() => selecionarAutor(a)} className="btn btn-warning m-1"
                                    data-bs-toggle="modal" data-bs-target="#EditarModalLabel">
                                    editar
                                </button>
                                <button onClick={() => deleteAutor(a.id)} className="btn btn-danger m-1">
                                    deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal */}
            <div class="modal fade" id="EditarModalLabel" tabindex="-1" aria-labelledby="EditarModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edição de Autor</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label className="col-sm-2 col-form-label mt-5">Nome:</label>
                                <div className="col-md-10">
                                    <input
                                        type="text"
                                        value={autor.name}
                                        onChange={eventKeyboard}
                                        name="name"
                                        className="form-control"
                                    />
                                </div>
                                <label className="col-sm-2 col-form-label mt-5">Nacionalidade:</label>
                                <div className="col-md-10">
                                    <select
                                        name="nationality"
                                        value={autor.nationality}
                                        onChange={eventKeyboard}
                                        className="form-select">
                                        <option value="">Selecione a nacionalidade</option>
                                        {NATIONALITIES_PT.map((n) => (
                                            <option key={n} value={n}>{n}</option>))}
                                    </select>
                                </div>
                                <button onClick={editAutor} className="btn btn-success mt-5 shadow-lg">
                                    Editar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Autor;
