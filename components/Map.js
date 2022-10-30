import { StyleSheet, Text, View } from "react-native";
import { React, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  // pulling the origin data from the data layer in redux
  // useSelector is used to get data from the data layer
  // useDispatch is to send data to the data layer
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  // reference to the map
  const mapRef = useRef(null);

  // runs after the component renders
  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom and fit to the markers (between origin and destination)
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          // if you click on the marker, it shows the name and description
          title="Origin"
          description={origin.description}
          identifier="origin"
        ></Marker>
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          // if you click on the marker, it shows the name and description
          title="Destination"
          description={destination.description}
          identifier="destination"
        ></Marker>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});

// Pushed the origin into the data layer in the HomeScreen, now need to pull the origin from the data layer to display
// it in the map
