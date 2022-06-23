'use strict';

const models = require('./models');

const data = [
  {title:'hoge', description:'sample1', deadline:'2022-07-01'},
  {title:'hage', description:'sample2', deadline:'2022-07-01'},
  {title:'pepe', description:'sample3', deadline:'2022-07-01'},
  {title:'soya', description:'sample4', deadline:'2022-07-01'},
  {title:'enya', description:'sample5', deadline:'2022-07-01'}
];


data.forEach((value) => {
  models.Todo.add(value).then((todo) => {
    console.log(todo)
  });
})