var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  // open the database
  let db = require('better-sqlite3')('codeday.db3');
  
  //get how much money was made
  foodCost = db.prepare('SELECT SUM(1) AS count FROM registrations;')
      .get().count * 1100;
  registrationProfit = db.prepare("SELECT SUM(ticket_cost) AS profit \
      FROM registrations;").get().profit;
  sponsorProfit = db.prepare('SELECT SUM(amount) as profit FROM sponsors;')
      .get().profit;
  var totalProfit = (sponsorProfit + registrationProfit - foodCost) / 100;

  
  //this counts all the entries where the person registered before
  //Febuary 2 at 12:00:00
  //Or registered before 40% of all registrations occurred
  var earlyBirdsRows = db.prepare('SELECT registered_at AS time \
      FROM registrations ORDER BY registered_at').all();

  var cutoff = earlyBirdsRows.length * .4;
  var earlyBirds = 0;
  for(var i = 0; i++, i < earlyBirdsRows.length;){
    if(i < cutoff || earlyBirdsRows[i].time <= 1549137600000) {
      earlyBirds++;
    }
  } 
  
  //this takes all the promo codes used and organizes them
  //the pie chart is generated in the html file
  var promoCodesDB = db.prepare('SELECT promo_code, SUM(1) AS count \
      FROM registrations GROUP BY promo_code')
      .all();

  var promoCodes = new Array(promoCodesDB.length);
  for(var i = 0; i < promoCodesDB.length; i++){
    var arr = new Array(2);
    arr[0] = promoCodesDB[i].promo_code;
    if(arr[0] == null){
      arr[0] = "No Code Used";
    }
    arr[1] = promoCodesDB[i].count;
    promoCodes[i] = arr;
  }
  
  //The number of people that actually checked in
  var checkIns = db.prepare('SELECT SUM(1) AS count FROM registrations \
      WHERE checked_in_at IS NOT NULL').get().count;


  //The number of people who registered per region, presented in a similar
  //way to the promo code pie chart    
  var registrationsDB = db.prepare('SELECT SUM(1) AS count, region_name \
      FROM registrations GROUP BY region_name').all();

  var registrations = new Array(registrationsDB.length);
  for(var i = 0; i < registrationsDB.length; i++){
    var arr = new Array(2);
    arr[0] = registrationsDB[i].region_name;
    arr[1] = registrationsDB[i].count;
    registrations[i] = arr;
  }  
      
  
  res.render('index', { title: 'SRND Data', 
      totalProfit: totalProfit,
      earlyBirds: earlyBirds,
      promoCodes: promoCodes,
      checkIns: checkIns,
      registrations: registrations
      });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});


module.exports = router;
