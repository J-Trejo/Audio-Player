import React, {Component} from 'react';
import Song from './Song';

class SongsList extends Component {
    render() {
        let songsJSX = this.props.songs.map((song) => {
            return <Song title={song.title}
                         source={song.source}
                         id={song.id}
                         playSong={this.props.playSong}
                         playing={this.props.playing} 
                         />;
        })
        
        return (
            <div className="list mx-auto">
                {songsJSX}
            </div>
        )
    }
}

export default SongsList;