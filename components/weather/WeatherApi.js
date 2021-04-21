import { cloud, humidity, lightning, rain, snow, sun} from '../../images';

const url = new URL('http://www.7timer.info/bin/civillight.php');
const params = {
  lon: 131.9,
  lat: 43.1,
  ac: 0,
  unit: 'metric',
  output: 'json',
  tzshift: 0,
};
Object.entries(params).forEach(
  ([key, value]) => url.searchParams.append(key, value)
);

function prependSign(temperature) {
  return (temperature > 0 ? '+' : '') + temperature;
}

function translateWeather(weather) {
  const dict = {
    'clear': 'Ясно',
    'pcloudy': 'Облачно',
    'mcloudy': 'Облачно',
    'cloudy': 'Облачно',
    'humid': 'Влажно',
    'lightrain': 'Дождь',
    'oshower': 'Дождь',
    'ishower': 'Дождь',
    'rain': 'Дождь',
    'snow': 'Снег',
    'rainsnow': 'Снег',
    'ts': 'Гроза',
    'tsrain': 'Гроза',
  };
  return dict[weather || 'clear'];
}

async function fetchTodayWeather() {
  const responce = await fetch(url);
  const json = await responce.json();
  const todayWeather = json.dataseries[0];
  
  const minTemperature = prependSign(todayWeather.temp2m.min) + '°C';
  const maxTemperature = prependSign(todayWeather.temp2m.max) + '°C';
  const averageTemperature = prependSign(
    Math.round(
      (todayWeather.temp2m.min + todayWeather.temp2m.max) / 2
    )  
  ) + '°C';  
  const windSpeed = todayWeather.wind10m_max + ' м/с';
  const condition = translateWeather(todayWeather.weather);

  return {
    average: averageTemperature,
    condition: {
      label: 'Состояние',
      content: condition,
    },  
    minTemperature: {
      label: 'Min. T',
      content: minTemperature,
    },
    maxTemperature: {
      label: 'Max. T',
      content: maxTemperature,
    },
    windSpeed: {
      label: 'Ветер',
      content: windSpeed,
    },
  }  
}

function getConditionImageSource(condition) {
  const dict = {
    'Ясно': sun,
    'Облачно': cloud,
    'Влажно': humidity,
    'Дождь': rain,
    'Снег': snow,
    'Гроза': lightning,
  }; 
  return dict[condition || 'Ясно'];
}

async function fetchWeekWeather() {
  const responce = await fetch(url);
  const json = await responce.json();

  let data = [];

  for (let item of json.dataseries) {

    let minTemperature = prependSign(item.temp2m.min);
    let maxTemperature = prependSign(item.temp2m.max);
    let windSpeed = item.wind10m_max.toString();
    
    let day = item.date.toString().slice(-2);
    day = Number(day).toString(); // get rid of starting 0
    
    let condition = translateWeather(item.weather);
    condition = getConditionImageSource(condition);

    data.push({
      minTemperature: minTemperature,
      maxTemperature, maxTemperature,
      windSpeed: windSpeed,
      day: day,
      condition: condition,
    });
  }

  return data;
}

export { fetchTodayWeather, fetchWeekWeather };