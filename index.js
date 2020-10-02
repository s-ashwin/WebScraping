const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const {Parser} = require("json2csv");

(async()=>{
    let data = [];
    const response = await request({
        uri: "https://www.imdb.com/title/tt0816692/?ref_=fn_al_tt_1",
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7"
        }
    });

    const $ = cheerio.load(response);
    const title = $('div[class="title_wrapper"] > h1').text().trim();
    const duration = $('time').html().trim();
    const rating = $('div[class="ratingValue"] > strong > span').text();

    data.push({
        title,duration,rating
    })

    try {
        const parser = new Parser();
        const csv = parser.parse(data);
        console.log(csv);
        fs.writeFileSync("./imdb.csv", csv)
      } catch (err) {
        console.error(err);
      }
      

}
)();