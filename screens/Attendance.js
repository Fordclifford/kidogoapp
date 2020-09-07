import React from 'react'
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import { Styles, Size } from '../constants/Style';

import Backdrop from '../components/Backdrop';
import Spacer from '../components/Spacer';
import { ScrollView } from 'react-native-gesture-handler';

const Attendance = (props) => {
  return (
    <Backdrop>
      <Spacer height={Size.statusbar} />
<ScrollView>
      <View style={Styles.actionsContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.actionButton}
          onPress={() => props.navigation.navigate('CheckIn')}
        >
          <ImageBackground
            style={Styles.buttonImage}
            source={require('../assets/images/checkin.png')}
          >
            <Text style={[Styles.actionText, Styles.raleway]}>
              Check In
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.actionButton}
          onPress={() => props.navigation.navigate('CheckOut')}
        >
          <ImageBackground
            style={Styles.buttonImage}
            source={require('../assets/images/checkout.png')}
          >
            <Text style={[Styles.actionText, Styles.raleway]}>
              Check Out
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.actionButton}
          onPress={() => props.navigation.navigate('AttendanceHistory')}
        >
          <ImageBackground
            style={Styles.buttonImage}
            source={require('../assets/images/history.png')}
          >
            <Text style={[Styles.actionText, Styles.raleway]}>History</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.actionButton}
          onPress={() => props.navigation.navigate('AttendanceSummary')}
        >
          <ImageBackground
            style={Styles.buttonImage}
            source={require('../assets/images/history.png')}
          >
            <Text style={[Styles.actionText, Styles.raleway]}>Attendance Summary</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </Backdrop>
  )
}

export default Attendance
