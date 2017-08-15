var update = document.getElementById('update')

update.addEventListener('click', function () {
  fetch('todos', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'todo': 'this is done!'
    })
  })
  .then(res => {
  if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})

var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('todos', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'todo': 'test2'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})
