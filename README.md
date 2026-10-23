# CS-465 Full Stack Development – Travlr Getaways

## Project Overview

This project involved developing a full stack web application called Travlr Getaways using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). The application includes a customer-facing website where users can view travel packages and an administrative single-page application (SPA) where authorized users can manage trip information. Throughout the course, I developed the frontend and backend, connected the application to a database, created API endpoints, and implemented authentication to protect administrative features.

## Architecture

**Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).**

Throughout this project, I worked with different approaches to frontend development. The customer-facing website used Express with HTML templates and JavaScript to display travel information. This approach was useful for displaying content through server-rendered pages. The administrative side used Angular to create a single-page application (SPA), which allowed users to interact with the application without reloading the entire page. The SPA provided a more dynamic experience because it could update information through API requests. Both approaches were useful, but the SPA was better suited for administrative tasks that required frequent interaction with trip data.

**Why did the backend use a NoSQL MongoDB database?**

The backend used MongoDB because it provides a flexible way to store and manage data. Unlike relational databases that use tables and rows, MongoDB stores information in documents that are similar to JSON objects. This made it easier to work with trip information and connect the database to the JavaScript-based application. MongoDB also works well with Node.js and Express, making it a practical choice for the MEAN stack.

## Functionality

**How is JSON different from JavaScript, and how does JSON tie together the frontend and backend development pieces?**

JSON (JavaScript Object Notation) is a data format used to store and exchange information, while JavaScript is a programming language used to create application functionality. JSON uses a structured format consisting of key-value pairs, making it easy for different parts of an application to communicate. In this project, JSON was used to transfer trip information between the MongoDB database, Express API, and Angular frontend. This allowed the frontend to request information from the backend and display it to users.

**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable UI components.**

Throughout development, I refactored parts of the application to improve organization and reduce repeated code. One example was moving trip information into MongoDB instead of relying on static data files. Another improvement was using Angular components to display and manage trip information in the administrative application. Reusable UI components helped keep the application consistent and made it easier to maintain. Instead of rewriting the same code in multiple places, components could be reused and updated as needed. This improved efficiency and made future changes easier to implement.

## Testing

**Explain your understanding of methods, endpoints, and security in a full stack application.**

Testing was an important part of making sure the frontend, backend, and database worked together correctly. API endpoints provide specific routes that allow the frontend to communicate with the backend. HTTP methods such as GET, POST, PUT, and DELETE are used to retrieve, create, update, and remove information. During development, I learned how to test these endpoints and verify that the correct responses were returned.

Adding authentication made testing more challenging because certain endpoints required users to be logged in and provide a valid token. I learned the importance of testing both authorized and unauthorized requests to ensure that protected features could not be accessed without proper authentication. These security measures helped protect the administrative side of the application and prevent unauthorized changes to trip information.

## Reflection

**How has this course helped you reach your professional goals? What skills have you learned, developed, or mastered to become a more marketable candidate?**

This course helped me develop a better understanding of how full stack applications are designed and built. Before this course, I had more experience working with individual programming concepts, but this project showed me how frontend development, backend APIs, databases, and authentication all work together in a complete application.

One of the most valuable skills I gained was learning how to work with the MEAN stack and connect multiple technologies into one functioning application. I also improved my ability to troubleshoot errors, test API endpoints, organize code, and implement security features. These skills will help me become a more marketable candidate because full stack development requires an understanding of both the user experience and the systems supporting it.

Overall, this project gave me more confidence in my ability to develop and maintain web applications. It also provided a completed project that I can include in my professional portfolio to demonstrate my technical skills and growth as a software developer.
