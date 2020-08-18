import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions'
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
    //cria obj para invocar actions - hooks
    const dispatch = useDispatch();

    // acessando state via redux com useSelector
    const profile = useSelector(state => state.user.profile);


    function handleSubmit(data) {
      dispatch(updateProfileRequest(data));
    }

    function handleSignOut() {
        dispatch(signOut());
    }

    return (
        <Container>

            <Form initialData={ profile } onSubmit={ handleSubmit }>
                <AvatarInput name="avatar_id" />

                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu endereço de email" />

                <hr />

                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input type="passwod" name="password" placeholder="Nova senha" />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmação de senha"
                />
                <hr />
                <Input name="celular" placeholder="Nova senha" />

                <button type="submit">Atualizar perfil</button>
            </Form>

            <button type="button" onClick={ handleSignOut } >Sair do BelezWeb</button>
        </Container>
    );
}


