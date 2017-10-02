# Event Delegation

## Objectives

+ Explain how to use `this` to respond to events
+ Explain when and how to use event delegation

## Saving some work

We have seen in previous lessons how to add an event listeners to an element, and then how to take action when element receives that event.  As you may imagine, there are some cases where we want to give multiple elements the same behavior.  For example, if you open up the `index.html` page in this repository, you will see a list of comments at the bottom.  Imagine that we want any `li` that we click on to turn red.  We would get started with the following in our `index.js`.  

```js
document.addEventListener("DOMContentLoaded", function(event) {
  let lis = document.querySelectorAll('li')
  // [li, li]

  lis.forEach(function(li){
    li.addEventListener('click', function(event){
      // somehow take the element that was clicked and just turn that one red
    })
  })
})
```

As you can see above, we first select all of the `li` elements.  Then we loop through our `li` elements using the `forEach` method and attach an event listener to every element.  Here is the tricky part.  How do we reference the element that received the event, to turn only that element red?  For example, if the second list element received the event, how do we tell JavaScript to change it's color to red?  Currently, there is no variable that points to a specific list element.  Still, we can reference the target of the event by using the `this` keyword.  From inside our event handler function (the function passed as the second argument to `addEventListener` and that receives an argument of `event`), `this` is set to the element the event fired from.  So when we click on the second list element, the click event occurred on the second list element -- called the event's *target* -- and thus `this` points to that element.  Because we want the target to turn red, we modify our code to the following:

```js

document.addEventListener("DOMContentLoaded", function(event) {
  let lis = document.querySelectorAll('li')
  // [li, li]

  lis.forEach(function(li){
    li.addEventListener('click', function(event){
      this.style.color = 'red'
    })
  })
});


```

Ok, we did it!  Not so bad.  We select the elements using `querySelectorAll`.  Then we add an event listener and event handler to each element.  Finally, we use the `this` keyword to reference the element that received the event and change that element accordingly.  So we just learned that we can reference the target of an event with the `this` keyword.  Doing so allows us to add the same behavior to multiple elements.

### A problem is brewing

Ok, let's build the following feature.  We want to be able to dynamically add comments with JavaScript. To do so, we listen for a click event on the comment form's submit button.  Then we take the value of the input and append it below.  Finally, we clear out the text input's value.  This should seem familiar to you.  Add in the following code to the `index.js` file (and do not remove the old code).

```js

document.addEventListener("DOMContentLoaded", function(event) {
    let submitButton = document.querySelector('input[type="submit"]')
    let textInput = document.querySelector('input[type="text"]')
    let ul = document.querySelector('ul')

    submitButton.addEventListener('click', function(event){
      event.preventDefault()
      ul.insertAdjacentHTML('beforeend', `<li> ${textInput.value} </li>`);
      textInput.value = ""
    })
})
```

Ok, if you add something to the input then click on the submit button, you can see that the new list element shows up correctly.  

Now, let's see if our highlighting still works.  If we click on the first two list elements, everything is good.  However, if we click on the third one, we have a problem.  Do you see why?  Think about what's different about the first two list elements, versus the list element that we just added?  And then think about the elements that we added event listeners to.  Ok, keep thinking about it until when you believe you figured it out or when your fingers begin to shake with anticipation.

Welcome back.  Here's why the third list element isn't responding to our events.  It's because we never added an event listener to this new list element.  Remember, our JavaScript code will be run after our HTML is on the page, per the `DOMContentLoaded` event.  At that time, we add event listeners to the list elements that are in the HTML.  But the new list element that we add later shows up *after* we already attached the event listener.  Therefore, it never gets this behavior to respond to click events.  

## Our fix: Event Delegation

Ok, so there is a fix for this.  The key is to not directly attach an event listener to a list element.  Instead we attach an event to something we can rely on being on the page at the time we attach our listeners.  For example, the `ul` is always on the page after the `DOMContentLoaded` event. Then when that `ul` is clicked on, we can see if an `li` was clicked on as well.  Let's see the code, and then explain this some more.

```js

document.addEventListener("DOMContentLoaded", function(event) {
  // # 1.
  let ul = document.querySelector('ul')

  ul.addEventListener('click', function(event){
    if (event.target && event.target.nodeName === "LI") {
      event.target.style.color = 'red'
    }
  })
})
```

The code above fixes our problem.  Let's think about the timing of the code above.  When our HTML is loaded, look for the `ul` elements on the page, and find one.  We attach an event listener on click events.  Then later, say, our user adds some new `li` elements.  Ok, eventually, our click event on the `ul` occurs.  When the click event on the `ul` occurs, we run our event handler function.  This function looks to see if the click event not only occurred on the `ul`, but also if the target of the click event was an `LI`.  If it is, it changes the target's style (that specific `li`) to be red.

### A note on the details

Note that here in our event handler, we no longer used the `this` keyword.  The reason why is because `this` is always the element that we attached the event listener to.  So `this` would equal the `ul` element.  However, we do not want to change the color of the entire `ul`.  Instead, we want to look at the target of the event - which is the element that was actually clicked.  So here, we take advantage of this subtlety.  We listen for any click event on the `ul`, and if the element that was actually clicked is a `li`, then we change that `li`.

### Summary

In this lesson we saw how to attach event listeners to multiple elements, and then change the target of the event with the `this` keyword.  We saw that there are limitations to doing this when we add new elements after the DOM has been loaded: these new elements are not attached an event listener.  Our fix is to use event delegation.  Event delegation attaches an event listener to an element which is always in our HTML.  Then when the event occurs, we see if the target of the event - the event that was clicked - is of the particular type we want.  If it is, we use `event.target` to manipulate the element.  The process above is tricky, so it's ok if you have to read this lesson a couple of times to get it down.

## Resources
+ [This and events](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
+ [Event Delegation](https://davidwalsh.name/event-delegate)


<p class='util--hide'>View <a href='https://learn.co/lessons/js-DOMContentLoaded'DOMContentLoaded</a> on Learn.co and start learning to code for free.</p>
