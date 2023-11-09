import { View, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";

const CardJob = () => {
  return (
    <TouchableOpacity>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={{
              uri: "https://freelogopng.com/images/all_img/1656181199icon-shopee-png.png"
            }}
            alt="Alter"
          />
          <Text>TESSSSSSSSSSSSS</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardJob;
