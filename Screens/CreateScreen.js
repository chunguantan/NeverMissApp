import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

export default class CreateScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      state: '01',
    };
    this._insert = this._insert.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'studentdb3'},
      this.openDb,
      this.errorDb,
    );
  }

  componentDidMount() {
    this.props.navigation.setOptions({headerTitle: 'Add New Event'});
  }

  _insert() {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO students(name,email,state) VALUES(?,?,?)', [
        this.state.name,
        this.state.email,
        this.state.state,
      ]);
    });

    this.props.route.params.refresh();
    
    this.props.navigation.goBack();
    
    
  }

  openDb() {
    console.log('Database opened');
  }
  errorDb(err) {
    console.log('SQL Error: ' + err);
  }
  render() {
    let student = this.state.student;
    return (
      <ScrollView style={styles.container}>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Name'}
          placeholder={'type event name here'}
          value={this.state.name}
          onChangeText={name => {
            this.setState({name});
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'type date here'}
          label={'Date'}
          value={this.state.email}
          onChangeText={email => {
            this.setState({email});
          }}
          keyboardType={'email-address'}
          orientation={'vertical'}
          ///ssss
        />
        <PickerWithLabel
          textLabelStyle={styles.TextLabel}
          pickerItemStyle={styles.pickerItemStyle}
          label={'Event Type'}
          items={common.states}
          mode={'dialog'}
          selectedValue={this.state.state}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({state: itemValue});
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 24}}
        />
        <AppButton
          style={styles.button}
          color={"#D3C1A7"}
          title={'Save'}
          theme={'primary'}
          onPress={this._insert}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: '#000099',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
});