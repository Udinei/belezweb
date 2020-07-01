/** Essa funcao empacota altera o comportamento default do Route,
 * em outra funcao, adicionando mais controle de acesso as rotas personalizado */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
    // desestruturando, pegando as propriedades de routes, recebidas pelo RouterWrapper
    component: Component,
    isPrivate,
    ...rest
}) {

    // obtendo dados de auth(autenticação), fornecidos pelo reducer de autenticacao, vindo store do redux
    const { signed } = store.getState().auth;

    //const signed = false;

    // vai para a tela de login
    if (!signed && isPrivate) {
        console.tron.log('passou aqui /');
        return <Redirect from="*" to="/" />

    }

    // se estiver logado e rota nao privada vai para dashboard
    if (signed && !isPrivate) {
        console.tron.log('passou aqui... dashborad');
         return <Redirect  from="*" to="/dashboard" />;

    }

    // é possivel utilizar Layout como component <Layout />
    // se estiver logado exibe layout padrao
    const Layout = signed ? DefaultLayout : AuthLayout;

    return (<Route { ...rest } render={ props => (
        <Layout>
            <Component { ...props } />
        </Layout>
    ) } />
    );

    // exibição padrao
    //return <Route { ...rest } component={Component} />;
}

// definindo tipos das propriedades das rotas
RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired, // componente pode ser uma funcao ou uma classe
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};
