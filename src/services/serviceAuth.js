const bcrypt = require("bcryptjs");
const prisma = require("../db/index");

const generateId = async() => {
  const id = Math.floor(Math.random() * 1000000);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if(user) {
    return generateId();
  }

  return id;
}

const createUser = async (userData, role = "USER") => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      id: await generateId(),
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      avatar: "https://res.cloudinary.com/dhvh8htdc/image/upload/v1717667656/ak5lhsep5vrwikyyklo9.png",
      role: role,
    },
  });

  return user;
};


const findUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

const getUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
  getUsers
};
