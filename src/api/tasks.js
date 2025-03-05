import axios from 'axios';

export const createTask = (payload) => {
	return axios.post('https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks.json', payload);
}

export const loadTasks = () => {
	return axios.get('https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks.json');
}

export const removeTask = async (id) => {
	try {
		console.log('Удаление задачи')
		await axios.delete(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`)
		console.log(`Задача ${id} удалена`);
	} catch (e) {
		console.log('Ошибка в удалении: ' + e.message)
	}
}

export const toggleCompleteTask = async (id, status) => {
	await axios.patch(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`, {
		complete: status
	})
	console.log('Статус проставлен:' + status)
}

export const updateTask = async (id, task) => {
	await axios.patch(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`, task)
	console.log('Задача изменена: ' + task)
}

export const getTask = async (id) => {
	const {data} = await axios.get(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`)
	return data
}
