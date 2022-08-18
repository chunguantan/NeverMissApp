import React, {Component} from 'react';
import {Text, StyleSheet, Alert, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {InputWithLabel} from '../UI';
import {FloatingAction} from 'react-native-floating-action';
const actions = [
  {
    text: 'Edit',
    color: '#D3C1A7',
    icon: require('../images/edit_icon.png'),
    name: 'edit',
    position: 2,
  },
  {
    text: 'Delete',
    color: '#D3C1A7',
    icon: require('../images/delete_icon.jpg'),
    name: 'delete',
    position: 1,
  },
];
let SQLite = require('react-native-sqlite-storage');
let common = require('../CommonData');
export default class ViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: this.props.route.params.id,
      student: null,
    };
    this.db = SQLite.openDatabase(
      {name: 'studentdb3'},
      this.openCallback,
      this.errorCallback,
    );
    this._queryByID = this._queryByID.bind(this);
  }
  _queryByID() {
    this.db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM students WHERE id=?',
        [this.state.studentID],
        (tx, results) => {
          console.log(results.rows.item(0));
          if (results.rows.length) {
            this.setState({student: results.rows.item(0)});
          }
        },
      ),
    );
  }
  _delete() {
    Alert.alert('Confirm to delete ?', this.state.student.name, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db.transaction(tx => {
            tx.executeSql('DELETE FROM students WHERE id = ?', [
              this.state.studentID,
            ]);
          });
          this.props.route.params.refresh();
          this.props.navigation.goBack();
        },
      },
    ]);
  }
  openCallback() {
    console.log('database opened successfully');
  }
  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }
  componentDidMount() {
    this._queryByID();
  }
  componentDidUpdate() {
    this.props.navigation.setOptions({headerTitle: this.state.student.name});
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
            value={student ? student.name : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Date'}
            value={student ? student.email : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Event Type'}
            value={student ? common.getValue(common.states, student.state) : ''}
            orientation={'vertical'}
            editable={false}
          />
        </ScrollView>
        <FloatingAction
          actions={actions}
          color={'#D3C1A7'} //   floatingIcon={( //     <Image //       source={require('./images/baseline_edit_white_18dp.png')} //     /> //   )}
          onPressItem={name => {
            switch (name) {
              case 'edit':
                this.props.navigation.navigate('EditScreen', {
                  id: student ? student.id : 0,
                  headerTitle: student ? student.name : '',
                  refresh: this._queryByID,
                  homeRefresh: this.props.route.params.refresh,
                });
                break;
              case 'delete':
                this._delete();
                break;
            }
          }}
        />
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
    color: 'black',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
});