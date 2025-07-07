// === script.js ===

// Interação com FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('.faq-answer');
    const isVisible = answer.style.display === 'block';
    document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
    answer.style.display = isVisible ? 'none' : 'block';
  });
});

// Envio de formulário para WhatsApp
const form = document.getElementById('orderForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const curso = document.getElementById('curso').value;
  const pagamento = document.getElementById('pagamento').value;
  let parcelas = '';
  const selectParcelas = document.getElementById('parcelas');

  if (pagamento === 'Cartão de Crédito' && selectParcelas) {
    parcelas = selectParcelas.value;
  }

  const mensagem = `Olá, meu nome é *${nome}*.%0AQuero me inscrever no *${curso}* com a forma de pagamento: *${pagamento}${parcelas ? ' - ' + parcelas : ''}*.`;

  
  const numeroWhatsApp = '5521968219628';
  const link = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
  window.open(link, '_blank');
});

// Mostrar parcelas se cartão selecionado
const pagamentoSelect = document.getElementById('pagamento');
pagamentoSelect.addEventListener('change', function () {
  const parcelasBox = document.getElementById('parcelas-box');
  if (this.value === 'Cartão de Crédito') {
    parcelasBox.style.display = 'block';
  } else {
    parcelasBox.style.display = 'none';
  }
});

// Depoimentos com formulário e localStorage
const btnAddDepoimento = document.getElementById('addDepoimento');
const formDepoimento = document.getElementById('formDepoimento');
const nomeDepo = document.getElementById('nomeDepoimento');
const textoDepo = document.getElementById('textoDepoimento');
const containerDepo = document.querySelector('.depoimentos');

formDepoimento.addEventListener('submit', e => {
  e.preventDefault();
  if (nomeDepo.value && textoDepo.value) {
    const novo = document.createElement('div');
    novo.classList.add('depoimento');
    novo.innerHTML = `<p><strong>${nomeDepo.value}:</strong> ${textoDepo.value}</p>`;
    containerDepo.insertBefore(novo, formDepoimento);

    const salvos = JSON.parse(localStorage.getItem('depoimentosExtra') || '[]');
    salvos.push({ nome: nomeDepo.value, texto: textoDepo.value });
    localStorage.setItem('depoimentosExtra', JSON.stringify(salvos));

    nomeDepo.value = '';
    textoDepo.value = '';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const extras = JSON.parse(localStorage.getItem('depoimentosExtra') || '[]');
  extras.forEach(dep => {
    const novo = document.createElement('div');
    novo.classList.add('depoimento');
    novo.innerHTML = `<p><strong>${dep.nome}:</strong> ${dep.texto}</p>`;
    containerDepo.insertBefore(novo, formDepoimento);
  });
});

