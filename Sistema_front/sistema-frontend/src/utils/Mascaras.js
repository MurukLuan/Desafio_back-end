//essa foi criado apenas para a formatação em tempo de digitação
//formaters é apenas para o estatico.

export const formatarCPF = (valor) => {
  return valor
    .replace(/\D/g, '') // remove não números
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const removerMascaraCPF = (valor) => valor.replace(/\D/g, '');

export const formatarTelefone = (valor) => {
  const limpo = valor.replace(/\D/g, '');
  if (limpo.length <= 10) {
    return limpo.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1)$2-$3');
  } else {
    return limpo.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1)$2 $3-$4');
  }
};

export const removerMascaraTelefone = (valor) => valor.replace(/\D/g, '');

export const formatarCEP = (valor) => {
  return valor
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{0,3})/, '$1-$2')
    .substring(0, 9);
};

export const removerMascaraCEP = (valor) => valor.replace(/\D/g, '');
