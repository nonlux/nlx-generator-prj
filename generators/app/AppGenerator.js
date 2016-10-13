// import yeoman from 'yeoman-generator';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');
var jsYaml = require('js-yaml');
var config = require('../config');

module.exports = yeoman.Base.extend({
    initializing : function () {
        this.composeWith('prj:gitInit');
        this.composeWith('prj:gitIgnore');
        this.composeWith('prj:readme');
        this.composeWith('prj:tmuxinator');
        this.composeWith('prj:js');
    },
    prompting: function() {
        var generator = this;
        return config(generator, ['projectName'], true);
    },
    writing: function() {
    }
});
