import { BaseGenerator } from 'yeoman-generator';
import config, { promptLocal }  from '../config';

export default class <%=generatorName%>Generator extends BaseGenerator {
  initializing() {
  //  this.composeWith('prj:gitIgnore');
  }
  prompting() {
    return config(this, [
    ]);
  }
  promptingLocal() {
    return promptLocal(this, {
    });
  }
  writing() {
  }
}
