const express = require('express'),
      app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

const songs = [
        {   
            source:'/upstep.mp3', 
            title:'Upstep', 
            description:'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches.',
            Tempo: '140bpm', 
            id:0
        },
        {
            source: '/olympian.mp3',
            title: 'Olympian',
            description: 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme.',
            Tempo: '130bpm',
            id: 1
        },
        {
            source: '/transmission.mp3',
            title: 'Transmission',
            description: 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar.',
            Tempo: '120bpm',
            id: 2
        },
    
];

app.get('/songs', (req, res) => {
    console.log(songs);
    res.json(songs);
});

app.listen(8080, () => {

    console.log('listening on 8080');
});