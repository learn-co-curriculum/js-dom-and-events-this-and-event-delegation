document.addEventListener("DOMContentLoaded", function(event) {
  let lis = document.querySelectorAll('li')
  // [li, li]

  lis.forEach(function(li){
    li.addEventListener('click', function(event){
      // somehow take the element that was clicked and just turn that one red
    })
  })
})
