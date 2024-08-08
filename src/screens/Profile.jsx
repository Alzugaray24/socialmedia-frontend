import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../global/colors";
import ProfileImage from "../components/Profile/ProfileImage";
import IconButton from "../components/Shared/IconButton";
import ImageGrid from "../components/Profile/ImageGrid";
import ProfileModal from "../components/Profile/ProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { useGetImageByIdQuery } from "../services/userService/userService";
import { setImageProfile } from "../features/User/UserSlice";
import { useGetAllUserImagesQuery } from "../services/imageService/imageService";

const Profile = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const profileImage = useSelector((state) => state.user.profileImage);
  const user = useSelector((state) => state.auth.user);
  const id = user.id;
  const { data, error, isLoading, refetch } = useGetImageByIdQuery(id);
  const dispatch = useDispatch();
  const { data: userImages } = useGetAllUserImagesQuery(id);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && data.image) {
      dispatch(setImageProfile(data.image));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      const timer = setTimeout(() => {
        refetch();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data, isLoading, error, refetch]);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleImagePress = (item) => {
    console.log("Image pressed:", item);
  };

  const transformedImages = (userImages || []).map((url, index) => ({
    id: index.toString(),
    url,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}></View>
      <View style={styles.contentContainer}>
        <Pressable
          onPress={() => navigation.navigate("ImageSelector")}
          style={styles.pressable}
        >
          <View style={styles.profileImageContainer}>
            {showLoading && isLoading ? (
              <ActivityIndicator
                size="large"
                color={colors.primaryBlue}
                style={styles.loader}
              />
            ) : (
              <ProfileImage
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/no-pic.png")
                }
                loading={showLoading && isLoading}
              />
            )}
          </View>
        </Pressable>
        <Text style={styles.userNameText}>
          {user.name} {user.lastName}
        </Text>
        <View style={styles.iconContainer}>
          <IconButton
            iconName="user-friends"
            label="Friends"
            onPress={() => console.log("Friends pressed")}
          />
          <IconButton
            iconName="message1"
            label="Message"
            onPress={() => console.log("Message pressed")}
          />
          <IconButton
            iconName="user-following"
            label="Following"
            onPress={() => console.log("Following pressed")}
          />
          <IconButton
            iconName="more-horizontal"
            label="More"
            onPress={toggleModal}
          />
        </View>
      </View>
      <View style={styles.imagesContainer}>
        {showLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.primaryBlue}
            style={styles.loader}
          />
        ) : transformedImages.length === 0 ? (
          <Pressable onPress={handleImagePress} style={styles.noPubli}>
            <Image
              style={styles.photo}
              source={require("../assets/default-img.png")}
            />
            <Text>No se ha realizado ninguna publicación</Text>
          </Pressable>
        ) : (
          <ImageGrid
            images={transformedImages}
            onImagePress={handleImagePress}
          />
        )}
      </View>

      <ProfileModal isVisible={isModalVisible} toggleModal={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerContainer: {
    flex: 1.5,
    backgroundColor: colors.buttonHoverBlue,
  },
  pressable: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "-45%", // Adjust this percentage to position the image between the header and content
    left: "50%",
    transform: [{ translateX: -75 }], // Adjust the translation value to center the image horizontally
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of width/height to make it circular
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Add a background color if needed
    borderWidth: 2, // Add border if needed
    borderColor: colors.primaryBlue, // Color of the border
  },
  profileImage: {
    height: "100%",
    width: "100%",
    borderRadius: 75, // Same value as profileImageContainer
  },
  contentContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  userNameText: {
    marginTop: "10%",
    color: colors.backgroundBlack,
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    marginTop: "5%",
  },
  imagesContainer: {
    flex: 3,
    alignItems: "center",
  },
  noPubli: {
    alignItems: "center",
  },
  photo: {
    height: "20%",
    width: "20%",
    margin: "2%",
    borderRadius: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
