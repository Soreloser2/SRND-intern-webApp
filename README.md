# CodeDay Analytics Web App

## Introduction
This is a web app I made for the SRND internship application using Node.js,
Express.js, and SQLite3. There is only one page, which displays the information. The database is loaded from the disc, so I have included it in the folder.

## Instructions
This app uses Docker to run, and all the necessary files are included. You may need to install Node.js, I don't know as that was kind of hard to test for. Otherwise, just navigate to the correct folder and run "docker-compose up". Then the page should display on http://localhost:8080 of your browser. To stop, just run "docker-compose down".

## Features
I designed this app with some scalability in mind. Most of the features would work for other events, so long as the data was formatted the same and the database was replaced. The only thing that would not work theoretically for the next event would be the early bird registration, because it checks to see if the person registered 2 weeks before by checking against the date of February 2 at noon. 

## Conclusion
I learned a lot making this web app. I knew basically no Javascript, SQL, or Docker before, and I had a lot of fun learning those while making the project. I definitely would try to improve the look of the page by learning some CSS, and maybe even add separate page navigation for a breakdown by specific location if I had more time. Even though it was tight, I feel pretty proud of my work. Thank you for pushing me to accomplish this!

-Soren
