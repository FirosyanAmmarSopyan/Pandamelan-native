import { Text, Container, Switch, Row } from "native-base";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Pressable,
  View,
  FlatList,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useQuery, gql } from "@apollo/client";
import CardJob from "../component/CardJob";
import LottieView from "lottie-react-native";
  const GET_JOBS = gql`
    query Query {
      getJob {
        title
        jobType
        id
        Company {
          companyLogo
          name
          location
        }
      }
    }
  `;

export default function Home() {
  const { loading, error, data } = useQuery(GET_JOBS);
  console.log(data , "<><><><><><><><><><><><>");



  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../assets/lottie-loading.json")}
        />
      </View>
    );
  }

  // if (error) {
  //   return(
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <LottieView
  //       autoPlay
  //       style={{
  //         width: 200,
  //         height: 200,
  //       }}
  //       source={require("../assets/lottie-error.json")}
  //     />
  //   </View>
  //   )
  // }

  return (
    <View style={styles.AndroidSafeArea}>
      <Row>
        <View>
          <Text
            style={{
              fontSize: 26,
              paddingTop: 20,
              fontWeight: "500",
              color: "#6A12D8",
              marginBottom: 5,
            }}
          >
            100 X Higher Chance
          </Text>
          <Text style={{ fontSize: 22, fontWeight: "500" }}>
            to work in top companies
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            flex: 1,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity>
            <AntDesign
              name="search1"
              size={30}
              color="black"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </Row>
      <TouchableOpacity>
        <View style={{ marginVertical: 30, marginHorizontal: 1 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              elevation: 2,
              padding: 10,
              borderRadius: 5,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ alignSelf: "center", fontWeight: "500" }}>
              Sign Up & recieve exclusive job offer
            </Text>
            <View>
              <AntDesign name="rightcircle" size={24} color="#6A12D8" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          Exciting job type here 👇🏻
        </Text>
        <View
          style={{
            marginVertical: 15,
            padding: 4,
            flexDirection: "row",
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text>Remote</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text>Full Time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text>Part Time</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data?.getJob || []}
        renderItem={({ item }) => <CardJob job={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 14,
  },
});
