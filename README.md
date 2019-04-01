This project was created by [Coder Consulting Team](http://coderconsulting.de/).

# PROJECT OVERVIEW

This project shows an example of developer renting platform for companies.<br> 
It allows for developers to register and fill in their profiles. Upload a 
profile picture, set price, etc.. <br>
It uses **ReactJS for frontend** that connects to a **WordPress backend via WPRest api**.<br>
Project is styled using **mdbootstrap** and page is responsive for mobile and tablets as well.

## `Landing Page`
Landing page shows all developers registered in the company. Developers are shown in cards with
their names and profile pictures, price, etc.. **Clicking on or near developer picture (avatar) or
on the button "About me"**, leads to detailed page about that developer information.<br>
**Clicking on "Rent a developer" button** creates a menu on the right side 
(or on the bottom right above the footer on mobile devices). The menu consists of developer name and 
price and if multiple developers are picked it automatically calculates total cost per hour 
based on sum of their individual price per hour. You can remove picked developer from the menu by
**clicking red "X"**.<br>
**Clicking on "Submit" button** will take client to the Hire Form.

## `Hire Form`
Hire forms enables client to pick for how long client wants to rent developers.<br> 
Client picks hire period by clicking on the calendar for starting date and then clicking again
for end date below are input fields for entering daily work hours and Working days throughout 
the week. Last 2 inputs are for client to enter his name and email.<br>
**Based on that total work hours and total cost is calculated and button that says "PLEASE
FILL THE CALENDAR AND INPUTS" rerenders as "MAKE AN ORDER".** <br/>
And if clicked it sends email to a company mail with all relevant information and takes client to 
Order Received page.
 
## `Login and Register`
Login and register pages are simple login and register form with input validation. They are used
to register a new developer as user on WordPress backend. And every user who is registered gets a Post
on WordPress associated with him.

## `User Page`
When developers login they see detailed page about their developer information. But now developer has 
an option to change his information by clicking **"Details"** on the navbar. <br>
When a developer logs in for the first time, he will be prompted to fill in his details. 

## `Details Page`
On this page developer can enter his information, price, experience etc.. Also by clicking 
**"Browse"** or **"Choose your image"** file dialog appears so the developer can choose an image for
his or hers profile. Once finished with updating profile, changes can be submitted by clicking the
**"SUBMIT"** button. Developer can logout from his profile by clicking  **"Logout"** on the navbar.

## `Navbar and footer`
 Navbar and footer are present on almost all pages. Navbar consists of Logo and login and register
 links if developer is not logged in, or logout details and user links if developer is logged in. 
 On phone links go into a **toggler** to preserve responsiveness. 
 Footer consists of **"Follow us:"** buttons for contact page and linked in. Short paragraphs about
 us and copyrights. 