
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

Código de implementação:
~~~
import * as Yup from 'yup'; // validação de campos e msg

/** esquema da validação de campos , uso de shape para usar objetos */
const schema = Yup.object().shape({
    email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});
~~~
~~~
...
  <Form schema={schema} onSubmit={ hnadleSubmit }>
...
~~~

## Instalado varias libs de controle e manipulação do state das sessões da app por meio das actions do Redux
- redux react-redux : Integrando o redux  com o react na app
- reactotron e reactroton-redux : Debug e integração com react
yarn add reactotron-react-js reactotron-redux
- Immer : Para lidar com alterações do state em objetos e arrays imutaveis (o que não é possivel sem o imer) Cria a próxima árvore de estado imutável, modificando a árvore atual
- redux-saga : Intercepta actions, e adiciona novas informações aos objetos
- plugin reactotron-redux-saga : Para obter mais informações do fluxo do state

Comando abaixo instala todas as libs acima de uma vez, em modo dev:
`yarn add redux react-redux reactotron-react-js reactotron-redux immer  redux-saga reactotron-redux-saga`

Inicio dessa implementação se da com a criação da seguinte estrutura de pastas e files, e seus conteudos iniciais:
src >
 store >
     index.js
     createStore.js
        modules >
            rootReducer.js
            rootSaga.js
            auth >
               actions.js
               reducer.js
               saga.js

Configurações inicias dos files acima que compoem store do redux e saga:
store >
     index.js
~~~
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = process.env.NODE_ENV === 'development'
? console.tron.createSagaMonitor()
: null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export default store;
~~~

createStore.js
~~~
import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
    const enhancer =
    process.env.NODE_ENV === 'development'
    ? compose(
        console.tron.createEnhancer(),
        applyMiddleware(...middlewares)
    )
    : applyMiddleware(...middlewares)

    return createStore(reducers, enhancer);
};
~~~

modules >
rootReducer.js
~~~
import { combineReducers } from 'redux';

import auth from './auth/reducer';

export default combineReducers({
    auth,
});
~~~

rootSaga.js
~~~
import { all } from 'redux-saga/effects';
import auth from './auth/sagas';

export default function* rootSaga(){
    return yield all([auth]);
}
~~~

auth >
actions.js
~~~

~~~

reducer.js
~~~
const INITIAL_STATE = {

};

export default function auth (state = INITIAL_STATE, action ){
    switch(action.type) {
        default:
            return state;
    }
}
~~~

sagas.js
~~~
import { all } from 'redux-saga/effects';

export default all([]);
~~~

Implementação básica final do App.js após integração com Redux e saga via store
~~~
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';
import store from './store'; // pasta de implementação de integração com redux e saga

import GlobalStyle from './styles/global';

function App() {
    return (
        <Provider store={store}>
            <Router history={ history } >
                <Routes />
                <GlobalStyle />
            </Router>
        </Provider>
    );
}
export default App;
~~~


## instalado axios para chamdas a apii externas
`yarn add axios`


# Erro ao usar o codigo abaixo:
A navegação entra paginas usando <Redirect to="/">  ou history.push("/") não funcionam adequadamente com o Router do react-router-dom (bug)
~~~
import { BrowserRouter as Router } from 'react-router-dom';
~~~

foi trocado por:
~~~
import { Router } from 'react-router';
~~~

## instalado lib para persistencia de dados do o storage do browser
O Redux Persist salva estado (objeto) Redux em armazenamento persistente.
`yarn add redux-persist`

## instalado lib react-toastify para exibição de mensagem ao usuario
`yarn add react-toastify`


# inclusão de dados no header via sagas
codigo da função:
~~~
export function setToken({ payload }){
   // se payload nao existe
   if(!payload) return;

   // se tiver obtem token
   const { token } = payload.auth;

   // se token existe no payload coloca no headers da app
   if(token){
         // adicionando token no header da app
         api.defaults.headers.Authorization = `Bearer ${token}`;
   }
}


// registrando action
export default all([
    takeLatest('persist/REHYDRATE', setToken),
     ...
]};
~~~

## instalado icones material design
`yarn add react-icons`

## instalado lib para inserção de scrollbar
`yarn add react-perfect-scrollbar`

## instalado lib para calculo de tempo horas etc
`yarn add date-fns@next`


## instalado lig para trabalhar com formato de datas UTC/TimeZone
`yarn add date-fns-tz`



# Colocando em produção no heroku

Na appweb criado: Arquivo .env para acessar a porta 3333 em tempo de desenvolvimento com o conteudo:
~~~
REACT_APP_API_URL=http://localhost:3333
~~~

Alterado arquivo api.js, para ser acessar a variavel de ambiente do
heroku em tempo de produção com o conteudo:
~~~
 baseURL: process.env.REACT_APP_API_URL
~~~

## Criado buidpack no heroku para executar projeto ReactJS
no site do heroku em: settings > clicar no button "addBuildpackge"
e no campo: "Enter Buildpack URL" adicionar o buildpackge abaixo:
~~~
mars/create-react-app
~~~



