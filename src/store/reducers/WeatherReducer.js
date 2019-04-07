let  initialState = {
	data : [],
	forecastData: [],
	isPending: false,
	weatherError: "",
	foreCastError: "",
	isForeCastPending: false,
	cityName: ""
}

const WeatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case "WEATHER_PENDING" :
			return {
				...state,
				isPending: true
			}
		case "WEATHER_SUCCESS" :
			return {
				...state,
				data: state.data.concat(action.value),
				isPending: false
			}
		case "WEATHER_FAILED" :
			return {
				...state,
				weatherError: action.data,
				isPending: false
			}
		case "WEATHER_FORECAST_PENDING" :
			return {
				...state,
				isForeCastPending: true,
				cityName: action.name,
			}
		case "WEATHER_FORECAST_SUCCESS" :
			return {
				...state,
				forecastData: action.value.slice(0, 5),
				cityName: action.name,
				isForeCastPending: false
			}
		case "WEATHER_FORECAST_FAILED" :
			return {
				...state,
				cityName: action.name,
				isForeCastPending: false,
				foreCastError: action.value
			}
		default:
			return state
	}
}

export default WeatherReducer;