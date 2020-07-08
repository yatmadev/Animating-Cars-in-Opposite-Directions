import React, { Component } from 'react'
import { Text, View, Button } from 'react-native';
import Sound from 'react-native-sound';
import Slider from "react-native-slider";

export default class Metronome extends Component {

  constructor(props) {
    super(props);
    this.click1=null;
    this.click2=null;
  }

  state = {
    bpm: 100,
    playing: false,
    count: 0,
    beatPerMeasure: 4
  }

  componentDidMount() {
    this.click1 = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
    });
    this.click2 = new Sound('tick.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
    });
    }

    startStop = () => {
      if (this.state.playing) {
        // Stop the timer
        clearInterval(this.timer);
        this.setState({
          playing: false
        });
      } else {
        // Start a timer with the current BPM
        this.timer = setInterval(
          this.playClick,
          (60 / this.state.bpm) * 1000
        );
        this.setState(
          {
            count: 0,
            playing: true
            // Play a click "immediately" (after setState finishes)
          },
          this.playClick
        );
      }
    };

    playClick = () => {
      const { count, beatsPerMeasure } = this.state;

      if (count % beatsPerMeasure === 0) {
        this.click2.stop();
      } else {
        this.click1.play();
      }

      // Keep track of which beat we're on
      this.setState(state => ({
        count: (state.count + 1) % state.beatsPerMeasure
      }));
    };

    handleBpmChange = bpm => {

      if (this.state.playing) {
        // Stop the old timer and start a new one
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

        // Set the new BPM, and reset the beat counter
        this.setState({
          count: 0,
          bpm
        });
      } else {
        // Otherwise just update the BPM
        this.setState({ bpm });
      }
    };



  render() {

    const { bpm, playing } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.bpmTitle}>{bpm} BPM</Text>
        <Slider
          style={styles.slider}
          maximumValue={180}
          minimumValue={60}
          onValueChange={this.handleBpmChange}
          step={1}
          trackStyle={{height:15, borderRadius:15}}
          thumbStyle={{height:28}}
          thumbTouchSize={{width: 100, height: 100}}
          value={bpm}
        />
        <Button
        style={styles.button}
        onPress={this.startStop}
        title={ playing ? "Stop" : "Play"}
        accessibilityLabel="Start and Stop The Metronome"
        />
      </View>
    )
  }
}

const styles = {
  bpmTitle: {
    fontSize: 30,
    marginBottom: 50,
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  slider : {
    height: 30,
    width: 300,
    
  },
  button: {
    fontSize:70,
  }
}