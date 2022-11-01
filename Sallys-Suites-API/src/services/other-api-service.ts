import axios from 'axios'

const options = (method: String, url: String): Object => {
  return {
    method: method,
    url: `https://free-nba.p.rapidapi.com/${url}`,
    params: { page: '0', per_page: '25' },
    headers: {
      'X-RapidAPI-Key': '27263435femshf27333c4b094968p1e18cajsnf5379626f01f',
      'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    }
  }
}

const getBasketBallData = async () => {

  const dataOrWhateverItIs: any = axios.request(options('GET', 'players')).then((response) => {

    return response.data

  }).catch((error) => {

    return error

  });

  return dataOrWhateverItIs
  //return someOtherService.doSomeOtherStuff(dataOrWhateverItIs)


};

// **** Export default **** //

export default {
  getBasketBallData
} as const;

