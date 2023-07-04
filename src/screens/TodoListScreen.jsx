import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../api/api';

const TodoListScreen = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await api.get('/lists', { params: { _embed: 'tasks' } });
      setLists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createList = async () => {
    try {
      const response = await api.post('/lists', { title: newListTitle });
      setNewListTitle('');
      setLists([...lists, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteList = async (id) => {
    try {
      await api.delete(`/lists/${id}`);
      setLists(lists.filter((list) => list.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const editList = async () => {
    try {
      await api.put(`/lists/${editingListId}`, { title: newListTitle });
      setNewListTitle('');
      setEditingListId(null);
      fetchLists();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id, title) => {
    setNewListTitle(title);
    setEditingListId(id);
  };

  const fetchTasks = async (listId) => {
    try {
      const response = await api.get(`/tasks?listId=${listId}`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (listId) => {
    try {
      const response = await api.post('/tasks', {
        listId,
        title: newTaskTitle,
      });
      setNewTaskTitle('');
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Listas</Text>
      {lists.map((list) => (
        <View key={list.id} style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>{list.title}</Text>
            <View style={styles.listButtons}>
              <Button
                title="Editar"
                onPress={() => handleEdit(list.id, list.title)}
              />
              <Button
                title="Excluir"
                onPress={() => deleteList(list.id)}
                color="#FF0000"
              />
            </View>
          </View>
          <View style={styles.taskContainer}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <Text>{task.title}</Text>
                <Button
                  title="Excluir"
                  onPress={() => deleteTask(task.id)}
                  color="#FF0000"
                />
              </View>
            ))}
            <TextInput
              style={styles.taskInput}
              placeholder="Nova Tarefa"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <Button
              title="Adicionar Tarefa"
              onPress={() => createTask(list.id)}
            />
          </View>
        </View>
      ))}
      <TextInput
        style={styles.input}
        placeholder="Novo Título"
        value={newListTitle}
        onChangeText={setNewListTitle}
      />
      <Button
        title={editingListId ? 'Salvar' : 'Criar Lista'}
        onPress={editingListId ? editList : createList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  listTitle: {
    fontWeight: 'bold',
  },
  listButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskContainer: {
    marginLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TodoListScreen;
