const url = new URL('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/');

async function fetchCurrency(from, to) {
  const responce = await fetch(`${url}${from}/${to}.json`);
  const json = await responce.json();
  
  let currency = json[to];
  currency = Number.parseFloat(currency);
  currency = currency.toFixed(2);
  return currency;
}

export default fetchCurrency;