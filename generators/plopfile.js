const pluralize = require('pluralize');

module.exports = (plop) => {
  plop.setHelper('plural', function (text) {
    return pluralize.plural(text);
  });

  // create your generators here
  plop.setGenerator('component', {
    description: 'Create a new component into directory components/',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's your component name?",
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: './templates/component/Index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: './templates/component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts',
        templateFile: './templates/component/Props.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/{{pascalCase name}}.schemas.ts',
        templateFile: './templates/component/Schemas.ts.hbs',
      },
    ], // array of actions
  });
};