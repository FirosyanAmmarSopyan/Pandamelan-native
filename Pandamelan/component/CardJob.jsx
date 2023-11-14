import { View, Text } from "native-base";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Feather, EvilIcons , Ionicons , FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CardJob = ({job}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("detail" , {
      id: job.id
    })} style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={{
            uri: job.Company?.companyLogo
            }}
            alt="Alter"
            style={{ width: 30, height: 30 }}
          />
          <TouchableOpacity>
            <Feather
              name="bookmark"
              size={25}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontWeight: "500", fontSize: 18, paddingVertical: 4 }}>
            {job.title}
          </Text>
          <Text>{job.Company?.name}</Text>
          <View style={{ flexDirection: "row" , paddingTop : 10 }}>
            <EvilIcons style={{alignSelf : "center" , marginRight : 5}} name="location" size={20} color="black" />
            <Text>{job.Company?.location}</Text>
          </View>
          <View style={{ flexDirection: "row" , paddingVertical : 5 }}>
            <Ionicons style={{alignSelf : "center" , marginRight : 5}} name="briefcase-outline" size={18} color="black" />
            <Text>{job.jobType}</Text>
          </View>
          <View style={{ flexDirection: "row"  }}>
          <FontAwesome5 style={{alignSelf : 'center' , marginRight : 5}} name="money-bill-alt" size={15} color="black" />
            <Text>Negotiable</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 5,
    elevation: 5,
    padding  : 10,
    backgroundColor : "white",
    borderRadius : 10,
    margin : 1
  },
});

export default CardJob;
