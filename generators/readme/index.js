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
        return config(generator, ['projectName',  'description']);
    },
    writing: function() {
      this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this.props
      );
    }
});
