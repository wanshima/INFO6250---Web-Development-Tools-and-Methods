# Second-Hand Goods Trading Platform

## Overview

This project creates a second-hand goods trading platform that allows users to log in and manage a list of second-hand items. Logged-in users can add, view, update, and delete their own items. They can also mark their own items as sold, and view items added by other users. 

## Features

- **User Authentication:**
  - Non-logged-in users can see sale item's names, price, but cannot see the item's description and seller's contact info. They also cannot see whether the item is sold. 
  - Users can log in with a username.
  - The username "dog" is banned and cannot be used to log in.

- **Item Management:**
  - **Add Item:** Users can add new items with details like title, description, price, and contact phone number. Price must be a positive number and contact phone number must contain only digits.
  - **View Items:** Displays a list of items, including items added by the current user, and items add by other users.
  - **Update Item:** Users can click the checkbox next to their own item to mark it as sold and no longer available. Users can also click the update button to update the item name, description, price, and contact info. 
  - **Delete Item:** Users can delete the items they added before from the list by clicking the delete button.
