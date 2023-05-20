const button = document.getElementById("convert-button");
const select = document.getElementById("currency-select");

const dolarApiUrl = "https://economia.awesomeapi.com.br/json/USD-BRL";
const euroApiUrl = "https://economia.awesomeapi.com.br/json/EUR-BRL";
const bitcoinApiUrl = "https://economia.awesomeapi.com.br/json/BTC-BRL";
const ieneApiUrl = "https://economia.awesomeapi.com.br/json/JPY-BRL";

let dolar;
let euro;
let bitcoin;
let iene;

const fetchRates = async () => {
  try {
    const responseDolar = await fetch(dolarApiUrl);
    const dataDolar = await responseDolar.json();
    dolar = parseFloat(dataDolar[0].bid);
    console.log(dolar);
    const responseEuro = await fetch(euroApiUrl);
    const dataEuro = await responseEuro.json();
    euro = parseFloat(dataEuro[0].bid);
    const responseBitcoin = await fetch(bitcoinApiUrl);
    const dataBitcoin = await responseBitcoin.json();
    bitcoin = parseFloat(dataBitcoin[0].bid);
    const responseIene = await fetch(ieneApiUrl);
    const dataIene = await responseIene.json();
    iene = parseFloat(dataIene[0].bid);
    changeCurrency(); // chama a função changeCurrency() quando as taxas são buscadas
  } catch (error) {
    console.log("Error fetching exchange rates:", error);
  }
};

fetchRates();

const convertValues = () => {
  const inputReais = document.getElementById("input-real").value;
  const realValueText = document.getElementById("real-value-text");
  const currencyValueText = document.getElementById("currency-value-text");

  realValueText.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputReais);

  if (select.value === "US$ Dólar Americano") {
    currencyValueText.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputReais / dolar);
  }

  if (select.value === "€ Euro") {
    currencyValueText.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputReais / euro);
  }

  if (select.value === "฿ Bitcoin") {
    currencyValueText.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BTC",
    }).format(inputReais / bitcoin);
  }

  if (select.value === "¥ Iene") {
    currencyValueText.innerHTML = new Intl.NumberFormat("jp-JP", {
      style: "currency",
      currency: "JPY",
    }).format(inputReais / iene);
  }
};

changeExchangeRate = () => {
  const exchangeRate = document.getElementById("exchange-rate");
  exchangeRate.innerHTML = dolar;
};

changeCurrency = () => {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.getElementById("currency-img");
  const exchangeRate = document.getElementById("exchange-rate");

  if (select.value === "€ Euro") {
    currencyName.innerHTML = "Euro";
    currencyImage.src = "./assets/euro.png";
    exchangeRate.innerHTML = `Cotação atual: R$${euro.toFixed(2)}`;
  }

  if (select.value === "US$ Dólar Americano") {
    currencyName.innerHTML = "Dólar Americano";
    currencyImage.src = "./assets/estados-unidos.png";
    exchangeRate.innerHTML = `Cotação atual: R$${dolar.toFixed(2)}`;
  }

  if (select.value === "฿ Bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImage.src = "./assets/bitcoin.png";
    exchangeRate.innerHTML = `Cotação atual: ${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(bitcoin)}`;
  }

  if (select.value === "¥ Iene") {
    currencyName.innerHTML = "Iene";
    currencyImage.src = "./assets/japao.png";
    exchangeRate.innerHTML = `Cotação atual: ${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(iene)}`;
  }

  convertValues();
};

button.addEventListener("click", convertValues, changeExchangeRate);
select.addEventListener("change", changeCurrency);
