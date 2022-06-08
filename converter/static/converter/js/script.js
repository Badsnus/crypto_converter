let first_input = document.getElementById('first_input');
let second_input = document.getElementById('second_input');

let first_select = document.getElementById('first_select');
let second_select = document.getElementById('second_select');

let first_currency_title = document.getElementById('first_currency_title');
let second_currency_title = document.getElementById('second_currency_title');

let fiat_first_usd = document.getElementById('fiat_first_usd');
let fiat_first_eur = document.getElementById('fiat_first_eur');
let fiat_first_rub = document.getElementById('fiat_first_rub');


let fiat_second_usd = document.getElementById('fiat_second_usd');
let fiat_second_eur = document.getElementById('fiat_second_eur');
let fiat_second_rub = document.getElementById('fiat_second_rub');

var get_currency_names = () => {
    let first_currency_name = 0
    let second_currency_name = 0
    for(var i in currencies){
        if (currencies[i] === first_currency_title.textContent) {
            first_currency_name = i;
        };
        if (currencies[i] === second_currency_title.textContent) {
            second_currency_name = i;
        }
      };
    let first_currency_price = currencies_price[first_currency_name]
    let second_currency_price = currencies_price[second_currency_name]
    return [first_currency_price, second_currency_price]
}


var change_fiat_price = (item) => {
    fiat_first_usd.textContent = item[0]['usd'] +  ' USD/' + first_select.value
    fiat_first_eur.textContent = item[0]['eur'] +  ' EUR/' + first_select.value
    fiat_first_rub.textContent = item[0]['rub'] +  ' RUB/' + first_select.value

    fiat_second_usd.textContent = item[1]['usd'] + ' USD/' + second_select.value
    fiat_second_eur.textContent = item[1]['eur'] + ' EUR/' + second_select.value
    fiat_second_rub.textContent = item[1]['rub'] + ' RUB/' + second_select.value
}


first_input.addEventListener('input', () => 
{ 
    let item = get_currency_names()
    second_input.value = item[0]['usd'] / item[1]['usd'] * first_input.value
});

second_input.addEventListener('input', () => 
{ 
    let item = get_currency_names()
    first_input.value = item[1]['usd'] / item[0]['usd'] * second_input.value
});

first_select.addEventListener('change', () => 
{ 
    first_currency_title.textContent = first_select.value;
    let item = get_currency_names()
    first_input.value = item[1]['usd'] / item[0]['usd'] * second_input.value
    change_fiat_price(item)
});

second_select.addEventListener('change', () => 
{ 
    second_currency_title.textContent = second_select.value;
    let item = get_currency_names()
    second_input.value = item[0]['usd'] / item[1]['usd'] * first_input.value
    change_fiat_price(item)
});



let usd_radio = document.getElementById('option1')
let eur_radio = document.getElementById('option2')
let rub_radio = document.getElementById('option3')

var update_selected = (name) => {
    var response = new XMLHttpRequest();
    response.open("POST", "/update_selected", true);
    response.send(name);
}


usd_radio.addEventListener('change', () => 
{ 
    if (fiat_first_usd.style.display === 'none'){
        fiat_first_usd.style.display = 'block'
        fiat_second_usd.style.display = 'block'
    }else {
        fiat_first_usd.style.display='none'
        fiat_second_usd.style.display='none'
    }
    update_selected('usd')
});

eur_radio.addEventListener('change', () => 
{ 
    if (fiat_first_eur.style.display === 'none'){
        fiat_first_eur.style.display = 'block'
        fiat_second_eur.style.display = 'block'
    }else {
        fiat_first_eur.style.display='none'
        fiat_second_eur.style.display='none'
    }
    update_selected('eur')
});

rub_radio.addEventListener('change', () => 
{ 
    if (fiat_first_rub.style.display === 'none'){
        fiat_first_rub.style.display = 'block'
        fiat_second_rub.style.display = 'block'
    }else {
        fiat_first_rub.style.display='none'
        fiat_second_rub.style.display='none'
    }
    update_selected('rub')
});