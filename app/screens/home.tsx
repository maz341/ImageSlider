import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Dimensions, FlatList, StyleSheet } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

const mWid = Dimensions.get('screen').width;
const mHei = Dimensions.get('screen').height;

const MainContainer = styled.View`
  width: ${mWid}px;
  height: ${mHei}px;
  background-color: black;
`;

const SingleImageView = styled.View`
  width: ${mWid}px;
  align-self: center;
  align-items: center;
`;

const SmallImage = styled.Image`
  height: ${mHei * 0.4}px;
  width: ${mWid * 0.6}px;
  border-radius: 15px;
`;

const MyList = styled.FlatList`
  width: ${mWid}px;
`;

const MapView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const data = [
    'https://images.pexels.com/photos/12700020/pexels-photo-12700020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3282583/pexels-photo-3282583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3512848/pexels-photo-3512848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2754200/pexels-photo-2754200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2365457/pexels-photo-2365457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9808219/pexels-photo-9808219.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/8328556/pexels-photo-8328556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/8471271/pexels-photo-8471271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg',
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const scrollx = React.useRef(new Animated.Value(0)).current;

    return (
        <MainContainer>
            <MapView>
                {data.map((singleItem, index) => {
                    const inputRange = [
                        (index - 1) * mWid,
                        index * mWid,
                        (index + 1) * mWid,
                    ];
                    const opacityVar = scrollx.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                    });
                    return (
                        <Animated.Image
                            key={index}
                            blurRadius={30}
                            source={{ uri: singleItem }}
                            style={[
                                {
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    right: 0,
                                    left: 0,
                                    opacity: opacityVar,
                                },
                            ]}
                        />
                    );
                })}
            </MapView>
            <MyList
                data={data}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollx } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <DropShadow
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 20,
                            alignSelf: 'center'
                        }}
                    >
                        <SingleImageView>
                            <SmallImage resizeMode="cover" source={{ uri: String(item) }} />
                        </SingleImageView>
                    </DropShadow>
                )}
            />
        </MainContainer>
    );
};

export default Home;
