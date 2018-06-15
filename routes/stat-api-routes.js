var path = require("path")
var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = function(app) {
  app.get("/api/stats/goals", function(req, res) {
    db.sequelize.query('SELECT player, sum(goals) AS goals FROM Rosters WHERE goals > 0 GROUP BY player;')
    .then(function(dbStats) {
    // console.log(dbStats);

      res.json(dbStats[0]);
      });
    });
/*
    app.get("/api/rosters/game/:game_id/players", function(req, res) {
      db.sequelize.query('SELECT DISTINCT shortname,Rosters.id, Rosters.captain1Pick, Rosters.captain2Pick, player_level AS level FROM Rosters INNER JOIN Players ON Rosters.player = Players.shortname WHERE GameId=? AND availability=true ORDER BY shortname ASC',
      {replacements: [req.params.game_id], type: db.sequelize.QueryTypes.SELECT
        }).then(function(dbRoster) {
          res.json(dbRoster);
          });
        });
*/


      /*

    // SELECT player, sum(goals) FROM Rosters WHERE goals > 0 GROUP BY player ORDER BY player ASC;
    app.get("/api/stats", function(req, res) {
      db.Stat.findAll({}).then(function(dbStat) {
      console.log(dbStat);
      
        res.json(dbStat);
        });
      });

  app.get("/api/stats/:id", function(req, res) {
    db.Stat.findAll({
      where: {GameId: req.params.id}
    }).then(function(dbStat) {
      res.json(dbStat);
      });  
    });

  app.post("/api/stats/:id/goal", function(req, res) {
    db.Stat.create({
      team: req.body.team,
      goal_scorer: req.body.goal_scorer,
      GameId: req.body.GameId
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
        });
      });
    
  app.put("/api/stats/:id", function(req, res) {
    db.Stat.update({
      team: req.body.team, 
      goal_scorer: req.body.goal_scorer,
      goal_assist: req.body.goal_assist,
      },
      {
      returning: true,
      where: {id: req.params.id}
      })
      .then(function(dbPlayer) {
        res.json(dbPlayer);
        });
      });


  app.delete("/api/stats/:id", function(req, res) {
    db.Stat.destroy({
      where: {id: req.params.id}
      })
      .then(function(dbStat) {
      res.json(dbStat);
      });
    });*/

};