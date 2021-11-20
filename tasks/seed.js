const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.restaurants;
const reviews = data.reviews;
const users = data.users;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    // Users
    const udit= await users.createUser('Udit','Patel','123-345 5678','upatel6@stevens.edu',1,2,'admin',24,'$2b$16$9qvRpsalt3kCy0uUqcopbO2ccnZ4jCegGZDM54GUyNZl.Iiu8Y62i');
    
    // Hotel
    const fsrl= await restaurants.createHotel('Four Seasons Resort Lanai','1 Manele Bay Rd','Lanai City','HI','96763','Luxury Resort',  '$$$$','0','20.7417745','-156.8964909','2',udit._id);
    
    //Review
    const ob1 = await reviews.createReview(udit._id, fsrl._id,'Extraordinary','This is one of the most special resorts I\'ve visited in my 60+ years. It starts with the people who work there, all of them thoughtful, kind, generous, and service-oriented. Then there is the low-rise buildings and the landscaping, like a tropical botanic garden with small waterways and koi ponds', "Really good safety precautions and even better food!",5,20,4,'11/24/2021');

    await users.FavoriteHotel(udit._id, fsrl._id);

    console.log('Done seeding database');
    await db.serverConfig.close();
}

main();