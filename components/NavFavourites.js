import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Toronto, ON, Canada",
    geometry: { location: { lat: 43.653226, lng: -79.3831843 } },
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Mississauga, ON, Canada",
    geometry: { location: { lat: 43.5890452, lng: -79.6441198 } },
  },
];

const NavFavourites = (props) => {
  const { onClick } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-500`, { height: 0.5 }]} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => onClick(item.destination, item.geometry)}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
