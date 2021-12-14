import "./sync.js";
import { router, server } from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";
import { Travel_Plans, Users } from "./sync.js";


/* Tabela USERS */


//ruta GET pentru tabela Users - toate inregistrarile:
router
  .route("/sequelize/users")
  .get(async function getSequelizeUsers(_, res) {
    const result = await sequelizeOperationsAPI.getUsers();
    res.status(200).json(result);
  });

//ruta GET pentru tabela Users - cautare dupa Id:
router
  .route("/sequelize/users/:userId")
  .get(async function getUserById(req, res) {
    const userId = +req.params.userId;
    var result = await sequelizeOperationsAPI.getUserById(userId);
    res.status(200).json(result);
  });

//ruta POST pentru tabela Users
router
    .route("/sequelize/users")
    .post(async function createUser({ body }, res) {
    try {
    if(!Object.keys(body).length){
        res.status(400).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('Name') || !body.hasOwnProperty('Age')){
        res.status(400).json({ message: 
        `Malformed request. Input template for creating a user: { Name: ..., Age: ... }` });
    }
    else if(body.Age<0 || typeof body.Age !== "number") {
        res.status(400).json({ message: "Age should be a positive number" });
    }
    else if(typeof body.Name !== "string"){
        res.status(400).json({ message: "Name should be a string" });
    }
    else {
        await sequelizeOperationsAPI.createUser(body);
        res.status(200).json("User successfully created!");
    } 
    } catch (err) {
        console.error(`Error while calling API: ${err}`);
    }
  });


//ruta PUT pentru tabela Users:
router
  .route("/sequelize/users/:userId")
  .put(async function updateUser({ params: { userId }, body }, res) {
    try {
    if(!Object.keys(body).length){
        res.status(400).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('Name') || !body.hasOwnProperty('Age')){
        res.status(400).json({ message: 
        `Malformed request. Input template for creating a user: { Name: ..., Age: ... }` });
    }
    else if(body.Age<0 || typeof body.Age !== "number") {
        res.status(400).json({ message: "Age should be a positive number" });
    }
    else if(typeof body.Name !== "string"){
        res.status(400).json({ message: "Name should be a string" });
    }
    else {
      await sequelizeOperationsAPI.updateUser(+userId, body);
      res.status(200).json("User successfully updated!");
    }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });


//ruta DELETE pentru tabela Users:
router
  .route("/sequelize/users/:userId")
  .delete(async function deleteUser({ params: { userId } }, res) 
  {
    try {
      await sequelizeOperationsAPI.deleteUser(+userId);
      res.status(200).json("User successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

/* Tabela USERS */



/* Tabela TRAVEL_PLANS */


//ruta GET pentru tabela Travel_Plans - toate inregistrarile:
router
  .route("/sequelize/travel_plans")
  .get(async function getSequelizeTravelPlans(_, res) {
    const result = await sequelizeOperationsAPI.getTravelPlans();
    res.status(200).json(result);
  });

//ruta GET pentru tabela Travel_Plans - cautare dupa Id:
router
  .route("/sequelize/travel_plans/:travelId")
  .get(async function getTravelPlanById(req, res) {
    const travelId = +req.params.travelId;
    var result = await sequelizeOperationsAPI.getTravelPlanById(travelId);
    res.status(200).json(result);
  });

//ruta GET pentru afisare user cu un anumit plan de calatorie
router
  .route("/sequelize/users/travel_plans/:travelId")
  .get(async function getUserWithTravelPlanId({ params: { travelId }}, res) 
  {
    const result = await sequelizeOperationsAPI.getUserWithTravelPlanId(travelId);
    res.status(200).json(result); 
  });

//ruta GET pentru afisare planuri de calatorie ale unui anumit user
router
  .route("/sequelize/users/:userId/travel_plans")
  .get(async function getTravelPlansOfUserId({ params: { userId }}, res) 
  {
    const result = await sequelizeOperationsAPI.getTravelPlansOfUserId(userId);
    res.status(200).json(result); 
  });

//ruta GET pentru afisare toti userii cu planurile de calatorie aferente
router
  .route("/sequelize/usersWithTravelPlans")
  .get(async function getUsersWithTravelPlans(_, res) {
    var result = await sequelizeOperationsAPI.getUsersWithTravelPlans();
    res.status(200).json(result);
  });


//ruta POST pentru tabela Travel_Plans
router
  .route("/sequelize/users/:userId/travel_plans")
  .post(async function createTravelPlanForUserId({ params: { userId }, body }, res) {
  try {
  if(!Object.keys(body).length){
      res.status(404).json({ message: "Body is missing" });
  }
  else if(!body.hasOwnProperty('Origin') || !body.hasOwnProperty('Destination')){
      res.status(404).json({ message: 
      `Malformed request. Input template for creating a travel plan: { Origin: ..., Destination: ... }` });
  }
  else if(typeof body.Origin !== "string") {
      res.status(400).json({ message: "Origin should be a string" });
  }
  else if(typeof body.Destination !== "string"){
      res.status(400).json({ message: "Destination should be a string" });
  }
  else {
    await sequelizeOperationsAPI.createTravelPlanForUserId(+userId, body);
    res.status(200).json("TravelPlan successfully created!");
  }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
  });


//ruta POST pentru tabela Travel_Plans
router.route("/sequelize/usersWithTravelPlans").post(async ({ body }, res) => {
  try {
    await sequelizeOperationsAPI.createUsersWithTravelPlans(body);
    res.status(200).json("User with TravelPlan successfully created!");
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
});

//ruta PUT pentru tabela Travel_Plans - updatare TravelPlan
router
  .route("/sequelize/travel_plans/:travelId")
  .put(async function updateTravelPlanById({ params: { travelId }, body }, res) {
    try {
    if(!Object.keys(body).length){
        res.status(404).json({ message: "Body is missing" });
    }
    else if(!body.hasOwnProperty('Origin') || !body.hasOwnProperty('Destination')){
        res.status(404).json({ message: 
        `Malformed request. Input template for creating a travel plan: { Origin: ..., Destination: ... }` });
    }
    else if(typeof body.Origin !== "string") {
        res.status(400).json({ message: "Origin should be a string" });
    }
    else if(typeof body.Destination !== "string"){
        res.status(400).json({ message: "Destination should be a string" });
    }
    else {
      await sequelizeOperationsAPI.updateTravelPlanById(+travelId, body);
      res.status(200).json("TravelPlan successfully updated!");
    }
    } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

//ruta PUT pentru tabela Travel_Plans - updatare TravelPlan specific al unui User specific
router
  .route("/sequelize/users/:userId/travel_plans/:travelId")
  .put(async function updateTravelPlanOfUserId({ params: { userId, travelId }, body }, res) {
  try {
    if(!Object.keys(body).length){
      res.status(404).json({ message: "Body is missing" });
  }
  else if(!body.hasOwnProperty('Origin') || !body.hasOwnProperty('Destination')){
      res.status(404).json({ message: 
      `Malformed request. Input template for creating a travel plan: { Origin: ..., Destination: ... }` });
  }
  else if(typeof body.Origin !== "string") {
      res.status(400).json({ message: "Origin should be a string" });
  }
  else if(typeof body.Destination !== "string"){
      res.status(400).json({ message: "Destination should be a string" });
  }
  else {
    await sequelizeOperationsAPI.updateTravelPlanOfUserId(+userId, +travelId, body);
    res.status(200).json("TravelPlan successfully updated!");
  }
  } catch (err) {
    console.error(`Error while calling API: ${err}`);
  }
  });

//ruta DELETE pentru tabela Travel_Plans
router
  .route("/sequelize/travel_plans/:travelId")
  .delete(async function deleteTravelPlanById({ params: { travelId } }, res) 
  {
    try {
      await sequelizeOperationsAPI.deleteTravelPlanById(+travelId);
      res.status(200).json("TravelPlan successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

//ruta DELETE pentru tabela Travel_Plans - stergere TravelPlan specific al unui User specific
router
  .route("/sequelize/users/:userId/travel_plans/:travelId")
  .delete(async function deleteTravelPlanOfUserId({ params: { userId, travelId } }, res) 
  {
    try {
      await sequelizeOperationsAPI.deleteTravelPlanOfUserId(+userId, +travelId);
      res.status(200).json("TravelPlan successfully deleted!");
  } catch (err) {
      console.error(`Error while calling API: ${err}`);
    }
  });

/* Tabela TRAVEL_PLANS */

