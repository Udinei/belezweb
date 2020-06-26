
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';
import * as Yup from 'yup'; // validação de campos e msg

/** esquema da validação de campos , uso de shape para usar objetos */
const schema = Yup.object().shape({
    email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});



export default function SignIn() {

    function hnadleSubmit(data) {
        console.tron.log(data)
    }
    return (
        <>
            <img src={ logo } alt="BelezWeb" />

            <Form schema={schema} onSubmit={ hnadleSubmit }>
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


