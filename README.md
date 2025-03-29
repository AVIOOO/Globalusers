# Interactive Quiz Application

An interactive quiz app allows users to attempt a quiz multiple times, view attempt history, get instant feedback, track their progress, and more!

## Features

- _Quiz Display_: Users can view a list of quiz questions, select answers, and get instant feedback on each answer.
- _Multiple Attempts_: Users can attempt the quiz multiple times and keep track of their progress.
- _Timer-based Questions_: Each question has a time limit (e.g., 30 seconds), and users need to answer within the given time.
- _Scoreboard_: After each quiz, users will see their score and performance.
- _Attempt History_: Users can see the history of their attempts, including their scores and answers.
- _IndexedDB Storage: Quiz attempt history is stored locally using \*\*IndexedDB_, allowing users to track their progress even after refreshing the page.
- _Instant Feedback_: Each selected answer is immediately marked as correct or incorrect, with feedback shown instantly.

## Technologies Used

- _React.js_: For building the user interface and quiz functionality.
- _Vite_: Fast build tool to enhance the development experience.
- _TailwindCSS_: For styling and responsive design.
- _IndexedDB_: For storing quiz attempt history and local data.

## How to Install and Run Locally

1. _Clone the repository_:

   bash
   git clone https://github.com/AVIOOO/crazy-quiz.git

2. _Navigate to the project directory_:
   bash
   cd crazy-quiz

3. _Install Dependencies_:
   bash
   npm install

4. _Run the development server:_:
   bash
   npm run dev

5. _Open the App :_:
   The app should now be running at http://localhost:5173 (default Vite port).

## Deployment

The quiz application is deployed on Netlify and can be accessed here:

_Live Demo_: https://crazyquiz.netlify.app/
