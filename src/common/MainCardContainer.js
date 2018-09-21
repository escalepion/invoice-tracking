import React from 'react';
import { Card } from 'react-native-elements';

const MainCardContainer = (props) => {
  return (
    <Card title={props.title}>
      {props.children}
    </Card>
  );
};

export default MainCardContainer;
