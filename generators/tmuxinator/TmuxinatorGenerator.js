import { Base } from 'yeoman-generator';
import config from '../config';
const HOME = process.env.HOME;
import path from 'path';
import jsYaml from 'js-yaml';

export default class TmuxinatorGenerator extends Base {
  prompting() {
    return config(this, [
      'shortName',
      'isReact',
    ]);
  }
  writing() {
    const { shortName, isReact } = this.props;
    const fileName = this.destinationPath(`.ide/${shortName}.yml`);
    const obj = {
      name: shortName,
      root: this.destinationRoot(),
      pre: `emacs --eval "(setq server-name \\"${shortName}\\")" --daemon`,
      startup_window: 'editor',
      windows: [
        { none: '' },
        { editor: `emacsclient -s ${shortName} ./` },
        { zsh: '' },
      ]
    };
    if (isReact) {
      const zsh = obj.windows.pop();
      obj.windows.push({ gulp: 'gulp dev'});
      obj.windows.push(zsh);
    }
    this.fs.write(fileName, jsYaml.dump(obj));
    this.fs.commit([], () => {
      this.spawnCommand('ln', [fileName, path.join(HOME, `.tmuxinator/${shortName}.yml`)]);
    });
  }
}
