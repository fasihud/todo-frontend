import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Title, Item, Input, Right, Icon, Button } from "native-base";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state= {
      todo: '',
      todos: [],
      user: [],
    };
  }

  componentDidMount() {
    this.getTodos();
  }
  
  async getTodos() {
    
    return fetch('http://192.168.1.104/todo/public/api/todos')
    .then((response) => response.json())
    .then((responseJson) => {
      return this.setState({
        todos:responseJson.todos,
        user:responseJson.user
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  addTask= () => {
    fetch('http://192.168.1.104/todo/public/api/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        todo:this.state.todo,
      }),
    })
    .done();
    this.input._root.clear();
  };

  deleteTodo = (id) => {
    fetch('http://192.168.1.104/todo/public/api/todos/'+id+'' ,{
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .done();
  };

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Todo App</Title>
          </Body>
        </Header>
        <Content>
          
          <Item rounded>
          <Input placeholder="Add Task"
            onChangeText={input=>this.setState({ todo:input })}
            ref={(ref) => { this.input = ref }}
            />
          </Item>
          <Button blocklight onPress={ () =>this.addTask() }>
            <Text>Add</Text>
          </Button>
          
          <List
            dataArray={this.state.user}
            renderRow={item=> (
              <ListItem>
                <View style={{textAlign: 'center'}}>
                  <Text style={{fontWeight: 'bold'}}>
                    {item.name}adf
                    <Text style={{color: 'red'}}>
                      's todo list
                    </Text>
                  </Text>
                </View>
          
              </ListItem>
            )}
          />
          
          <List
            dataArray={this.state.todos}
            renderRow={item=> (
              <ListItem>
                <Left>
                  <Text> {item.task} {item.id} </Text>
                </Left>
                <Right>
                  <Button rounded danger onPress={ () => {this.deleteTodo(item.id)} }>
                    <Text>Delete</Text>
                  </Button>
                </Right>
          
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}