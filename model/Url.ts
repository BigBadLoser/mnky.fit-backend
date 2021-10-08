
class Url {
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  timesClicked: number;
  constructor(urlCode = "", longUrl = "", shortUrl = "", timesClicked = 0){
    this.urlCode = urlCode;
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
    this.timesClicked = timesClicked;
  };
};
  
export default Url