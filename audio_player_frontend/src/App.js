import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import axios from 'axios';
import './index.css'
  
class App extends Component {
	constructor(){
		super();
		this.state = {
			
			index: 0,
			playing: false,
			songs: [
				{
					source: '',
					title: '',
					description: '',
					Tempo: '',
					id: 0
				},
			]
		}

		this.playHandle = this.playHandle.bind(this);
		this.playSong = this.playSong.bind(this);
	}

//--------------------- Load songs from the server ------------------------------//

	componentDidMount(){
			axios.get('http://localhost:8080/songs')
			.then(results => {
				
				//console.log(results.data);
				let songsFromServer = results.data;
				//songsFromServer.push(results.data);
				//console.log(songsFromServer);

					this.setState({
						songs: songsFromServer,
					});
					//console.log(this.state.songs);
			})
			.catch(error => {
				console.log(error);
			});

		
	}

//---------------------  Check If song is playing to continue playing. else stop -----------//

	componentDidUpdate(prevProps, prevState){
		
		if (this.state.playing === true) {
			this.audioReference.play();
		}
		else{
			this.audioReference.pause();	
		}
	}

//---------------------  Play/Pause button from player  -----------//

	playHandle() { 
		//method 1 - get DOM object 
		//let audio = document.getElementsByTagName("audio")[0];
		// console.log(audio);
		// audio.play()
		// method 2 Using react ref attribute
		if(this.state.playing===false){
			this.audioReference.play();
			let playingState = true;
			this.setState({
				playing: playingState
			})
		}
		else{
		  this.audioReference.pause();
			let playingState = false;
			this.setState({
				playing: playingState
			})
		}

	}

//---------------------  Change songs -----------//

	changeSong(direction) {

		this.setState({
			index: this.state.index + direction
		});
	}

//---------------------  Individual song play button -----------//
	
	playSong(obj){
		this.setState({index:obj})
		this.audioReference.play();
		let playingState = true;
		this.setState({
			playing: playingState
		});
	}


	render() {

		let width = {
			width: '25%',
		}
	 
		
		return (
			<div className="App">
				<nav className="navbar navbar-expand-lg">
					<img className="navbar-brand" src="./listen.svg" alt="logo" />
					<ul className="navbar-nav mr-auto">
						<li className="nav-item"><Link className="nav-link" to="/">Songs List</Link></li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/" render={(props) => <SongsList songs={this.state.songs} playSong={this.playSong} playing={this.state.playing} match={props.match}/>}/>
					<Route path='/:songId' render={(props) => <SongDetails songs={this.state.songs} playSong={this.playSong} playing={this.state.playing}  match={props.match} />}/>
				</Switch>
				<div> 
					<audio ref={(audioObj) => { this.audioReference = audioObj }} src={this.state.songs[this.state.index % this.state.songs.length].source }></audio>
					
					<div id="footer">
						<div className="play mx-auto">
							<button className="btn btn-secondary" onClick={() => { this.changeSong(-1) }} disabled={this.state.index===0}><span className="fa fa-step-backward"></span></button>
							<button className={this.state.playing === false ? "btn btn-warning" : "btn btn-danger"} onClick={this.playHandle}><span className={this.state.playing === false ? "fa fa-play" : "fa fa-pause" }></span></button>
							<button className="btn btn-secondary" onClick={() => { this.changeSong(+1) }}><span className="fa fa-step-forward"></span></button>
							<p className="mx-auto"> Now Playing: {this.props.songs[this.state.index % this.props.songs.length].title}</p>
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
