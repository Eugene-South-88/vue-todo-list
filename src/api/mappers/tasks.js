export const mapTasksResponse = (tasks) => Object.keys(tasks).map(key => {
	return {
		id: key,
		...tasks[key]
	}
})

