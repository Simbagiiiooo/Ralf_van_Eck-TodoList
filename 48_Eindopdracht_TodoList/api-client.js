const baseUrl = ` http://localhost:3000/`

//GET
const getToDo = async(todo) => {
    let result = await fetch(baseUrl, {
        method: "GET",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json",
            },
    });
    let json = await result.json();
    console.log(json);
    return json;
};

//POST
const postToDo = async obj =>{
    const result = await fetch(baseUrl,{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
            },
        });
    const json = await result.json();
    console.log(json);
    };

    //PUT
const completeOneToDo = async (id, data, state) =>{
    const result = await fetch(`${baseUrl}${id}`, {
        method: "PUT",
        body: JSON.stringify({description: data, done: state}),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await result.json();
    console.log(json);
};

//DELETE
const deleteOneToDo = async id => {
    try {
    const result = await fetch(`${baseUrl}${id}`, { 
        method: "DELETE", });
    }  catch (err) {
        console.log(err)
        }
};

const deleteAllToDos = async() => {
    const result = await fetch(baseUrl, {
        headers: {
            "Content-Type": "application/json",
            },
    });
    const json = await result.json();
    json.forEach(item => deleteOneToDo(item._id));
    console.log(json);
}  