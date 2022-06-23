'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
    }

    //ToDo一覧の取得
    static async fetchAll(){
      const todos = await this.findAll({
        attributes: ['id', 'title', 'deadline', 'completed'],
        order: [ ['updatedAt', 'DESC'] ]
      })
      return(todos)
    }

    //完了・未完了一覧の取得
    static async fetchByCompleted(completed){
      const todos = await this.findAll({
        attributes: ['id', 'title', 'deadline', 'completed'],
        order: [ ['updatedAt', 'DESC'] ],
        where: {
          completed: completed
        },
        order: [
          ['updatedAt', 'DESC']
        ]
      })
      return(todos)
    }

    //ToDoの登録
    static async add(value){
      const todo = await this.create({
        title: value.title,
        description: value.description,
        deadline: value.deadline
      })
      return(todo)
    }

    //ToDo詳細の取得
    static async fetchById(id){
      const todo = await this.findByPk(
        id,
        {
          attributes: ['id', 'title', 'description', 'deadline', 'completed']
        }
      )
      return(todo)
    }

    //ToDoの更新
    static async mod(id, value){
      const changes = await this.update(
        value,
        {
          where: { id: id },
        }
      )
      console.log(changes)
      return changes[0] === 1 ?  id : null
    }

    //ToDoの削除
    static async remove(id){
      const todo = await this.destroy(
        { 
          where: { id:id },
          attributes: ['id', 'title', 'description', 'deadline', 'completed']
        }
      )
      return(todo)
    }
  }

  Todo.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    deadline: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
    freezeTableName: true
  });

  Todo.beforeCreate(async (instance, _option) => {
    const now = new Date();
    instance.createdAt = now;
    instance.updatedAt = now;
  })

  Todo.beforeUpdate(async (instance, _options) => {
    const now = new Date();
    instance.updatedAt = now;
  })

  return Todo;
};