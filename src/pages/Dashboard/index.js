import React, { useState, useMemo, useEffect } from 'react';
import {
    format, subDays, addDays, setHours, setMinutes,
    setSeconds, isBefore, isEqual, parseISO
} from 'date-fns';

import { utcToZonedTime, format as formattz} from 'date-fns-tz'; // trata timezone

import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
/*const range = [8, '8:30', 9, '9:30', 10, '10:30',11, '11:30', '12:30', '13:30', '14:30', '15:30',
              '16:30', '17:30', '18:30', '19:30', '20:30'];*/

export default function Dashboard() {
    // criando states para datas agendadas
    const [schedule, setSchedule] = useState([]);
    // data atual
    const [date, setDate] = useState(new Date());

    // formata data por extenso dia e mes, toda vez que date for alterada
    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    // lista agendamentos de uma determinada data
    useEffect(() => {
        async function loadSchedule() {
            // recupera objeto somente agendamentos data passada como parametro
            const response = await api.get('schedule', {
                params: { date },
            });

            console.tron.log(response.data);
            // obtem timezone do usuario logado
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // data em retorna os horarios agendados para o dia atual
            const data = range.map(hour => {
                // formata a data para agendamentos realizados a cada 30 minutos (no momento esta hora cheia)
                const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);

                // obtendo a data no formato do timezone definido pt
                const compareDate = utcToZonedTime(checkDate, timeZone);

                // removendo da data a fração de segundos
                const arrayDate = compareDate.toISOString().split(".")
                const newDate = new Date(arrayDate[0] + '.000Z');



                /** retorna somente os agendamentos do dia, onde as datas sao iguais */
                /** se a data agendada ja passou return true */
                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.appointments.find(a => isEqual(parseISO(a.date), newDate)),
                  };
            });

            // coloca no state
            setSchedule(data);
        }

        //executa a funcao
        loadSchedule();
    }, [date]);


    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={ handlePrevDay }>
                    <MdChevronLeft size={ 36 } color="FFF" />
                </button>
                <strong>{ dateFormatted }</strong>
                <button type="button" onClick={ handleNextDay }>
                    <MdChevronRight size={ 36 } color="FFF" />
                </button>
            </header>
            <ul>
                { schedule.map(time => (
                    <Time key={ time.time } past={ time.past } available={ !time.appointment }>
                        <strong>{ time.time }</strong>
                        <span>{ time.appointment ? time.appointment.user.name : 'Em aberto' }</span>
                    </Time>
                )) }
            </ul>
        </Container>
    )
}

