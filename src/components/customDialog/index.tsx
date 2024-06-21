import {Dialog} from '@rneui/base';
import React from 'react';
import CustomButton from '../customButton';
import styles from './styles';
import {View} from 'react-native';

function CustomDialog({
  isVisible = false,
  title,
  confirm,
  cancel,
  onBackdropPress,
}: {
  isVisible: boolean;
  title: string;
  confirm?: {
    confirmLabel: string;
    onConfirm: () => void;
  };
  cancel?: {
    cancelLabel: string;
    onCancel: () => void;
  };
  onBackdropPress?: () => void;
}) {
  const {Actions} = Dialog;

  return (
    <Dialog
      overlayStyle={styles.dialog}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <Dialog.Title titleStyle={styles.title} title={title} />

      <Actions>
        <View className="flex-col w-full">
          {confirm && confirm.confirmLabel && confirm.onConfirm && (
            <CustomButton
              title={confirm.confirmLabel}
              onPress={confirm.onConfirm}
            />
          )}
          {cancel && cancel.cancelLabel && cancel.onCancel && (
            <CustomButton
              title={cancel.cancelLabel}
              onPress={cancel.onCancel}
            />
          )}
        </View>
      </Actions>
    </Dialog>
  );
}

export default CustomDialog;
