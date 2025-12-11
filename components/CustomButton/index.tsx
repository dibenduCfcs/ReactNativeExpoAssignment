import {clsx} from 'clsx';
import {Button} from 'heroui-native';
import {} from 'nativewind';
import React from 'react';
import {Text} from 'react-native';

interface Props {
  onPress: () => void;
  buttonName?: string;
  className?: string;
}

const CustomButton: React.FC<Props> = props => {
  const {onPress, buttonName = '', className} = props;
  return (
    <Button
      feedbackVariant="ripple"
      onPress={onPress}
      className={clsx(
        'py-3 w-[160px] rounded-lg items-center justify-center',
        className,
      )}>
      <Text className="text-white font-semibold text-base">{buttonName}</Text>
    </Button>
  );
};

export default CustomButton;
