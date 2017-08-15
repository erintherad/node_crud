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
  })
})
