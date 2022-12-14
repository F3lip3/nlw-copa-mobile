import { HStack } from 'native-base';
import { useState } from 'react';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  points: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
}

export function Team({ code, points, position, onChangeText }: Props) {
  const [teamPoints, setTeamPoints] = useState(points);

  function handleTeamPointsChange(value: string) {
    setTeamPoints(value);
    onChangeText(value);
  }

  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={handleTeamPointsChange}
        value={teamPoints}
      />

      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
