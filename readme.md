### WORK PLANNING SERVICE

API service for Work Planning

The API supports the below functionality:

* Creating a new worker
* Updating a worker details
* Fetching a worker by their IDs
* Fetching all saved workers
* Generating a 24 hour work planning timetable based on the number of saved workers

#### API DOC. URL

`https://work-planning-service.herokuapp.com/api/api-docs`

#### TECH USED

* Node (>=16.0.0)
* Express (4.17.3)
* TypeScript (4.6.2)
* Swagger(4.3.0)
* Jest (27.5.1)
* Yarn (1.22.11)

#### Set Up/Installation

First clone this project into your working directory.

`git clone https://github.com/calculusky/work-planning-service`

Next thing is to install the dependencies on the
*package.json* file, to do this run the below command.

`yarn`

Also configure the *.env* file using the format provided
in the *.env.example* file.

1. create a new file with the name *.env*
2. copy the contents on the *.env.example* and paste it on the newly
   created *.env* file
3. edit the *.env* file to match the desired set up
4. Launch the development server by running the command `yarn dev`

#### Author

* Nwankwo Chinedum - Backend(Nodejs) Developer
