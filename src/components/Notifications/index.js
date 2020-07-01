import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
/** parseISO - converte data para string, formaDistance - calcula tempo */
import { parseISO, formatDistance } from 'date-fns';

import pt from 'date-fns/locale/pt'; /** converte tempo para portugues */

import api from '~/services/api';

import { Container, Badge, NotificationList, Scroll, Notification } from './styles';

export default function Notifications() {
    // criando stado visible, setVisible é o metodo que o seta
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // executa toda vez que notifications for alterada
    const hasUnread = useMemo(
        () => !!notifications.find(notification => notification.read === false),
        [notifications] // variavel de dependencia para execução
    )

    function handleToggleVisible() {
        // se estiver visivel, esconde, se estiver escondido exibe
        setVisible(!visible);
    }

    async function handleMarkAsRead(id) {
        await api.put(`notifications/${id}`);

        setNotifications(
            notifications.map(notification =>
                notification._id === id ? { ...notification, read: true } : notification
            )
        );
    }

    // executada ao iniciar a app
    useEffect(() => {
        async function loadNotifications() {
            // obtem dados de notificação
            const response = await api.get('notifications');

            const data = response.data.map(notification => ({
                ...notification,
                timeDistance: formatDistance( /** calculo da data de criação ate a data atual */
                    parseISO(notification.createdAt),  /** data inicial em string */
                    new Date(),                        /** data final */
                    { addSuffix: true, locale: pt }    /** por extenso em portugues */
                )
            }))

            setNotifications(data);
        }

        loadNotifications();
    }, []);


    return (
        <Container>
            <Badge onClick={ handleToggleVisible } hasUnread={ hasUnread }>
                <MdNotifications color='#7159c1' size={ 20 } />
            </Badge>
            <NotificationList visible={ visible }>
                <Scroll>
                    { notifications.map(notification => (
                        /** notificacao foi lida sim ou nao */
                        <Notification key={ notification._id } unread={ !notification.read }>
                            <p>{ notification.content }</p>
                            <time>{ notification.timeDistance }</time>
                            { !notification.read && (
                                <button
                                    type="button"
                                    onClick={ () => handleMarkAsRead(notification._id) }
                                >Marcar como lida
                                </button>
                            ) }
                        </Notification>
                    )) }
                </Scroll>
            </NotificationList>
        </Container >
    )
}


