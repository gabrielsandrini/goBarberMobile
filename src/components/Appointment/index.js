import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    const string = formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });

    const stringCapitalized = string[0].toUpperCase() + string.substring(1);

    return stringCapitalized;
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time numberOfLines={2}>{dateParsed}</Time>
        </Info>
      </Left>
      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={() => onCancel()}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    provider: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    cancelable: PropTypes.bool,
    past: PropTypes.bool,
    date: PropTypes.string,
    canceled_at: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
