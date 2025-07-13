import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  formatarCPF,
  removerMascaraCPF,
  formatarCEP,
  removerMascaraCEP,
  formatarTelefone,
  removerMascaraTelefone,
} from '../utils/Mascaras';
import Container from '../components/Container';
import { buscarClientePorId, atualizarCliente } from '../api/ClienteService';

const ClienteEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dados: '',
    email: [''],
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    tipoTelefone: [''],
    numeroTelefone: [''],
  });
  const [erroEmail, setErroEmail] = useState(null);

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const response = await buscarClientePorId(id);
        const cliente = response.data;

        setForm({
          nome: cliente.nome || '',
          cpf: formatarCPF(cliente.cpf || ''),
          dados: cliente.dados || '',
          email: cliente.emails?.map(e => e.email) || [''],
          cep: formatarCEP(cliente.endereco?.cep || ''),
          logradouro: cliente.endereco?.logradouro || '',
          complemento: cliente.endereco?.complemento || '',
          bairro: cliente.endereco?.bairro || '',
          cidade: cliente.endereco?.cidade || '',
          uf: cliente.endereco?.uf || '',
          tipoTelefone: cliente.telefones?.map(t => t.tipo) || [''],
          numeroTelefone: cliente.telefones?.map(t => formatarTelefone(t.numero || '', t.tipo)) || [''],
        });
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        alert('Erro ao carregar cliente.');
      }
    };

    carregarCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormattedChange = async (e, formatter, field, index = null) => {
    let { value } = e.target;
    if (field === 'numeroTelefone') {
      const apenasNumeros = value.replace(/\D/g, '');
      if (apenasNumeros.length > 11) return;
    }

    const formatted = formatter(value);

    if (index !== null) {
      setForm(prev => {
        const updated = [...prev[field]];
        updated[index] = formatted;
        return { ...prev, [field]: updated };
      });
    } else {
      setForm(prev => ({ ...prev, [field]: formatted }));
    }

    if (field === 'cep' && formatted.replace(/\D/g, '').length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formatted.replace(/\D/g, '')}/json/`);
        const data = await response.json();
        if (data.erro) {
          alert('CEP não localizado');
        } else {
          setForm(prev => ({
            ...prev,
            logradouro: data.logradouro || '',
            complemento: data.complemento || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            uf: data.uf || '',
          }));
        }
      } catch (err) {
        alert('Erro ao buscar CEP');
      }
    }
  };

  const validarEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.email.some(e => !validarEmail(e))) {
      setErroEmail('E-mail inválido');
      return;
    }

    const payload = {
      nome: form.nome,
      cpf: removerMascaraCPF(form.cpf),
      dados: form.dados,
      endereco: {
        cep: removerMascaraCEP(form.cep),
        logradouro: form.logradouro,
        complemento: form.complemento,
        bairro: form.bairro,
        cidade: form.cidade,
        uf: form.uf,
      },
      emails: form.email.map(e => ({ email: e })),
      telefones: form.numeroTelefone.map((numero, i) => ({
        tipo: form.tipoTelefone[i],
        numero: removerMascaraTelefone(numero),
      })),
    };

    try {
      await atualizarCliente(id, payload);
      alert('Cliente atualizado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente.');
    }
  };

  const adicionarTelefone = () => {
    setForm(prev => ({
      ...prev,
      tipoTelefone: [...prev.tipoTelefone, ''],
      numeroTelefone: [...prev.numeroTelefone, ''],
    }));
  };

  const adicionarEmail = () => {
    setForm(prev => ({
      ...prev,
      email: [...prev.email, ''],
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '8px',
  };

  return (
    <div style={{ backgroundColor: '#e0f2ff', minHeight: '100vh', paddingTop: '40px' }}>
      <Container>
        <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center' }}>Editar Cliente</h2>

          <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required style={inputStyle} />
          <input type="text" name="cpf" value={form.cpf} onChange={(e) => handleFormattedChange(e, formatarCPF, 'cpf')} placeholder="CPF" required style={inputStyle} />
          <input type="text" name="dados" value={form.dados} onChange={handleChange} placeholder="Dados" style={inputStyle} />

          {form.email.map((email, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...form.email];
                  newEmails[index] = e.target.value;
                  setForm(prev => ({ ...prev, email: newEmails }));
                }}
                placeholder="Email"
                required
                style={{ flex: 1, ...inputStyle }}
              />
              {index === 0 && (
                <button type="button" onClick={adicionarEmail} style={{ height: '35px' }}>+</button>
              )}
            </div>
          ))}
          {erroEmail && <p style={{ color: 'red' }}>{erroEmail}</p>}

          <input type="text" name="cep" value={form.cep} onChange={(e) => handleFormattedChange(e, formatarCEP, 'cep')} placeholder="CEP" required style={inputStyle} />
          <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} placeholder="Logradouro" style={inputStyle} />
          <input type="text" name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" style={inputStyle} />
          <input type="text" name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" style={inputStyle} />
          <input type="text" name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" style={inputStyle} />
          <input type="text" name="uf" value={form.uf} onChange={handleChange} placeholder="UF" maxLength={2} style={inputStyle} />

          {form.numeroTelefone.map((numero, index) => (
            <div key={index}>
              <select
                value={form.tipoTelefone[index]}
                onChange={(e) => {
                  const newTipos = [...form.tipoTelefone];
                  newTipos[index] = e.target.value;
                  setForm(prev => ({ ...prev, tipoTelefone: newTipos }));
                }}
                style={{ ...inputStyle, margin: '7px 0' }}
              >
                <option value="">Tipo de Telefone</option>
                <option value="CELULAR">Celular</option>
                <option value="FIXO">Fixo</option>
                <option value="COMERCIAL">Comercial</option>
              </select>
              <input
                type="text"
                value={numero}
                onChange={(e) => handleFormattedChange(e, formatarTelefone, 'numeroTelefone', index)}
                placeholder="Número de Telefone"
                required
                style={{ ...inputStyle, margin: '7px 0' }}
              />
            </div>
          ))}

          <button type="button" onClick={adicionarTelefone} style={{ marginBottom: '10px' }}>Adicionar outro telefone</button>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '15px' }}>
            <button type="submit" style={{ flex: 1, backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px', borderRadius: '8px' }}>
              Atualizar
            </button>
            <button type="button" onClick={() => navigate('/clientes')} style={{ flex: 1, backgroundColor: 'gray', color: 'white', border: 'none', padding: '10px', borderRadius: '8px' }}>
              Cancelar
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default ClienteEdit;
