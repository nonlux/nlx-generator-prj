
// import yeoman from 'yeoman-generator';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var HOME = process.env.HOME;
var path = require('path');

module.exports = yeoman.Base.extend({

    initializing: function() {
        this.composeWith('prj:tmuxinator');
        this.composeWith('prj:js');
    },
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the lovely ' + chalk.red('generator-prj') + ' generator!'
        ));

        var prompts = [{
            type: 'prompt',
            name: 'projectName',
            message: 'Project name:',
        }];

        return this.prompt(prompts).then(function (props) {
            this.props = Object.assign({}, props, this.props);
        this.config.set(this.props);
        }.bind(this));
    },

    prompting2: function () {
        var prompts = [
            {
                type: 'prompt',
                name: 'shortName',
                message: 'Project short name:',
                default: this.props.projectName,
            },
            {
                type: 'prompt',
                name: 'description',
                message: 'Description:',
                default:'',
            },
            {
                type: 'list',
                name: 'projectType',
                message: 'Type of project:',
                choices: ['shell', 'javascript'],
            },
            {
                type: 'prompt',
                name: 'isGithub',
                message: 'Publish on github?(y/n)',
                default: !true,
            },

        ];

        return this.prompt(prompts).then(function (props) {
            this.props = Object.assign({}, props, this.props);
            this.props.isGithub = this.props.isGithub === 'y' || this.props.isGithub === true;
        this.config.set(this.props);
        }.bind(this));
    },
    saveProps: function() {
        this.destinationRoot(path.join(HOME,'src', this.props.projectName));
        console.log(this.props)
        this.config.set(this.props);
        this.config.save();
    },

    writing: function () {
        this.log('Project path: ' + this.destinationRoot());
        if (!this.fs.exists( this.destinationPath('.git') )) {
            this.spawnCommandSync('git',['init']);
            if (this.props.isGithub) {
                this.spawnCommandSync('hub', ['create', '-d', this.props.description]);
            }
        }
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'),
            this.props
        );
    },

    install: function () {
    }
});
