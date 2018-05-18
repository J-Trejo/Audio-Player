import React, { Component } from 'react';
import { Link }from 'react-router-dom';


class Song extends Component {
    render() {

        

       
        return (
            <div>
                <Link to={'/'+ this.props.id}><h2>{this.props.title}</h2></Link>
                <p>{this.props.description}</p>
                    <div>
                        <button name={this.props.id} 
                            className=" btn btn-warning" 
                            onClick={() => { this.props.playSong(this.props.id) }}>
                            <span className="fa fa-play"></span>
                        </button>
                    </div>
                <hr />
            </div>
        )
    }
}

export default Song;