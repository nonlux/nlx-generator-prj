var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');
var jsYaml = require('js-yaml');
var config = require('../config');

module.exports = yeoman.Base.extend({
    initializing : function () {
    },
    prompting: function() {
        var generator = this;
        return config(generator, ['projectName', 'isGithub', 'description']);
    },
    writing: function() {
      if (!this.fs.exists( this.destinationPath('.git') )) {
        this.spawnCommandSync('git',['init']);
      }
      if (this.props.isGithub) {
        this.spawnCommandSync('hub', ['create', '-d', this.props.description]);
      }
    }
});
