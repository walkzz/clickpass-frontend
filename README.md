# ClickPass

ClickPass is a web application for creating events, purchasing tickets for various events and interacting with organizers and users. It features one of the following events which the organizers can make:
- Concerts
- Theater
- Cinema
- Opera
## Types of users of ClickPass

There are currently 3 types of roles:
- Admin
- Organizer
- User

## Explaining the functionalities of the users

- The admin(or administrator) controls the whole web application. It has access to every operation and functionality, such as: viewing ticket purchases, creating events, deleting blog posts, removing, blocking or promoting users.
- The organizer can make events and create tickets for any events that he creates. The organizer has access to a dashboard which shows the statistics for the events he created, how much profits the events made and more.
- The user is a standard user of the web application. The user can buy tickets, view events, upload blog posts, comment on other's posts or removing their own posts.

## Here are screenshots of how the dashboard looks from the admin and organizers perspective:
- Admin - can access anything on the admin panel from the left side

  <img width="1903" height="914" alt="Screenshot 2026-05-27 221241" src="https://github.com/user-attachments/assets/76dbd095-961f-44f4-b066-394caec6697f" />

- Organizer - can only access events and manage tickets
  <img width="1901" height="913" alt="Screenshot 2026-05-27 221606" src="https://github.com/user-attachments/assets/f7c521bd-86b0-4d7a-9fd5-f24c455f4952" />

# How to get started using the ClickPass web application

Simply, create an account using the "Sign in" button. Once you successfully create an account, you can view events, buy tickets or upload anything in the blog section.

## How to run the web application on your machine
NOTE: Because of privacy policies from the academy course, this GitHub repo was private, which means no API keys can be cloned and testing the web application is not possible without providing the API keys. In order to fix this, I've uploaded the necessary files on Google Drive which will be send to the recipent.
- Open VScode and run this command in the terminal: "npm install". Do this in both folders, front and backend.
- How to start the application: Type "npm run dev" for frontend and "node index.js" for backend.

The required API keys are inside the .env file, otherwise the application wouldn't work because it is not hosted.

NOTE: The forgot password and contact functionality will always return to the default Mailgun email provider because of the free subscription plan the service offers, these features will be further implemented in the future. The payment functionality uses mock information and no transactions are recorded or processed.
