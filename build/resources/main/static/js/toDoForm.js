const toDoControl = new ToDoController();

// When user clicks on 'Add', calls API to add items to the database
// Add an 'onsubmit' event listener for toDoForm to add an item
newItemForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();
    // Select the inputs
    const newItemTitle = document.querySelector('#newItemTitle');
    const newItemDescription = document.querySelector('#newItemDescription');
    const newItemTargetDate = document.querySelector('#newItemTargetDate');

    /*
        Validation code here
    */

    // Get the values of the inputs - variable names to be same as MySQL columns
    const title = newItemTitle.value;
    const description = newItemDescription.value;
    const targetDate = newItemTargetDate.value;

    // Clear the form
    newItemTitle.value = '';
    newItemDescription.value = '';
    newItemTargetDate.value = '';

    // Add the task to the task manager
    toDoControl.addItem(title, description, targetDate);
});