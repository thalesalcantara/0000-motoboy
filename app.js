document.getElementById('formulario').innerHTML = `
  <form>
    <label>Tipo:
      <select>
        <option>Enviando</option>
        <option>Recebendo</option>
      </select>
    </label><br/>
    <label>Nome de quem envia: <input type="text" /></label><br/>
    <label>Nome de quem recebe: <input type="text" /></label><br/>
    <label>Temperatura: <input type="text" /></label><br/>
    <label>Local de envio: <input type="text" /></label><br/>
    <label>Local de recebimento: <input type="text" /></label><br/>
    <label>Hora atual: <input type="text" value="${new Date().toLocaleTimeString()}" /></label><br/>
    <button type="submit">Salvar</button>
  </form>
`;