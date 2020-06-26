import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignIn() {

    function hnadleSubmit(data) {
        console.tron.log(data)
    }
    return (
        <>
            <img src={ logo } alt="BelezWeb" />

            <Form onSubmit={ hnadleSubmit }>
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password"
                       type="password"
                       placeholder="Sua senha secreta" />

                <button type="submit">Acessar</button>

                <Link from="*" to="/register">Criar conta gratuita</Link>
            </Form>
        </>
    )
}


