import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {AirbnbRating, Avatar, Icon, Input, Rating} from '@rneui/base';
import CustomButton from '../customButton';
import {clearPendingReview, sendFeedback} from '../../services/feedbackService';
import {useAuth} from '../../contexts/authContext';
import {AxiosError} from 'axios';
import {useDialog} from '../../contexts/dialogContext';

export default function ReviewModal() {
  const {user, handleSetUser} = useAuth();
  const {showDialog, hideDialog} = useDialog();

  const [isModalVisible, setModalVisible] = useState(true);
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState('');

  const maxCharacters = 300;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const feedback = async () => {
    if (!user?.pendingReview) return;
    try {
      const {reviewedId, requestId} = user.pendingReview;
      await sendFeedback({
        reviewedId,
        requestId,
        rate: ratingValue,
        comment,
      });

      toggleModal();

      handleSetUser({
        ...user,
        pendingReview: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError &&
        typeof error.response?.data?.data === 'string'
          ? error.response?.data?.data
          : 'Ocorreu um erro inesperado';
      showDialog({
        title: errorMessage,
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: () => {
            hideDialog();
          },
        },
      });
    }
  };

  const closeAndCancelReview = async () => {
    setModalVisible(false);
    if (user?.pendingReview) {
      try {
        await clearPendingReview();
        toggleModal();
        handleSetUser({...user, pendingReview: null});
      } catch (error) {
        toggleModal();
        handleSetUser({...user, pendingReview: null});
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={toggleModal}>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-2xl p-5 pb-20 items-center w-full relative">
            <TouchableOpacity
              onPress={closeAndCancelReview}
              className="absolute right-5 top-5">
              <Icon name="close" size={24} color={colors.dark} />
            </TouchableOpacity>
            <Avatar
              rounded
              size="large"
              source={{
                uri:
                  user?.pendingReview?.profileUrl ||
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              containerStyle={{alignSelf: 'center', marginTop: -40}}
            />
            <Text className="text-lg font-bold my-2">Avalie Aloe Vera</Text>
            <AirbnbRating
              count={5}
              reviews={[
                'Insatisfatório',
                'Razoável',
                'Bom',
                'Muito bom',
                'Excelente',
              ]}
              defaultRating={ratingValue}
              size={20}
              reviewColor={colors.secondary}
              selectedColor={colors.secondary}
              onFinishRating={setRatingValue}
              reviewSize={20}
            />
            <Text className="text-accent self-start ml-2 mt-4">
              Comentário (opcional)
            </Text>
            <Input
              placeholder="Escreva aqui"
              multiline
              maxLength={maxCharacters}
              containerStyle={{width: '100%', paddingHorizontal: 0}}
              inputContainerStyle={{
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 10,
                borderRadius: 8,
              }}
              className="w-full mt-2 mb-20"
              value={comment}
              onChangeText={setComment}
            />
            <Text className="text-right text-sm text-accent mb-4">
              {comment.length}/{maxCharacters} caracteres
            </Text>

            <View className="w-full">
              <CustomButton label={'Enviar'} onPress={feedback} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
