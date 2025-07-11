import React, { useEffect, useState } from "react";
import { listarClientes, deletarCliente } from "../api/ClienteService";
import { useNavigate } from "react-router-dom";
import { formatCPF, formatPhone } from "../utils/Formatters";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
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

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        clientes.map((cliente) => (
          <div
            key={cliente.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{cliente.nome}</h3>
            <p>
              <strong>CPF:</strong> {formatCPF(cliente.cpf)}
            </p>
            {cliente.email && (
              <p>
                <strong>Email:</strong> {cliente.email}
              </p>
            )}

            {cliente.telefones && cliente.telefones.length > 0 && (
              <div>
                <strong>Telefones:</strong>
                <ul>
                  {cliente.telefones?.map((tel, index) => (
                    <p key={index}>
                      <strong>{tel.tipo}:</strong>{" "}
                      {formatPhone(tel.numero, tel.tipo)}
                    </p>
                  ))}
                </ul>
              </div>
            )}

            {cliente.endereco && (
              <div>
                <strong>Endereço:</strong>
                <p>
                  {cliente.endereco.logradouro}, {cliente.endereco.complemento}
                  <br />
                  {cliente.endereco.bairro}, {cliente.endereco.cidade} -{" "}
                  {cliente.endereco.uf}
                  <br />
                  CEP: {cliente.endereco.cep}
                </p>
              </div>
            )}

            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={() => handleEditar(cliente.id)}
                style={{ marginRight: "1rem" }}
              >
                Editar
              </button>
              <button onClick={() => handleExcluir(cliente.id)}>Excluir</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClienteList;
