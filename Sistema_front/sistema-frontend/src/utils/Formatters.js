// Formata CPF: 12345678910 => 123.456.789-10
export function formatCPF(cpf) {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

// Formata número de telefone
export function formatPhone(numero, tipo) {
  const cleaned = numero.replace(/\D/g, '');

  if (tipo === 'CELULAR') {
    return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1)$2 $3-$4');
  } else {
    return cleaned.replace(/^(\d{2,3})(\d{4})(\d{4})$/, '($1)$2-$3');
  }
}

// Formata CEP: 12345678 => 12345-678
export function formatCEP(cep) {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
