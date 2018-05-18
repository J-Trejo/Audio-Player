import React, {Component} from 'react';
import Song from './Song'


class SongDetails extends Component {
    render() {
        const {match : {params}} = this.props;
        let song = {
            title: "",
            description: "",
            source:""
        }
        for (let i = 0; i < this.props.songs.length ; i++ ){
            if(this.props.songs[i].id === Number(params.songId)){
            song = {
                    title: this.props.songs[i].title,  
                    description: this.props.songs[i].description,
                    id: this.props.songs[i].id             
                };
            }
        }
        return (
            <div>
                <div className="songDetails mx-auto">
                    <h3>{song.title}</h3>
                    <p>{song.description}</p>
                    <div>
                        <button name={this.props.id} className="btn btn-warning" 
                        onClick={() => { this.props.playSong(song.id) }} >
                        <span className="fa fa-play" 
                        disabled={true}></span></button>
                    </div> 
                    
                </div>
            </div>
        )
    }
}

export default SongDetails;