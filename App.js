import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";
class App extends Component {
  state = {
    talk: [
      {
        id: uuidv4(),
        msg: "Hello! Welcome ...",
        client: false,
      },
    ],
    message: "",
    isLoading: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#3498db",
            marginBottom: 10,
            height: 30,
          }}
        >
          HealthBot
        </Text>
        <FlatList
          ref={(ref) => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({ animated: true })
          }
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          data={this.state.talk}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          scrollsToTop={true}
          renderItem={(item) => {
            return this.RenderMessage(item.item);
          }}
        />
        {this.state.isLoading && (
          <View style={{ paddingLeft: 20 }}>
            <Bubbles color="#ff7675" />
          </View>
        )}
        <View
          style={{
            backgroundColor: "#eee",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 5,
            marginTop: 5,
            borderRadius: 15,
            height: 35,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <TextInput
            placeholder="Your Message"
            placeholderTextColor="#aaa"
            style={{ justifyContent: "center", flex: 0.92 }}
            value={this.state.message}
            onChangeText={(message) => this.setState({ message })}
          />
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={this.OnSubmit}
          >
            <Text style={{ color: "#3498db" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  OnSubmit = () => {
    const body = { msg: this.state.message };
    this.setState({
      talk: this.state.talk.concat({
        id: uuidv4(),
        msg: this.state.message,
        client: true,
      }),
      isLoading: true,
      message: "",
    });
    axios
      .post("https://serene-dawn-77765.herokuapp.com/intent", body)
      .then((response) => {
        console.log(response.data);
        this.setState({
          talk: this.state.talk.concat({
            id: uuidv4(),
            msg: response.data.response,
            client: false,
          }),
          isLoading: false,
        });
      });
  };

  RenderMessage = (item) => {
    return item.client
      ? this.ClientMessage(item.msg)
      : this.BotMessager(item.msg);
  };

  ClientMessage = (msg) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginRight: 10,
          marginLeft: "30%",
          marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#3498db",
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {msg}
          </Text>
          {/* <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: "#fff",
              marginLeft: 5,
              borderRadius: 15,
              alignSelf: "center",
              elevation: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontSize: 8,
              }}
            >
              Me
            </Text>
          </View> */}
        </View>
      </View>
    );
  };

  BotMessager = (msg) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          marginLeft: 10,
          marginRight: "30%",
          marginTop: 10,
          elevation: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "",
          }}
        >
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: "#fff",
              marginRight: 5,
              borderRadius: 15,
              alignSelf: "center",
              elevation: 10,
            }}
          >
            <Image
              style={{ height: 15, width: 15 }}
              source={{
                uri:
                  "https://www.towergarden.com/etc/designs/tower-garden/clientlib-site/images/plus-4-xxl.png",
              }}
            />
          </View>

          <Text style={{ color: "#000", fontWeight: "bold" }}>{msg}</Text>
        </View>
      </View>
    );
  };
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    marginTop: 25,
  },
});
