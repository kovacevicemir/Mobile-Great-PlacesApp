import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import {useDispatch} from 'react-redux'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const dispatch = useDispatch()

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue))
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />

        {/* CAMERA */}
        <ImagePicker />

        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
