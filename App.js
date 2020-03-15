import React, { Fragment, useEffect, useState } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const App = () => {

  let [lowerCarLeft] = useState(new Animated.Value(-50)),
      [upperCarLeft] = useState(new Animated.Value(100)),
      runAnimation = () => {
      lowerCarLeft.setValue(-50);
      upperCarLeft.setValue(-50);

        Animated.parallel([
        Animated.timing(lowerCarLeft, {
            toValue: 100,
            duration: 3000
        }),
        Animated.timing(upperCarLeft, {
            toValue: 100,
            duration: 3000
        })
        ]).start(() => runAnimation());
        };
        useEffect(() => {
    runAnimation();
});
    return (
        <Fragment>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent={true}
            />

            <SafeAreaView style={styles.background}>
                <View style={styles.grass}>
                    <View style={styles.road}>

                    <Animated.Image
                          resizeMode='center'
                          source={require('./resources/car_blue.png')}
                          style={{...styles.carImage, ...styles.upperCar, right: upperCarLeft.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }}/>




                        <View style={styles.stripes}>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                            <View style={styles.stripe}/>
                        </View>


                         <Animated.Image
                            resizeMode='center'
                            source={require('./resources/car_green.png')}
                            style={{...styles.carImage, ...styles.lowerCar, left: lowerCarLeft.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] })}} />
                    </View>
                </View>
            </SafeAreaView>
        </Fragment>
    );
};

 

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#87CEEB',
        flex: 1
    },

    grass: {
        backgroundColor: '#4DED33',
        bottom: 0,
        position: 'absolute',
        height: '70%',
        width: '100%'
    },

    road: {
        backgroundColor: '#666560',
        height: 160,
        justifyContent: 'center',
        marginTop: '10%',
        width: '100%'
    },

    carImage: {
        height: 80,
        position: 'absolute',
        width: 160
    },

    lowerCar: {
        bottom: 10
    },

    upperCar: {
        top: -20
    },

    stripe: {
        backgroundColor: '#FFFFFF',
        width: '5%',
        height: 10
    },

    stripes: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});
export default App;