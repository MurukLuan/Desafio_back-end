import React, { useEffect, useState } from "react";
import { listarClientes, deletarCliente } from "../api/ClienteService";
import { useNavigate } from "react-router-dom";
import { formatCPF, formatPhone, formatCEP } from "../utils/Formatters";
import Container from "../components/Container";
import { useAuth } from "../auth/AuthContext";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const clientesPorPagina = 5;
  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const response = await listarClientes();
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleEditar = (id) => {
    navigate(`/clientes/${id}/editar`);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await deletarCliente(id);
        carregarClientes();
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
      }
    }
  };

  const indexUltimoCliente = paginaAtual * clientesPorPagina;
  const indexPrimeiroCliente = indexUltimoCliente - clientesPorPagina;
  const clientesPagina = clientes.slice(
    indexPrimeiroCliente,
    indexUltimoCliente
  );
  const { role } = useAuth();

  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);
  const paginacao = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    
    <Container>
      <div style={{ padding: "1rem", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Lista de Clientes</h2>
        {clientesPagina.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          clientesPagina.map((cliente) => (
            <div
              key={cliente.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{cliente.nome}</h3>
              <p>
                <strong>CPF:</strong> {formatCPF(cliente.cpf)}
              </p>
              {cliente.dados && (
                <p>
                  <strong>Dados:</strong> {cliente.dados}
                </p>
              )}

              {cliente.emails && cliente.emails.length > 0 && (
                <div>
                  <strong>Emails:</strong>
                  <ul>
                    {cliente.emails.map((email, idx) => (
                      <li key={idx}>{email.email}</li>
                    ))}
                  </ul>
                </div>
              )}

              {cliente.telefones && cliente.telefones.length > 0 && (
                <div>
                  <strong>Telefones:</strong>
                  <ul>
                    {cliente.telefones.map((tel, index) => (
                      <li key={index}>
                        <strong>{tel.tipo}:</strong>{" "}
                        {formatPhone(tel.numero, tel.tipo)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cliente.endereco && (
                <div>
                  <strong>Endereço:</strong>
                  <p>
                    {cliente.endereco.logradouro},{" "}
                    {cliente.endereco.complemento}
                    <br />
                    {cliente.endereco.bairro}, {cliente.endereco.cidade} -{" "}
                    {cliente.endereco.uf}
                    <br />
                    CEP: {formatCEP(cliente.endereco.cep)}
                  </p>
                </div>
              )}

              {role === "ADMIN" && (

                <div style={{ marginTop: "1rem" }}>
                  <button
                    onClick={() => handleEditar(cliente.idCliente)}
                    style={{ marginRight: "1rem" }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleExcluir(cliente.idCliente)}>
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {paginacao.length > 1 && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            {paginacao.map((num) => (
              <button
                key={num}
                onClick={() => setPaginaAtual(num)}
                style={{
                  margin: "0 5px",
                  backgroundColor: num === paginaAtual ? "#007bff" : "#eee",
                  color: num === paginaAtual ? "#fff" : "#000",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default ClienteList;
