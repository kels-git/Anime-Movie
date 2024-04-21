import React from 'react';
import {View} from 'react-native';
import {ContainerProps} from '../../typings/Container';

const ContainerWrapper: React.FC<ContainerProps> = props => {
  return <View style={props.style}>{props.children}</View>;
};
export default ContainerWrapper;
