import React from 'react';
import {Icon} from '@rneui/themed';
import colors from '../../styles/colors';

const PaymentIcon = ({
  focused,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => (
  <Icon
    type="simple-line-icon"
    name="credit-card"
    size={20}
    color={focused ? colors.dark : colors.accent}
  />
);

export default PaymentIcon;
