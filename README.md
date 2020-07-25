# POC

The project folder contains the "client" subfolder that holds the whole react application.

### Starting the application

1. Goto mongodb.com . Under Software tab in navigation bar click "Community Server" . On the right side of newly opened page under available downloads. Select : Version 4.2.8, Platform Windows, Package msi and click download.
2. Install mongodb. Mongodb part is done here.
3. Open project folder and in terminal do npm install which will install dependamcies of backend.
4. In terminal goto cd client which is the actual react application.
5. Type npm install and click enter. The react application dependancies will install.
6. Goto cd.. i.e. the main folder and type npm run dev. Both backend server and react application will start concurrently.Goto localhost:3000 to view the application.

#### Important : Just add todo items with a different title name for every todo. Suggested to use the application after adding more than 5 todo items.

### Starting the documentation

1. Goto client folder and type the command npm run doc . The docs folder will be created inside client folder.
2. Open the "docs" folder and open index.html 
3. In index.html in empty area right-click and click "Open with Live Sever". For this live server extension needs to be installed in VSCode . The application document will load !

### Testing the react application

1. Goto client folder.
2. Run npm test.

In src the project code is divided into different folders i.e. Context, Pagination & Todos representing different modules of the project.

The homepage shows the TodoList component.