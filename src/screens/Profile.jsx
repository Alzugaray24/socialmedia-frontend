import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../global/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { useGetImageByIdQuery } from "../services/userService/userService";
import { setImageProfile } from "../features/User/UserSlice";
import RenderImageItem from "../components/Image/RenderImageItem";
import { useGetAllUserImagesQuery } from "../services/imageService/imageService";

const { width } = Dimensions.get("window");

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
    // Maneja el estado de carga
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

  const renderImageItem = ({ item }) => (
    <RenderImageItem item={item} onPress={handleImagePress} />
  );

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
              <Image
                style={styles.profileImage}
                source={
                  profileImage
                    ? { uri: profileImage }
                    : require("../assets/no-pic.png")
                }
              />
            )}
          </View>
        </Pressable>
        <Text style={styles.userNameText}>
          {user.name} {user.lastName}
        </Text>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="user-friends" size={24} color="black" />
            <Text style={styles.iconLabel}>Friends</Text>
          </View>
          <View style={styles.iconWrapper}>
            <AntDesign name="message1" size={24} color="black" />
            <Text style={styles.iconLabel}>Message</Text>
          </View>
          <View style={styles.iconWrapper}>
            <SimpleLineIcons name="user-following" size={24} color="black" />
            <Text style={styles.iconLabel}>Following</Text>
          </View>
          <TouchableOpacity style={styles.iconWrapper} onPress={toggleModal}>
            <Feather name="more-horizontal" size={24} color="black" />
            <Text style={styles.iconLabel}>More</Text>
          </TouchableOpacity>
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
          <FlatList
            alignItems="center"
            style={styles.listStyle}
            data={transformedImages}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        )}
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => console.log("Option 1")}
          >
            <Text style={styles.modalText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => console.log("Option 2")}
          >
            <Text style={styles.modalText}>Option 2</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerContainer: {
    flex: 0.3,
    backgroundColor: colors.buttonHoverBlue,
  },
  pressable: {
    position: "absolute",
  },
  contentContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    position: "absolute",
    top: -0.55 * width,
    left: "50%",
    transform: [{ translateX: -0.2 * width }],
    height: 0.4 * width,
    width: 0.4 * width,
    borderRadius: 0.2 * width,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 0.4 * width,
    width: 0.4 * width,
    borderRadius: 0.2 * width,
  },
  userNameText: {
    top: -0.01 * width,
    color: colors.backgroundBlack,
    fontSize: 0.05 * width,
  },
  iconContainer: {
    top: 0.05 * width,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 16,
  },
  imagesContainer: {
    flex: 0.7,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  noPubli: {
    alignItems: "center",
  },
  photo: {
    height: width / 4,
    width: width / 4,
    margin: 5,
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOption: {
    marginBottom: 15,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: colors.backgroundBlack,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
