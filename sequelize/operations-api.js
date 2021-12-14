import { Users, Travel_Plans } from "./sync.js";
import seq from "sequelize";


//autentificare in BD
async function sequelizeAuth(sequelizeConnection){
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has successfully connected to the database!");
    } catch (err) {
        console.error(
            `There was an error connecting to the databse using sequelize : ${err}`
        );
    }
}

async function sequelizeSync(sequelizeConnection){
    try {
        await sequelizeConnection.sync({force: false, alter: true});
        console.log("Sync completed!");
    } catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}


async function sequelizeInit(sequelizeConnection){
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
}



/* Tabela USERS */

//metoda getUsers pentru afisarea tuturor utilizatorilor:
async function getUsers() {
    try {
        return await Users.findAll(); 
    } catch (err) {
        console.log(err); 
    }
}

//metoda getUserById:
async function getUserById(userId) {
    try {
        return await Users.findAll({ where: { UserId: userId } }); 
    } catch (err) {
        console.log(err); 
    }
}

//metoda createUser:
async function createUser(user) {
    try{
      await Users.create({
        Name: user.Name,
        Age: user.Age,
      });
    } catch(err) {
        console.log(err);
    }
}


//metoda updateUser:
async function updateUser(userId, user) {
    try{
        const record = await Users.findByPk(userId);
        if(record) await record.update ({
            Name: user.Name,
            Age: user.Age,
        });
    } catch(err){
        console.log(err);
    }
}


//metoda deleteUser:
async function deleteUser(userId) {
    try{
        const record = await Users.findByPk(userId);
        if(record) await record.destroy();
    } catch(err){
        console.log(err);
    }
}

/* Tabela USERS */



/* Tabela TRAVEL_PLANS */

//metoda getTravelPlans pentru afisarea tuturor planurilor de calatorie:
async function getTravelPlans() {
    try {
        return await Travel_Plans.findAll(); 
    } catch (err) {
        console.log(err); 
    }
}

//metoda getTravelPlanById
async function getTravelPlanById(travelId) {
    try {
        return await Travel_Plans.findAll({ where: { TravelId: travelId } }); 
    } catch (err) {
        console.log(err); 
    }
}

//metoda getUserWithTravelPlanId
async function getUserWithTravelPlanId(travelId) {
    try{
        return await Users.findAll({
          include: [
            {
              model: Travel_Plans,
              where: { TravelId: travelId }
            }
          ]
        });
    } catch(err){
        console.log(err);
    }
}

//metoda getTravelPlansOfUserId
async function getTravelPlansOfUserId(userId){
    try {
        const user = await Users.findByPk(userId, {
            include: [Travel_Plans]
        });
        if(user) {
            var { Travel_Plans: travelPlans } = user;
            return travelPlans;
        }
        else{
            console.log(`UserId ${userId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}

//metoda getUsersWithTravelPlans
async function getUsersWithTravelPlans() {
    try{
        return await Users.findAll({
        include: [
          {
            model: Travel_Plans,
            as: "Travel_Plans",
          }
        ]
      });
    } catch(err){
        console.log(err);
    }
  }

//metoda createTravelPlanForUserId
async function createTravelPlanForUserId(userId, travel_plan) {
    try {
        const record = await Users.findByPk(userId);
        if(record){
            let travelPlan = await Travel_Plans.create({
                Origin: travel_plan.Origin,
                Destination: travel_plan.Destination,
              });
            travelPlan.UserId = record.UserId; 
            await travelPlan.save();
        }
        else{
            console.log(`UserId ${userId} not found!`);
        }   
    } catch (err) {
        console.log(err);
    }
}

//metoda createUsersWithTravelPlans
async function createUsersWithTravelPlans(user) {
    var result = await Users.create({
        Name: user.Name,
        Age: user.Age,
      });
      var { Travel_Plans: travelPlans } = user;
      travelPlans.forEach((travelPlan) => {
        Travel_Plans.create({
          Origin: travelPlan.Origin,
          Destination: travelPlan.Destination,
          UserId: result.UserId,
        });
      });
}

//metoda updateTravelPlanById
async function updateTravelPlanById(travelId, travelPlan) {
    try{
        const travel_plan = await Travel_Plans.findByPk(travelId);
        if(travel_plan) await travel_plan.update ({
            Origin: travelPlan.Origin,
            Destination: travelPlan.Destination,
        });
    } catch(err){
        console.log(err);
    }
}

//metoda updateTravelPlanOfUserId
async function updateTravelPlanOfUserId(userId, travelId, travelPlan){
    try {
        const user = await Users.findByPk(userId, {
            include: [Travel_Plans],
            where: { TravelId: travelId }
        });
        if(user) {
            const travel_plan = await Travel_Plans.findByPk(travelId);
            if(travel_plan) {
                await travel_plan.update({
                    Origin: travelPlan.Origin,
                    Destination: travelPlan.Destination
                });
                await travel_plan.save();
            }   
            else{
                console.log(`TravelId ${travelId} not found!`); 
            }
        }
        else{
            console.log(`UserId ${userId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}

//metoda deleteTravelPlanById
async function deleteTravelPlanById(travelId) {
    try{
        const travel_plan = await Travel_Plans.findByPk(travelId);
        if(travel_plan) await travel_plan.destroy();
    } catch(err){
        console.log(err);
    }
}

//metoda deleteTravelPlanOfUserId
async function deleteTravelPlanOfUserId(userId, travelId){
    try {
        const user = await Users.findByPk(userId, {
            include: [Travel_Plans],
            where: { TravelId: travelId }
        });
        if(user) {
            const travel_plan = await Travel_Plans.findByPk(travelId);
            if(travel_plan) {
                await travel_plan.destroy();
            }   
            else{
                console.log(`TravelId ${travelId} not found!`); 
            }
        }
        else{
            console.log(`UserId ${userId} not found!`); 
        }
    } catch(err){
        console.log(err);
    }
}


/* Tabela TRAVEL_PLANS */


//expunem metodele ca sa le folosim in sync.js
export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    getUsers: getUsers,
    getUserById: getUserById,

    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,

    getTravelPlans: getTravelPlans,
    getUsersWithTravelPlans: getUsersWithTravelPlans,
    createUsersWithTravelPlans: createUsersWithTravelPlans, 

    getUserWithTravelPlanId: getUserWithTravelPlanId,
    createTravelPlanForUserId: createTravelPlanForUserId,

    getTravelPlanById:getTravelPlanById,
    updateTravelPlanById: updateTravelPlanById,
    deleteTravelPlanById: deleteTravelPlanById,

    getTravelPlansOfUserId: getTravelPlansOfUserId,
    updateTravelPlanOfUserId:updateTravelPlanOfUserId,
    deleteTravelPlanOfUserId: deleteTravelPlanOfUserId,
    
};