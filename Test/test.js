const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/radio/%7Bid%7D',
    headers: {
      'X-RapidAPI-Key': 'c881be367cmsh530559a7c807722p1c78e0jsn8b384705180b',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};

const songs = fetch('https://deezerdevs-deezer.p.rapidapi.com/radio/%7Bid%7D',options).then((resp)=>resp.json()).then((data)=>console.log(data));
console.log(songs);