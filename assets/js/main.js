document.addEventListener('DOMContentLoaded', () => {
  const cepInput = document.getElementById('cep');
  const addressInput = document.getElementById('street');
  const neighborhoodInput = document.getElementById('neighborhood');
  const cityInput = document.getElementById('city');
  const stateInput = document.getElementById('state');

  function clearAddressFields() {
    addressInput.value = '';
    neighborhoodInput.value = '';
    cityInput.value = '';
    stateInput.value = '';
  }

  cepInput.addEventListener('blur', () => {
    let cep = cepInput.value.trim().replace(/\D/g, '');

    if (cep === '') {
      clearAddressFields();
      return;
    }

    const validCep = /^[0-9]{8}$/;
    if (!validCep.test(cep)) {
      clearAddressFields();
      alert('Formato de CEP inválido. Digite apenas os 8 dígitos.');
      return;
    }

    addressInput.value = 'Buscando...';
    neighborhoodInput.value = 'Buscando...';
    cityInput.value = 'Buscando...';
    stateInput.value = 'Buscando...';

    // Chamada à API do ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na requisição à API de CEP.');
        }
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          clearAddressFields();
          alert('CEP não encontrado.');
          return;
        }
        // Preenche os campos com o JSON retornado
        addressInput.value = data.logradouro || '';
        neighborhoodInput.value = data.bairro || '';
        cityInput.value = data.localidade || '';
        stateInput.value = data.uf || '';
      })
      .catch((err) => {
        clearAddressFields();
        console.error(err);
        alert('Não foi possível buscar o CEP. Tente novamente mais tarde.');
      });
  });
});
