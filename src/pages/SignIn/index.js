/** pagina inicial da aplicação - login */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';

import * as Yup from 'yup'; // validação de campos e msg

import { signInRequest } from '~/store/modules/auth/actions';

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


