document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById('table-body');
    const dogForm = document.getElementById('dog-form');
    const dogNameInput = document.getElementById('name');
    const dogBreedInput = document.getElementById('breed');
    const dogSexInput = document.getElementById('sex');
    let currentDogId = null;
  
    // Function to fetch and display the list of dogs
    function fetchAndDisplayDogs() {
      fetch('http://localhost:3000/dogs')
        .then((response) => response.json())
        .then((dogs) => {
          dogTable.innerHTML = ''; // Clear the table
          dogs.forEach((dog) => {
            displayDog(dog);
          });
        });
    }
  
    // Function to add a dog to the table
    function displayDog(dog) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-dog-id="${dog.id}" class="edit-button">Edit</button></td>
      `;
      dogTable.appendChild(row);
      const editButton = row.querySelector('.edit-button');
      editButton.addEventListener('click', () => editDog(dog));
    }
  
    // Function to populate the form with a dog's information
    function editDog(dog) {
      dogNameInput.value = dog.name;
      dogBreedInput.value = dog.breed;
      dogSexInput.value = dog.sex;
      currentDogId = dog.id;
    }
  
    // Function to handle form submission
    dogForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const updatedDog = {
        name: dogNameInput.value,
        breed: dogBreedInput.value,
        sex: dogSexInput.value,
      };
      if (currentDogId) {
        // If we have a current dog ID, it's an update
        fetch(`http://localhost:3000/dogs/${currentDogId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDog),
        })
          .then(() => {
            currentDogId = null;
            fetchAndDisplayDogs(); // Refresh the table
            dogForm.reset(); // Clear the form
          });
      }
    });
  
    // Initial fetch and display
    fetchAndDisplayDogs();
  });