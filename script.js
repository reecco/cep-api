let content = document.getElementById('content')
let inputCepStyle = document.getElementById('cep')
document.getElementById('cep').placeholder = '00000-000'

const queryCEP = async () => {
  let inputCep = document.getElementById('cep').value

  if (inputCep == '' || inputCep == ' ') {
    document.getElementById('message').innerHTML = 'O campo não pode estar vazio.'
    inputCepStyle.style.border = '2px solid red'

    setTimeout(() => {
      inputCepStyle.style.border = ''
      document.getElementById('message').innerHTML = ''
    }, 5000)
  }

  const res = await fetch(`https://viacep.com.br/ws/${inputCep}/json/`)
    .then(res => res.json())
    .then(data => {
      return data
    })

  if (res.erro) {
    alert('O CEP digitado é inválido.')
  } else {
    content.innerHTML = `
    <div class="container-content">
      <div class="box">
        <label class="label-title">CEP</label>
        <input class="input" type="text" id="input-cep" value="${res.cep}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-cep')">
      </div>
      <div class="box">
        <label class="label-title">Logradouro</label>
        <input class="input" id="input-rua" value="${res.logradouro}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-rua')">
      </div>
      <div class="box">
        <label class="label-title">Bairro</label>
        <input class="input" id="input-bairro" value="${res.bairro}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-bairro')">
      </div>
      <div class="box">
        <label class="label-title">Cidade</label>
        <input class="input" id="input-cidade" value="${res.localidade}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-cidade')">
      </div>
      <div class="box">
        <label class="label-title">UF</label>
        <input class="input" id="input-uf" value="${res.uf}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-uf')">
      </div>
      <div class="box">
        <label class="label-title">DDD</label>
        <input class="input" id="input-ddd" value="${res.ddd}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-ddd')">
      </div>
      <div class="box">
        <label class="label-title">IBGE</label>
        <input class="input" id="input-ibge" value="${res.ibge}" readonly>
        <input type="button" value="Copiar" class="btn-copy" onclick="copy('input-ibge')">
      </div>
    </div>
    `
    document.getElementById('cep').value = ''
  }
}

function copy(id) {
  let textBox = document.getElementById(id)
  textBox.select();
  document.execCommand("copy");
  alert(`Copiado: ${textBox.value}`)
}