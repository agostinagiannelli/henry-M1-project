class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }
    createActivity(id, title, description, imgUrl) {
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }
    getAllActivities() {
        return this.activities;
    }
    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

const repository = new Repository();

// Select title input
const titleInput = document.getElementById("title");
// Select description input
const descriptionInput = document.getElementById("description");
// Select imgURL input
const imgUrlInput = document.getElementById("imgUrl");
// Select submit button
const submitButton = document.getElementById("submit");
// Select activities container
const activitiesContainer = document.getElementById("submitted");


// Handler (add activity + render)
const addActivityHandler = () => {
    // - Obtain input values
    const title = titleInput.value;
    const description = descriptionInput.value;
    const imgUrl = imgUrlInput.value;

    // - Check with if that values are completed + return alert if not
    if (!title || !description || !imgUrl) {
        alert("Please fill in all the values.");
    }

    // - Delete inputs from form
    titleInput.value = "";
    descriptionInput.value = "";
    imgUrlInput.value = "";

    // - Add activity to repository
    repository.createActivity(null, title, description, imgUrl);

    // - Empty activities container
    activitiesContainer.innerHTML = "";

    // - Get all activities list
    const allActivities = repository.getAllActivities();

    // - Convert objects activity to html cards with map
    const activityItems = allActivities.map(activity => {
        const activityItem = document.createElement("div");
        activityItem.innerHTML = `
            <img src="${activity.imgUrl}" alt="${activity.title}">
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <button class="deleteBtn">Delete</button>
        `;
        activityItem.classList.add("card");
        return activityItem;
    });

    // - Append all cards to card container with forEach
    activityItems.forEach(item => {
        activitiesContainer.append(item);
    });
};

submitButton.addEventListener('click', addActivityHandler);