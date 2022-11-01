import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  // dispatch all the relevant information to the data layer in redux (information such as lat and long)
  const dispatch = useDispatch();

  // this is used to set the value of the search bar if user clicks on home or work
  const ref = useRef();

  // pass this function down to NavFavourites
  const onClick = (location, geometry) => {
    ref.current?.setAddressText(location);
    // send the data to the data layer
    dispatch(
      setOrigin({
        location: geometry.location,
        description: location,
      })
    );
    dispatch(setDestination(null));
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />

        <GooglePlacesAutocomplete
          ref={ref}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            console.log("this is location", details.geometry.location);
            console.log("this is description", data.description);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder="Where From?"
          debounce={400}
        />

        <NavOptions />
        <NavFavourites onClick={onClick} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});

// how to get the template for react native functional component; rnfes
// SafeAreaView does not allow the content to fall into the "notch" of the modern iphones (where the cameras are)
