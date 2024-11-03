import React, {useState, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  Platform,
  Switch,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useAuth} from '../../contexts/authContext';
import {useDialog} from '../../contexts/dialogContext';
import CustomTextInput from '../customTextInput/customTextInput';
import CustomButton from '../customButton';
import {PlataformEnum} from '../../enums/platform.enum';
import colors from '../../styles/colors';
import {addDog, searchBreeds} from '../../services/ownerService';
import CustomPicker from '../customPicker/customPicker';
import {Dog} from '../../interfaces/dog';
import {AxiosError} from 'axios';
import {useAppNavigation} from '../../hooks/useAppNavigation';

export default function DogRegistration() {
  const {setIsLoading, isLoading} = useAuth();
  const {showDialog, hideDialog} = useDialog();
  const {user, handleSetUser} = useAuth();
  const {navigation} = useAppNavigation();

  const [hasBreed, setHasBreed] = useState(false);
  const [breeds, setBreeds] = useState<
    {label: string; value: string; size: string}[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState<string>('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      dogName: '',
      breed: '',
      size: '',
    },
  });

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchBreeds();
    }
  }, [searchQuery]);

  const fetchBreeds = async () => {
    setLoadingBreeds(true);
    try {
      const {data} = await searchBreeds(searchQuery);

      const breedOptions = data.map(
        (breed: {id: number; name: string; size: string}) => ({
          label: breed.name,
          value: breed.name,
          size: breed.size,
        }),
      );
      setBreeds(breedOptions);
    } catch (error) {
      showDialog({
        title: 'Erro ao buscar raças',
        confirm: {
          confirmLabel: 'Entendi',
          onConfirm: hideDialog,
        },
      });
      console.error('Erro ao buscar raças:', error);
    } finally {
      setLoadingBreeds(false);
    }
  };

  const onSubmit = async (data: {
    dogName: string;
    breed: string;
    size: string;
  }) => {
    setIsLoading(true);

    const {dogName, breed, size} = data;

    const dog: Dog = {
      name: dogName,
      breed: hasBreed ? breed : 'unknown breed',
      size,
    };

    try {
      const {data} = await addDog(dog);

      const dogResult = data?.data as Dog;
      if (user) {
        handleSetUser({
          ...user,
          dogs: user?.dogs ? [...user.dogs, dogResult] : [dogResult],
        });
      }

      showDialog({
        title: 'Cadastro realizado com sucesso!',
        confirm: {
          confirmLabel: 'Adicionar outro cão',
          onConfirm: () => {
            hideDialog();
            setValue('dogName', '');
            setValue('breed', '');
            setValue('size', '');
            setHasBreed(false);
            setSelectedBreed('');
            setSearchQuery('');
          },
        },
        cancel: {
          cancelLabel: 'Voltar ao início',
          onCancel: () => {
            hideDialog();
            navigation.goBack();
          },
        },
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className={`bg-primary flex-1 ${
        Platform.OS === PlataformEnum.IOS ? 'px-5 py-20' : 'p-5'
      }`}>
      <Text className="text-dark text-center text-2xl font-bold my-5">
        Adicione seu Dog
      </Text>

      <View className="mb-3">
        <Controller
          control={control}
          name="dogName"
          rules={{required: 'O nome do cão é obrigatório'}}
          render={({field: {value}}) => (
            <CustomTextInput
              value={value}
              onChangeText={(text: string) =>
                setValue('dogName', text, {shouldValidate: true})
              }
              placeholder="Nome do Cão"
              error={errors.dogName?.message}
              isEditable={!isLoading}
            />
          )}
        />
      </View>

      <View className="mb-3 flex-col items-start">
        <Text className="text-dark my-2">O cão tem raça?</Text>
        <Switch
          trackColor={{false: '#E6E6E6', true: colors.green}}
          thumbColor={hasBreed ? colors.dark : colors.primary}
          value={hasBreed}
          onValueChange={() => setHasBreed(prev => !prev)}
          disabled={isLoading}
        />
      </View>

      {hasBreed && (
        <>
          <View className="mb-3">
            <Controller
              control={control}
              name="breed"
              rules={{
                required: hasBreed ? 'A raça é obrigatória' : undefined,
              }}
              render={({field: {value}}) => (
                <>
                  <TextInput
                    value={selectedBreed || searchQuery}
                    onChangeText={text => {
                      setSearchQuery(text);
                      setSelectedBreed('');
                    }}
                    placeholder="Digite o nome da raça (mín. 3 caracteres)"
                    style={{
                      borderWidth: 1,
                      borderColor: colors.border,
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 10,
                    }}
                  />
                  {loadingBreeds && (
                    <ActivityIndicator size="small" color={colors.secondary} />
                  )}
                  {searchQuery.length >= 3 && breeds.length > 0 && (
                    <FlatList
                      data={breeds}
                      keyExtractor={item => item.value}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedBreed(item.value);
                            setValue('breed', item.value, {
                              shouldValidate: true,
                            });
                            setValue('size', item.size, {shouldValidate: true});
                            setBreeds([]);
                          }}
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border,
                          }}>
                          <Text>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                      style={{
                        maxHeight: 150,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 8,
                        backgroundColor: 'white',
                      }}
                    />
                  )}
                </>
              )}
            />
            {errors.breed && (
              <Text style={{color: 'red'}}>{errors.breed.message}</Text>
            )}
          </View>
        </>
      )}

      {!hasBreed && (
        <>
          <View className="mb-3">
            <CustomTextInput
              value="Sem Raça Definida"
              editable={false}
              placeholder="Raça"
              isEditable={false}
            />
          </View>
          <View className="mb-3">
            <Controller
              control={control}
              name="size"
              rules={{
                required: !hasBreed ? 'Tamanho é obrigatório' : undefined,
              }}
              render={({field: {value}}) => (
                <CustomPicker
                  selectedValue={value}
                  label="Selecione o tamanho"
                  onValueChange={itemValue =>
                    setValue('size', itemValue, {shouldValidate: true})
                  }
                  items={[
                    {label: 'Pequeno', value: 'small'},
                    {label: 'Médio', value: 'medium'},
                    {label: 'Grande', value: 'large'},
                  ]}
                  error={errors.size?.message}
                />
              )}
            />
          </View>
        </>
      )}

      <CustomButton
        label="Cadastrar"
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />
    </View>
  );
}
