import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import {
  MaterialIcons,
  EvilIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons"

const GET_DETAIL = gql`
  query Query($getJobByIdId: ID!) {
    getJobById(id: $getJobByIdId) {
      id
      title
      description
      companyId
      authorId
      jobType
      Company {
        id
        name
        companyLogo
        location
        email
        description
      }
      Skills {
        id
        jobId
        name
        level
      }
      User {
        _id
        username
        email
        password
        role
        phoneNumber
        address
      }
    }
  }
`;

export default function DetailPage() {
  const route = useRoute();

  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      getJobByIdId: route.params.id,
    },
  });

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

  // console.log( data , "<<<><><><><>")

  return (
    <ScrollView style={styles.AndroidSafeArea}>
      {/* <Text>INI DI Detail id:{route.params.id}</Text> */}
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: data.getJobById?.Company.companyLogo,
          }}
          alt="Alter"
          style={{ width: 50, height: 50 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            alignSelf: "center",
            marginLeft: 10,
          }}
        >
          {data.getJobById?.Company.name}
        </Text>
      </View>
      <View style={{ marginTop: 15 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontWeight: "500" }}>Description : </Text>
          <Text>{data.getJobById?.Company.description}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Insight</Text>
        <View
          style={{
            padding: 10,
            backgroundColor: "#dee2e6",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginVertical: 3 }}>
            <EvilIcons
              style={{ marginRight: 5 }}
              name="location"
              size={18}
              color="black"
            />
            <Text>{data.getJobById?.Company.location}</Text>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 3 }}>
            <Ionicons
              style={{ marginRight: 5 }}
              name="briefcase-outline"
              size={18}
              color="black"
            />
            <Text>{data.getJobById?.jobType}</Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 3 }}>
            <MaterialIcons
              style={{ marginRight: 5 }}
              name="email"
              size={18}
              color="black"
            />
            <Text>{data.getJobById?.Company.email}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5
              style={{ marginRight: 5 }}
              name="money-bill-alt"
              size={15}
              color="black"
            />
            <Text>Negotiable</Text>
          </View>
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>About Job </Text>
        <View style={{ marginTop: 5 }}>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Job Name : </Text>
            <Text>{data.getJobById?.title}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Job Description :{" "}
            </Text>
            <Text>{data.getJobById?.description}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Job Description :{" "}
            </Text>
            <Text>{data.getJobById?.description}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Company ID :{" "}
            </Text>
            <Text>{data.getJobById?.companyId}</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Author ID :{" "}
            </Text>
            <Text>{data.getJobById?.authorId}</Text>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Skill Requirements
            </Text>
            <Text style={{ fontSize: 18 }}>
              - {data.getJobById?.Skills[0].name} (
              {data.getJobById?.Skills[0].level})
            </Text>
            <Text style={{ fontSize: 18 }}>
              - {data.getJobById?.Skills[1].name} (
              {data.getJobById?.Skills[1].level})
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            User Detail :{" "}
          </Text>
          <Text>User Id :{data.getJobById?.User._id}</Text>
          <Text>Username : {data.getJobById?.User.username}</Text>
          <Text>Role :{data.getJobById.User.role}</Text>
          <Text>Email : {data.getJobById.User.email}</Text>
          <Text>Phone Number : {data.getJobById.User.phoneNumber}</Text>
          <Text>Address : {data.getJobById.User.address}</Text>
        </View>
      </View>
    </ScrollView>
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
