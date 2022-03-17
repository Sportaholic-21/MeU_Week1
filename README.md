# MeU_Week1
Run Project


Step 1 : Clone Project

        Create new folder, open cmd, go to dir of new folder
        Enter : git clone https://github.com/Sportaholic-21/MeU_Week1

Step 2 : Download Xampp to work with MySQL
        
          Start MySQL in Xampp
          Once MySQL is successfully started, open your browser and access http://localhost:80/phpmyadmin/
          Copy the sql contents found in database folder into the "SQL" tab in PhpMyAdmin and press Go
        
Step 3 : Open project in IDE like Visual Studio, Intellij, ...
        
          Open terminal, to init nodes and dependecies, enter: npm install 
          
          Start project : npm run dev
          Test project : npm test
          Observe product table : http://localhost:3000/


Techonology Used:

            - Node.js, ExpressJS 
            - Frontend: EJS template engine
Additional dependencies:
 
            - jest & supertest for testing
            - axios for making api calls on client