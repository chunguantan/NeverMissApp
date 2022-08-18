import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
let common = require('../CommonData');
let SQLite = require('react-native-sqlite-storage');

export default class EditScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      studentId: this.props.route.params.id,
      name: '',
      email: '',
      state: '',
    };
    this._query = this._query.bind(this);
    this._update = this._update.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'studentdb3'},
      this.openDb,
      this.errorDb,
    );
  }
  componentDidMount() {
    this._query();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.name});
  }
  _query() {
    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM students WHERE id = ?',
        [this.state.studentId],
        (tx, results) => {
          if (results.rows.length) {
            this.setState({
              name: results.rows.item(0).name,
              email: results.rows.item(0).email,
              state: results.rows.item(0).state,
            });
          }
        },
      );
    });
  }
  _update() {
    this.db.transaction(tx => {
      tx.executeSql('UPDATE students SET name=?,email=?,state=? WHERE id=?', [
        this.state.name,
        this.state.email,
        this.state.state,
        this.state.studentId,
      ]);
    });
    this.props.route.params.refresh();
    this.props.route.params.homeRefresh();
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
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Name'}
            value={this.state.name}
            onChangeText={name => {
              this.setState({name});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Date'}
            value={this.state.email}
            onChangeText={email => {
              this.setState({email});
            }}
            keyboardType={'email-address'}
            orientation={'vertical'}
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
          />
          <AppButton
            style={styles.button}
            title={'Save'}
            theme={'primary'}
            onPress={this._update}
          />
        </ScrollView>
      </View>
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