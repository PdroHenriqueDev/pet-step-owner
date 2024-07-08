import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {useRequest} from '../../../../contexts/requestContext';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

function RequestBottomSheet() {
  const {receivedLocation} = useRequest();
  const snapPoints = useMemo(() => [250, '90%'], []);

  return (
    <View style={styles.container}>
      <BottomSheet
        // ref={bottomSheetRef}
        // onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={false}
        handleIndicatorStyle={styles.indicator}>
        <BottomSheetView>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Dog walkers na proximidades</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

export default RequestBottomSheet;
