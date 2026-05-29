const users = [
  { name: 'João', active: true },
  { name: 'Ana', active: false },
]

const activeUsers = users.filter((user) => user.active)

console.log(activeUsers)
