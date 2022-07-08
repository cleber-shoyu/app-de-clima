document.querySelector('.busca').addEventListener('click',  async (event) => {
    event.preventDefault();

    let cidad = document.querySelector('#texto').value;
    
    if(cidad !== ''){
        mensagem('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidad)}&appid=e09b5a59dd452d295fe7bbbe9d01245c&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            info({
                cidade: json.name,
                país: json.sys.country,
                vento: json.wind.speed,
                clima: json.main.temp,
                umidade: json.main.humidity,
                maxima: json.main.temp_max,
                minima: json.main.temp_min,
                description: json.weather[0].description,
                icon: json.weather[0].icon,
            });
        } else{
            cleaninfo();
            mensagem('Não encontramos esta localização.');
        }
          
    }
});
function mensagem(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function info(json){
      mensagem('');
      document.querySelector('.país').innerHTML = `País: ${json.país}`;
      document.querySelector('.cidade').innerHTML = `Cidade: ${json.cidade}`;
      document.querySelector('.vento').innerHTML = `Vento: ${json.vento} KM`;
      document.querySelector('.clima').innerHTML = `Clima: ${json.clima}Cº`;
      document.querySelector('.umidade').innerHTML = `Umidade: ${json.umidade}`;
      document.querySelector('.maxima').innerHTML = `Maxima: ${json.maxima}`;
      document.querySelector('.minima').innerHTML = `Minima: ${json.minima}`;
      document.querySelector('.descricao').innerHTML = `Descrição: ${json.description}`;
      document.querySelector('.icone img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`);
      document.querySelector('.infos').style.display = 'block';
}