const API_KEY = '0acfd168b9529003e6f7117fef463178';
export const getWeather = () => {
	return dispatch => {
		dispatch({type: "WEATHER_PENDING"})
		fetch(`https://api.openweathermap.org/data/2.5/find?lat=55.5&lon=37.5&cnt=10&appid=${API_KEY}&units=metric`, {
		// fetch(`https://samples.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=0acfd168b9529003e6f7117fef463178`, {
			method: "GET",
			mode: 'cors',
			cache: "no-cache",
			credentials: "same-origin",
		}).then((data) => data.json())
		.then((data) => {
			console.log(data);
			if(data.cod === "200") {
				dispatch({type: "WEATHER_SUCCESS", value: data.list})
			} else {
				dispatch({type: "WEATHER_FAILED", value: data.message})
			}
		})
	}
}

export const getFiveDaysForecast = (name) => {
	return dispatch => {
		dispatch({type: "WEATHER_FORECAST_PENDING", name})
		fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`, {
		// fetch(`https://samples.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=0acfd168b9529003e6f7117fef463178`, {
			method: "GET",
			mode: 'cors',
			cache: "no-cache",
			credentials: "same-origin",
		}).then((data) => data.json())
		.then((data) => {
			console.log(data)
			if(data.cod === "200") {
				dispatch({type: "WEATHER_FORECAST_SUCCESS", value: data.list, name })
			} else {
				dispatch({type: "WEATHER_FORECAST_FAILED", value: data.message, name})
			}
		})
	}
}