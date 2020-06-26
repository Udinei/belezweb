
# Diario de Dev
Ambiente:
Windows: 10
Node: v12.18.0
Yarn: 1.19.0
Npm: 6.14.5

## Criando projeto ReactJS
Foi usado framework react-app, com isso babel e webpack ja virá configurado.
`yarn create react-app belezweb`

## Apos criar a app e tentar configurar o Eslint com prettier
Houve conflitos entre as versões 6 e 7 do eslint.

### Solução
Remover do file package.json todas as dependencias do eslint. Remover a pasta node_modules e os files: yarn.lock e package-lock.json
rodar na pasta do projeto `npm install` e depois `yarn`

## instalando modulo de navegação
`yarn add react-router-dom`

## criado pasta e files:
src > pages
      > Dashboard
        index.js
      > Profile
        index.js
      > SignIn
        index.js
      > SignUp
        index.js
    > routes
      index.js
    > services
      history.js
    > config
      ReactotronConfig.js

## instalando history para navegação entre paginas de tela
`yarn add history`

## criando rotas da app
Conteudo do file index.js da pasta routes:
~~~
import React from 'react';
import { Switch, Route } from  'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes(){
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/register' component={SignUp} />

            <Route path='/dashboard' component={Dashboard} />
            <Route path='/profile' component={Profile} />
        </Switch>
    )
}
~~~

## Configuração de rotas no file App.js
Configuração e imports para iniciação de testes com rotas e navegação da app
Conteudo do file App.js
~~~
import React from 'react';
import { Router } from 'react-router-dom' ;

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';


function App() {
    return (
        <Router history={history} >
            <Routes />
        </Router>
    );
}
export default App;
~~~

## Conteudo file history.js
~~~
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
~~~

## Instalação do reactotron para visualização das requisições
`yarn add reactotron-react-js`

## Configuração do reactotron
Conteudo do file src > config > ReactotronConfig.js
~~~
import Reactotron from 'reactotron-react-js';

if (process.env.NODE_ENV === 'development') {
    const tron = Reactotron.configure().connect();

    tron.clear();
    console.tron = tron;
}
~~~
## Testado configurações ate aqui com `yarn start`

## Testado rotas adicionando conteudo uma pagina
No file index.js do file dashborad
~~~
function Dashboard() {
  return <h1>Dashboard</h1>;
}
~~~
Acessar a rota no browser:
http://localhost:3000/dashboard


## Instalndo prop-types
`yarn add prop-types`

## Criando um Route.js personalizado para acesso as rotas
import

## Instanlado styled-components para estilização de componentes
`yarn add styled-components`
criado file: src > styles > global.js
Conteudo:

## Instalado ferramentas para importação automatica de componentes na app
Nota: Essas ferramentas evitam ter que saber o caminho dos componentes na hora de importar na app usando /../.. para tanto no lugar dos ../ usar um ~

`yarn add customize-cra react-app-rewired`
`yarn add babel-plugin-root-import -D`

criado file: (raiz) config-overrides.js
conteudo:
~~~
const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
      'babel-plugin-root-import',
      {
          rootPathSuffix: 'src',
      }
  ])
);
~~~
Alterado scripts no package.json para:
~~~
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
~~~

## instalado lib para correção de erros do eslint ao adicionar ~ no path dos imports
`yarn add eslint-import-resolver-babel-plugin-root-import -D`

Alterado eslintrc.js adicionado conteudo:
~~~
    settings: {
        'import/resolver': {
            'babel-plugin-root-import':{
                rootPathSuffix: 'src'
            },
        },
    },
~~~
Criado (raiz) file: jsonconfig.js para corrigir a criação do link de direcionamento ao arquivo de import ao precionar ctrl+click (o link foi desativado, pelo ~ adicionado) reiniciar o vscode apos as alterações
Conteudo:
~~~
{
    "compilerOptions": {
        "baseUrl": "src",
        "paths": {
            "~/*": ["*"],
        }
    }
}
~~~

## instalado lib polished que permite controlar intensidade de cor dos componentes
`yarn add polished`


## Implementado o codigo abaixo para correto funcionamento do Router ao usar Link e Redirect
~~~
import { BrowserRouter as Router } from 'react-router-dom' ;
~~~

## Instalado lib `unform` da rocketseat para manipulação de formularios
`yarn add @rocketseat/unform`

## instalado `yup` para realizar validações de dados tanto no frontend como no backend
`yarn add yup`








This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
