/** pagina inicial da aplicação - login */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';
//import Button from '@material-ui/core/Button';

import * as Yup from 'yup'; // validação de campos e msg

import { signInRequest } from '~/store/modules/auth/actions';

//import PropTypes from 'prop-types';
//import clsx from 'clsx';

//import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
/*const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'green',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },

};*/

/** esquema para validação de campos , uso de shape para usar objetos */
const schema = Yup.object().shape({
    email: Yup.string()
              .email('Insira um e-mail válido')
              .required('O e-mail é obrigatório'),

    password: Yup.string().required('A senha é obrigatória'),

});


export default function SignIn() {

    // criando obj dispatch que invoca action do redux
    const dispatch = useDispatch();

    // acessando o state do redux
    const loading = useSelector(state => state.auth.loading);

    // submete o formulario
    function handleSubmit({email, password}) {
        // disparando action do redux e passando os parametros
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <img src={ logo } alt="BelezWeb" />

            <Form schema={schema} onSubmit={ handleSubmit }>

                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password"
                       type="password"
                       placeholder="Sua senha secreta" />

                <button type="submit">{loading ? "Carregando..." : 'Acessar'}</button>

                <Link  to="/register">Criar conta gratuita</Link>

            </Form>

        </>
    )
}



