/** @format */

// Storage Controller
const StorageCtrl = (function () {
	// Public method of Storage
	return {
		setIntoLocalStorage: function (item) {
			let items;
			if (localStorage.getItem("items") === null) {
				items = [];
				// new item
				items.push(item);
				localStorage.setItem("items", JSON.stringify(items));
			} else {
				items = JSON.parse(localStorage.getItem("items"));
				// new item
				items.push(item);
				localStorage.setItem("items", JSON.stringify(items));
			}
		},
		getLocalStorageItem: function () {
			let items;
			if (localStorage.getItem("items") === null) {
				items = [];
			} else {
				items = JSON.parse(localStorage.getItem("items"));
			}
			return items;
		},
		updateItemStorage: function (updateItem) {
			let items = JSON.parse(localStorage.getItem("items"));

			items.forEach((item, index) => {
				if (updateItem.id === item.id) {
					items.splice(index, 1, updateItem);
				}
			});
			localStorage.setItem("items", JSON.stringify(items));
		},
		deleteItemStorage: function (id) {
			let items = JSON.parse(localStorage.getItem("items"));

			items.forEach((item, index) => {
				if (id === item.id) {
					items.splice(index, 1);
				}
			});
			localStorage.setItem("items", JSON.stringify(items));
		},
		clearItemsStorage: function () {
			localStorage.removeItem('items');
		},
		itemsLengthStorage: function () {
			let items = JSON.parse(localStorage.getItem("items"));
			return items;
		}
	};
})();

// item Controller
const ItemCtrl = (function () {
	// item constrcutor

	const Item = function (id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

	// Data Structure /State
	const data = {
		// items: [
		// 	// { id: 0, name: "Steak Dinner", calories: 1200 },
		// 	// { id: 1, name: "Cookie", calories: 400 },
		// 	// { id: 2, name: "Egg", calories: 300 },
		// ],
		items: StorageCtrl.getLocalStorageItem(),
		currentItem: null,
		totalCalories: 0,
	};

	// return as publis this above data structure ok
	return {
		getItems: function () {
			return data.items;
		},
		addItem: function (name, calorie) {
			let ID;
			// create ID
			if (data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Calories to  numbers
			calories = parseInt(calorie);

			// create new item
			newItem = new Item(ID, name, calories);
			// add to items array
			data.items.push(newItem);
			return newItem;
		},
		getTotalCalories: function () {
			let total = 0;
			data.items.forEach((item) => {
				total += item.calories;
			});
			// return and set totalcalories in data structure
			return (data.totalCalories = total);
		},
		getItemById: function (id) {
			let found = null;
			// loop data
			data.items.forEach((item) => {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updateItem: function (name, calorie) {
			// calories to Number
			calorie = parseInt(calorie);

			let found = null;
			data.items.forEach((item) => {
				if (item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calorie;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function (id) {
			// get id
			const ids = data.items.map((item) => {
				return item.id;
			});
			// get index
			const index = ids.indexOf(id);

			// remove item
			data.items.splice(index, 1);
		},
		clearAllItems: function () {
			data.items = [];
		},
		setCurrentItem: function (item) {
			data.currentItem = item;
		},
		getCurrentItem: function () {
			return data.currentItem;
		},
		logData: function () {
			return data;
		},
	};
})();

// UI Controller
const UICtrl = (function () {
	const UISelectors = {
		itemList: "#items-list",
		ListItems: "#items-list li",
		itemName: "#item-name",
		itemCalorie: "#item-calorie",
		addBtn: ".add-btn",
		updateBtn: ".update-btn",
		editBtn: ".edit-item",
		deleteBtn: ".delete-btn",
		backBtn: ".back-btn",
		clearBtn: ".clear-btn",
		totalCalories: ".total-calories",
		parentContainer: "#parentContainer",
		cardContainer: "#cardContainer",
	};
	// public Method
	return {
		DisplayItemList: function (items) {
			let output = "";
			items.forEach((item) => {
				output += `
                    <li class="collection-item" id="item-${item.id}">
                       <strong>${item.name} : </strong> <em>${item.calories} calories</em>
                       <a href="#" class="right secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                   </li>
                `;
			});
			document.querySelector(UISelectors.itemList).innerHTML = output;
		},
		getItemInput: function () {
			return {
				itemName: document.querySelector(UISelectors.itemName).value,
				itemCalorie: document.querySelector(UISelectors.itemCalorie).value,
			};
		},
		addListItem: function (item) {
			// when item added to list we must display a result below the will must be executed
			document.querySelector("#cardListContainer").style.display = "block";

			// create li element
			const li = document.createElement("li");
			li.className = "collection-item";
			// add ID
			li.id = `item-${item.id}`;
			// add html
			li.innerHTML = `
            <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
            <a href="#" class="right secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;

			// insert item into list
			document
				.querySelector(UISelectors.itemList)
				.insertAdjacentElement("beforeend", li);
		},
		updateListItem: function (item) {
			// console.log(item)
			let listitems = document.querySelectorAll(UISelectors.ListItems);
			listitems = Array.from(listitems);
			listitems.forEach((listitem) => {
				const itemId = listitem.getAttribute("id");
				// console.log(itemId);
				if (itemId === `item-${item.id}`) {
					document.querySelector(`#${itemId}`).innerHTML = `
                        <strong>${item.name} : </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="right secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;
				}
			});
		},
		clearInputFields: function () {
			document.querySelector(UISelectors.itemName).value = null;
			document.querySelector(UISelectors.itemCalorie).value = null;
		},
		addItemTOForm: function () {
			document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(
				UISelectors.itemCalorie
			).value = ItemCtrl.getCurrentItem().calories;
		},
		hideCardListContainer: function () {
			document.querySelector("#cardListContainer").style.display = "none";
		},
		showTotalCalories: function (total) {
			document.querySelector(UISelectors.totalCalories).textContent = total;
		},
		clearEditState: function () {
			UICtrl.clearInputFields();
			document.querySelector(UISelectors.updateBtn).style.display = "none";
			document.querySelector(UISelectors.deleteBtn).style.display = "none";
			document.querySelector(UISelectors.backBtn).style.display = "none";
			document.querySelector(UISelectors.addBtn).style.display = "inline";
		},
		updateUIState: function () {
			document.querySelector(UISelectors.updateBtn).style.display = "inline";
			document.querySelector(UISelectors.deleteBtn).style.display = "inline";
			document.querySelector(UISelectors.backBtn).style.display = "inline";
			document.querySelector(UISelectors.addBtn).style.display = "none";
		},
		deleteItemFromList(id) {
			const itemID = `#item-${id}`;
			const item = document.querySelector(itemID).remove();
		},
		removeItems: function () {
			let listitems = document.querySelectorAll(UISelectors.ListItems);

			// turn node list into array
			listitems = Array.from(listitems);
			listitems.forEach((item) => {
				item.remove();
			});
		},
		displayAlert: function (type, text) {
			const div = document.createElement("div");
			div.className = `alert ${type}`;
			div.appendChild(document.createTextNode(text));

			// get parent
			const parentContainer = document.querySelector(
				UISelectors.parentContainer
			);
			const cardContainer = document.querySelector(UISelectors.cardContainer);

			parentContainer.insertBefore(div, cardContainer);
			setTimeout(UICtrl.clearAlert, 2000);
		},
		clearAlert: function () {
			document.querySelector(".alert").remove();
		},
		getSelectors: function () {
			return UISelectors;
		},
	};
})();

// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl) {
	// load Event Listeners
	const loadEventListeners = function () {
		// Get uiSelector from UICtrl ok..
		const UISelectors = UICtrl.getSelectors();

		// add item Event
		document
			.querySelector(UISelectors.addBtn)
			.addEventListener("click", itemAddSubmit);

		// disabled enter key sometime it des'nt work
		document.addEventListener("keypress", (e) => {
			if (e.keycode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});
		// edi event button when edit btn click then change UI Status
		document
			.querySelector(UISelectors.itemList)
			.addEventListener("click", itemEditClick);

		// update event
		document
			.querySelector(UISelectors.updateBtn)
			.addEventListener("click", updateItemSubmit);

		// DELETE event
		document
			.querySelector(UISelectors.deleteBtn)
			.addEventListener("click", itemDeleteSubmit);

		// back button event
		document
			.querySelector(UISelectors.backBtn)
			.addEventListener("click", (e) => {
				UICtrl.clearEditState();
				e.preventDefault();
			});

		// clear button
		document
			.querySelector(UISelectors.clearBtn)
			.addEventListener("click", clearAllItems);
	};

	// Add item Submit
	const itemAddSubmit = function (e) {
		const input = UICtrl.getItemInput();
		if (input.itemName !== "" && input.itemCalorie !== "") {
			//    Add item
			const newItem = ItemCtrl.addItem(input.itemName, input.itemCalorie);
			// add item to the ui list
			UICtrl.addListItem(newItem);

			// item add to localStorage
			const lSItems = StorageCtrl.setIntoLocalStorage(newItem);

			// get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// show in ui total Calories
			UICtrl.showTotalCalories(totalCalories);

			// clear input fields after item added
			UICtrl.clearInputFields();

			// dislay alert when fields not empty something in the fields
			UICtrl.displayAlert("alert-success", "Item Successfully Added..");
		} else {
			// dislay alert when fields empty
			UICtrl.displayAlert("alert-danger", "Fill The Fields First..");
		}
		e.preventDefault();
	};

	// edit function
	const itemEditClick = function (e) {
		if (e.target.classList.contains("edit-item")) {
			// get list item id
			const listId = e.target.parentNode.parentNode.id;

			// convert to array this above listid by split method
			const ListidArr = listId.split("-");

			// get actuall id of item
			const id = parseInt(ListidArr[1]);

			// get item by id
			const itemtoEdit = ItemCtrl.getItemById(id);

			// set current item to
			ItemCtrl.setCurrentItem(itemtoEdit);

			// add item to form
			UICtrl.addItemTOForm();

			// update UI status
			UICtrl.updateUIState();
		}
		e.preventDefault();
	};

	// itemupdate submit function
	const updateItemSubmit = function (e) {
		// get input
		const input = UICtrl.getItemInput();

		// update item
		const updateItem = ItemCtrl.updateItem(input.itemName, input.itemCalorie);

		// update list item in ui
		UICtrl.updateListItem(updateItem);

		// get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// show in ui total Calories
		UICtrl.showTotalCalories(totalCalories);

		// update item in localstorage
		StorageCtrl.updateItemStorage(updateItem);

		// dislay alert when fields not empty something in the fields
		UICtrl.displayAlert("alert-success", "Item Updated..");

		// update ui
		UICtrl.clearEditState();
		e.preventDefault();
	};

	// delete event function
	const itemDeleteSubmit = function (e) {
		// get current item
		const currentItem = ItemCtrl.getCurrentItem();

		// delete item from data structure
		ItemCtrl.deleteItem(currentItem);

		//delete item from UI
		UICtrl.deleteItemFromList(currentItem.id);

		// get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// show in ui total Calories
		UICtrl.showTotalCalories(totalCalories);

		// delete from localstorage
		StorageCtrl.deleteItemStorage(currentItem.id);

		if (StorageCtrl.itemsLengthStorage() === null) {
			// hide the list
			UICtrl.hideCardListContainer();
		}
			// clear the state
			UICtrl.clearEditState();

		// dislay alert when fields not empty something in the fields
		UICtrl.displayAlert("alert-success", "Item Deleted...");
		e.preventDefault();
	};

	// clear all item
	const clearAllItems = function () {
		// delete all items from data structure
		ItemCtrl.clearAllItems();

		// get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// show in ui total Calories
		UICtrl.showTotalCalories(totalCalories);

		// remove from ui
		UICtrl.removeItems();

		//remove from localStorage
		StorageCtrl.clearItemsStorage();
		// hide the list
		UICtrl.hideCardListContainer();

		
		// if items present in the Array then do this
		if (ItemCtrl.getItems.length > 0) {
			UICtrl.displayAlert("alert-success", "You Clear All items...");
		} else {
			UICtrl.displayAlert("alert-success", "There have no item Present...");
		}
	};

	// below is public method return AppCtrl
	return {
		init: function () {
			// init state of UI
			UICtrl.clearEditState();

			console.log("initializing app");
			// fetch data from ItemCtrl ok
			const items = ItemCtrl.getItems();

			// poplulate list with items
			UICtrl.DisplayItemList(items);

			// get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// show in ui total Calories
			UICtrl.showTotalCalories(totalCalories);

			// // hide the list
			if (StorageCtrl.itemsLengthStorage() === null) {
				UICtrl.hideCardListContainer();
			}
			
			
			// Load Event Listeners
			loadEventListeners();
		},
};
})(ItemCtrl, UICtrl,StorageCtrl);

AppCtrl.init();
