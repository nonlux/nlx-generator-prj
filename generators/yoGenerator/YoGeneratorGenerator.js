import { Base } from 'yeoman-generator';
import config, { promptLocal }  from '../config';
import {capitalizeFirstLetter, switchToEditor} from '../utils';
const { PWD } = process.env;

export default class JsGenerator extends Base {
  initializing() {
  //  this.composeWith('prj:gitIgnore');
  }
  prompting() {
    return config(this, [
      'shortName',
    ]);
  }
  promptingLocal() {
    return promptLocal(this, {
      role: () => {
        return {
          type: 'prompt',
          name: 'generator',
          message: 'Generator name:',
        };
      },
    });
  }
  writing() {
    const generatorName = capitalizeFirstLetter(this.props.generator);
    const {generator, shortName} = this.props;
    const generatorPath = this.destinationPath(`generators/${generator}/`);
    const generatorClassPath = `${generatorPath}/${generatorName}Generator.js`;
    const props = {
      ...this.props,
      generatorName,
      generatorClassPath,
      generatorPath,
    };
    this.fs.copyTpl(
      this.templatePath('index.js'),
      `${generatorPath}/index.js`,
      props
    );
    this.fs.copyTpl(
      this.templatePath('Generator.js'),
      generatorClassPath,
      props
    );
    switchToEditor(shortName, generatorClassPath);
  }
}
