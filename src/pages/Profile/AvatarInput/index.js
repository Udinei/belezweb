import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {

    // obtem o avatar do profile gravado no state, e coloca em defaultValue
    const { defaultValue, registerField } = useField('avatar');

    // se  defaultValue - recupera o  id do avatar
    const [file, setFile] = useState(defaultValue && defaultValue.id);

    // se defaultValue - recupera url do avatar
    const [preview, setPreview] = useState(defaultValue && defaultValue.url);

    // ref - guarda referencia do input, que a usa
    const ref = useRef();

    // ao iniciar a app, caso exista registra dados no state do unForm, via registerField
    useEffect(() => {
        if (ref.current) {
            registerField({
                name: 'avatar_id',
                ref: ref.current,      // input corrente
                path: 'dataset.file', //valor do data-file
            });
        }
    }, [ref, registerField])

    // ao selecionar uma nova imagem
    async function handleChange(e) {
        // criando objeto para uso com multer partFormData ( arquivo de imagens)
        const data = new FormData();

        // [0] - pegando file informado no form, e colocando em data
        data.append('file', e.target.files[0]);

        // obtendo dados do arquivo
        const response = await api.post('files', data);

        const { id, url } = response.data;

        console.log('URL.....', url);

        // atualizando state
        setFile(id);
        setPreview(url);

    }

    // 'https://curso-reactjs.s3-sa-east-1.amazonaws.com/foto_face.jpg'
    return (
        <Container>
            <label htmlFor="avatar">
                <img src={ preview || 'https://api.adorable.io/avatars/50/abott@adorable.png' }
                    alt="" />

                <input
                    type="File"
                    id="avatar"
                    accept="image/*"
                    data-file={ file }
                    onChange={ handleChange }
                    ref={ ref }
                />

            </label>

        </Container>
    )
}
