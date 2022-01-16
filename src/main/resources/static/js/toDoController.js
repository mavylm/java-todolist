//Doing a to-do list web app to display the title, description, targetDate

const createHTMLList = (index, title, description, targetDate) =>
`
<tr>
  <td><input type="checkbox" value="${index}"></td>
  <td>${title}</td>
  <td>${description}</td>
  <td>${targetDate}</td>
</tr>

`;

class ToDoController
{
    constructor()
    {
        this._items = [];       //create an array to store the details of to do items
    }

    //method to add the items into the array
    addItem(title, description, targetDate) {
        var toDoController = this;

        const item = {
            title: title,
            description: description,
            targetDate: targetDate
        };

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('targetDate', targetDate);

        fetch('http://localhost:8080/item/add', {
            method: 'POST', // or 'PUT;
            body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Successfully added to To Do List")
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("Error adding item to To Do List")
            });
    }

    // Method to fetch data from API
    displayItem() {
        // Fetch data from database using the REST API endpoint for Spring Boot
        var toDoController = this;
        toDoController._items = [];

        fetch('http://127.0.0.1:8080/item/all')
            .then((resp) => resp.json())
            .then(function(data) {
                console.log("2. receive data")
                console.log(data);

                data.forEach(function (item, index) {

                    const itemObj = {
                                oId: item.id,
                                oTitle: item.title,
                                oDescription: item.description,
                                oTargetDate: item.targetDate
                            };

                toDoController._items.push(itemObj);     // Array push
                });

                toDoController.render();
            })
            .catch(function(error) {
            console.log(error);
            });

    } // End of displayItem()

    // Display the fetched data from API
    render() {
        var toDoHTMLList = [];

        for (var i=0; i<this._items.length; i++)
        {
            const item = this._items[i];            //assign the individual item to the variable

            const toDoHTML = createHTMLList(i, item.oTitle, item.oDescription, item.oTargetDate);

            toDoHTMLList.push(toDoHTML);
        }

        //Join all the elements/items in my toDoHTMLList array into one string, and separate by a break
        const pHTML = toDoHTMLList.join('\n');
        document.querySelector('#todo-item').innerHTML = pHTML;
    }

}   //End of toDoController class
