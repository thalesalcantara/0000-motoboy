function buscarEndereco() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');
  if (cep.length !== 8) return alert("CEP inválido");
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) return alert("CEP não encontrado");
      document.getElementById('rua').value = data.logradouro;
      document.getElementById('bairro').value = data.bairro;
      document.getElementById('cidade').value = data.localidade;
    });
}

function enviarParaWhatsApp() {
  const nome = document.getElementById('nomeSolicitante').value;
  const tel = document.getElementById('telefoneSolicitante').value;
  const rua = document.getElementById('rua').value;
  const numero = document.getElementById('numero').value;
  const bairro = document.getElementById('bairro').value;
  const cidade = document.getElementById('cidade').value;
  const complemento = document.getElementById('complemento').value;
  const referencia = document.getElementById('referencia').value;
  const nomeRecebedor = document.getElementById('nomeRecebedor').value;
  const telRecebedor = document.getElementById('telefoneRecebedor').value;
  const outrosDesc = document.getElementById('outrosDescricao').value;

  let servicos = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
    .filter(el => el.id !== 'temRetorno')
    .map(cb => cb.value || outrosDesc);

  let pagamentos = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
    .filter(el => ['Pix','Dinheiro','Contrato'].includes(el.value))
    .map(cb => cb.value);

  const retorno = document.getElementById('temRetorno').checked ? "Sim" : "Não";
  const acao = document.querySelector('input[name="acao"]:checked').value;

  let msg = `📦 *COOPEX ENTREGAS - ${acao}*\n`;
  msg += `👤 *Solicitante:* ${nome}\n📞 *Telefone:* ${tel}\n`;
  msg += `🏠 *Endereço:* ${rua}, ${numero}, ${bairro}, ${cidade}\n`;
  if (complemento) msg += `📌 *Complemento:* ${complemento}\n`;
  if (referencia) msg += `📍 *Referência:* ${referencia}\n`;
  if (nomeRecebedor) msg += `🎯 *Recebedor:* ${nomeRecebedor}\n`;
  if (telRecebedor) msg += `📱 *Tel Recebedor:* ${telRecebedor}\n`;
  msg += `🛠️ *Serviço:* ${servicos.join(", ")}\n`;
  msg += `💰 *Pagamento:* ${pagamentos.join(", ")}\n`;
  msg += `🔁 *Retorno:* ${retorno}`;

  const url = `https://wa.me/5584981110706?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}