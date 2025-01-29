import 'dotenv/config';
import axios from 'axios';

export async function getTweets(userName) {
const options = {
  method: 'GET',
  url: 'https://twitter-api45.p.rapidapi.com/timeline.php',
  params: {
    screenname:userName
  },
  headers: {
    'x-rapidapi-key': process.env.X_RAPID_API_KEY,
    'x-rapidapi-host': process.env.X_RAPID_API_HOST
  }
};

try {
	const {data} = await axios.request(options);
    return data;
} catch (error) {
	console.error(error.message);
    throw error;
}
}
