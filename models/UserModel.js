const { prisma, disconnect } = require("../lib/prisma");

const UserModel = {};

UserModel.findById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

UserModel.findByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

UserModel.create = async (user) => {
  try {
    const newUser = await prisma.$transaction(async (prisma) => {
      // Assuming 'user' is a new user object to be created
      const createdUser = await prisma.user.create({
        data: user,
      });

      await prisma.stamp.create({
        data: {
          userId: createdUser.id,
        },
      });

      await prisma.claim.create({
        data: {
          userId: createdUser.id,
        },
      });

      return prisma.user.findUnique({
        where: { id: createdUser.id },
        include: {
          stamp: true,
          claim: true,
        },
      });
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user and related entities:", error);
    throw error;
  }
};

UserModel.getInfoById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        stamp: {
          select: {
            essentials: true,
            food: true,
            services: true,
          },
        },
        claim: {
          select: {
            essentials: true,
            food: true,
            services: true,
            grand: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

UserModel.updateProfile = async (userId, firstName, lastName) => {
  try {
    let updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;

    // Check if there's something to update
    if (Object.keys(updateData).length === 0) {
      console.log("No update data provided");
      return null;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw error;
  }
};

UserModel.updatePassword = async (userId, newPassword) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

module.exports = UserModel;
