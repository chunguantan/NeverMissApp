exports.getValue = (array, key) => {
    return array.filter (o => o.key === key)[0].value;
  };
  exports.states = [
    {key: '01', value: 'Love'},
    {key: '02', value: 'Exam'},
    {key: '03', value: 'Birthday'}, 
    {key: '04', value: 'Event'},
    {key: '05', value: 'Anniversary'},
    {key: '07', value: 'Christmas'},
    {key: '08', value: 'Holiday'},

    
,
  ];