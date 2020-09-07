import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  DatePickerAndroid, Image, Modal, Picker, ScrollView,
  Text, TextInput, View, TouchableOpacity,
} from 'react-native'
import Language from '../languages'
import { Styles, Size } from '../constants/Style'
import { Gender, GenderStrings } from '../constants/Enrollment'
import Backdrop from './Backdrop'
import Spacer from './Spacer'
import { GetShortDate } from '../utilities/dates'
//import { Colors } from 'react-native/Libraries/'


const ChildModal = (props) => {
  const children = useSelector(state => state.children)

  const [firstName, setFirstName] = useState('')
  const [immunization, setImmunization] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState(null)
  const [gender, setGender] = useState('')


  useEffect(() => {
    if (props.id) {
      setFirstName(children[props.id].firstName)
      setLastName(children[props.id].lastName)
      setBirthdate(children[props.id].birthdate)
      setGender(children[props.id].gender)
      setImmunization(children[props.id].immunization)
    } else {
      setFirstName('')
      setLastName('')
      setBirthdate(null)
      setGender('')
      setImmunization('')
    }
  }, [props.id])


  const getDeleteButton = () => {
    if (props.id) {
      return (
        <TouchableOpacity
          style={Styles.mainButton}
          onPress={() => props.delete(props.id)}
        >
          <Text style={Styles.buttonText} >
            { Language.Delete }
          </Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }


  const onDateSelection = async () => {
    try {
      const initialDate = props.id ? new Date(birthdate) : new Date(1990, 0)

      const { action, year, month, day } = await DatePickerAndroid.open({
        date: initialDate,
      })

      if (action === DatePickerAndroid.dateSetAction) {
        setBirthdate(new Date(year, month, day))
      }
    } catch ({ code, message }) {
      console.warn(' Cannot open date picker', message)
    }
  }


  const getGenderItems = () => {
    return Object.values(Gender).map((gender, i) => {
      return (
        <Picker.Item
          key={i}
          label={GenderStrings[gender]}
          value={gender}
         
        />
      )
    })
  }


  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={() => { }}
    >
      <Backdrop>
        <ScrollView>
          <Text style={[Styles.h1, Styles.raleway]} >
            { Language.Child }
          </Text>

          <Image
            style={Styles.img}
            source={require('../assets/images/child.png')}
          />
 <Text style={Styles.label} >
            { Language.FirstName }
          </Text>
          <TextInput
            style={Styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

         

<Text style={Styles.label} >
            { Language.LastName }
          </Text>
          <TextInput
            style={Styles.input}
            value={lastName}
            onChangeText={setLastName}
          />


          <View style={Styles.rowElements} >
          
            <View style={Styles.rowElement} >
            <Text style={Styles.label} >
                { Language.Birthday }
              </Text>
              <TouchableOpacity
                onPress={onDateSelection}
              >
                <Text style={Styles.dateInput} >
                  { GetShortDate(0, birthdate) }
                </Text>
              </TouchableOpacity>

              
            </View>

            <View style={{ flex: .5, marginLeft: 5}} >
            <Text style={Styles.label} >
                { Language.Gender }
              </Text>
              <View style={[Styles.input1, { height: 30, paddingLeft: 0 }]} >
                <Picker
                  style={Styles.financePicker}
                  selectedValue={gender}
                  onValueChange={(value, pos) => setGender(value)}
                >
                  { getGenderItems() }
                </Picker>
              </View>

           
            </View>

        

           


          </View>

          <View style={{ flex: .5, marginLeft: 2}} >
            
          <Text style={Styles.label} >
                { Language.Immunization }
              </Text>
              <View style={[Styles.input1, { height: 30, paddingLeft: 0 }]} >
              <Picker
              selectedValue={immunization}
              style={Styles.genderPicker}
              
              onValueChange={(value, pos) => setImmunization(value)}
            >
             <Picker.Item label={Language.Select} value=''/>
              <Picker.Item label={Language.Immunized} value={true} />
              <Picker.Item label={Language.NotImmunized} value={false} />
            </Picker>
              </View>

            </View>

          <Spacer medium />

          <View style={Styles.rowElements} >
            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => props.setVisible(false)}
            >
              <Text style={Styles.buttonText} >
                { Language.Cancel }
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Styles.rowButton}
              onPress={() => {
                if (firstName === "") {
                  alert("firstname required")
                  return
                 }
                 if (lastName === "") {
                  alert("lastname required")
                  return
                 }
                 if (gender === "") {
                  alert("gender required")
                  return
                 }
                props.submit(
                  props.id, { firstName, lastName, birthdate, gender,immunization }
                ) 
              }
                    
            
            }
            >
              <Text style={Styles.buttonText} >
                { Language.Confirm }
              </Text>
            </TouchableOpacity>
          </View>

          <Spacer medium />

          { getDeleteButton() }

          <Spacer height={Size.keyboard} />
        </ScrollView>
      </Backdrop>
    </Modal>
  )
}

export default ChildModal
