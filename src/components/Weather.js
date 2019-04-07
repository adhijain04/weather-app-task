import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import { Button, Modal } from 'react-bootstrap';

class Weather extends Component {
	state={
		showForeCast: false
	}

	componentDidMount(){
		this.props.getWeather()
	}

	openPlaceHandler = (name) => {
		let foreCastData ;
		this.props.getFiveDaysForecast(name)
		this.setState({showForeCast: true})
	}

	handleClose = () => {
		this.setState({showForeCast: false})
	}

  render() {
  	console.log(this.props)
    return (
    	this.props.isPending === false ? (
	    	<div className='cities-container'>
	    		<Modal show={this.state.showForeCast} className='weather-forecast-modal' onHide={this.handleClose}>
	          <Modal.Header closeButton>
	            <Modal.Title className='cityName'>{this.props.cityName}</Modal.Title>
	          </Modal.Header>
	          <Modal.Body className='weather-foreCast-modal-body'>
	          	{this.props.isForeCastPending === false ? (
	          		this.props.forecastData.length ? this.props.forecastData.map((data, i) => {
		          		return(
		          			<div key={i} className='weather-details-contaier weather-forecast-contaier' onClick={this.openPlaceHandler.bind(this, data.name)}>
					    				<div className='weather-details weather-forecast'>
							      		<h1 className='place-name forecast-place-time'>{data.dt_txt}<span className='weather-desc forecast-desc'>({data.weather[0].description})</span></h1>
							      		<div className='temp-container forecast-temp-container'>
								      		<h4 className='high-temp'><i className="fas fa-temperature-high temp-icon"></i> {data.main.temp_max}</h4>
								      		<h4 className='low-temp'><i className="fas fa-temperature-low temp-icon"></i> {data.main.temp_min}</h4>
							      		</div>
							      	</div>
							      	<div className='weather-icon'>
							      		<img src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"} alt=""/>
							      	</div>
							      </div>
		          		)
		          	}): <div className='error-message-container'>
		          		<h4 className='forecast-data-error-message'>Sorry, Nothing to Forecast.</h4>
		          	</div>
	          	): <div className='forcast-loading-container'>
				    		<img src="/assets/loader-blue.svg" alt=""/>
				    		<h4>Fetching Data...</h4>
				    	</div>}
	          </Modal.Body>
	          <Modal.Footer>
	            <Button variant="secondary" onClick={this.handleClose}>
	              Close
	            </Button>
	          </Modal.Footer>
	        </Modal>
		  		{this.props.data.length ? this.props.data.map((data, i)=>{
		  			return (
		      		<div key={i} className='weather-details-contaier' onClick={this.openPlaceHandler.bind(this, data.name)}>
		    				<div className='weather-details'>
				      		<h1 className='place-name'>{data.name}<span className='weather-desc'>({data.weather[0].description})</span></h1>
				      		<div className='temp-container'>
					      		<h4 className='high-temp'><i className="fas fa-temperature-high temp-icon"></i> {data.main.temp_max}</h4>
					      		<h4 className='low-temp'><i className="fas fa-temperature-low temp-icon"></i> {data.main.temp_min}</h4>
				      		</div>
				      	</div>
				      	<div className='weather-icon'>
				      		<img src={"http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"} alt=""/>
				      	</div>
				      </div>
						)
		    	}): <div className='error-message-container'>
		    		<h4 className='data-error-message'>Sorry, No Data Available</h4>
		    	</div>}
	    	</div>
    	) : <div className='loading-container'>
    		<img src="/assets/loader-white.svg" alt=""/>
    		<h4>Fetching Data...</h4>
    	</div>
    );
  }
}

const MapStateToProps = state => {
	return {
		data: state.WeatherReducer.data,
		forecastData: state.WeatherReducer.forecastData,
		cityName: state.WeatherReducer.cityName,
		isPending: state.WeatherReducer.isPending,
		isForeCastPending: state.WeatherReducer.isForeCastPending,
	}
}

const MapDispatchToProps = dispatch => {
	return {
		getWeather: () => dispatch(actions.getWeather()),
		getFiveDaysForecast: (name) => dispatch(actions.getFiveDaysForecast(name)),
	}
}

export default connect(MapStateToProps, MapDispatchToProps)(Weather);