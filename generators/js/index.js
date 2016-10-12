var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');

module.exports = yeoman.Base.extend({

  initializing: function() {
  },

  writing: function () {
      if (this.config.get('projectType') === 'javascript') {
          this.spawnCommandSync('npm', ['init', '-f']);
          var config = {
            version: "0.0.1",
            license:  "MIT",
            author: "nonlux <nonluxi@gmail.com>",
          };
          this.fs.extendJSON(this.destinationPath('package.json'), config);
      }
  },

  install: function () {
  }
});
