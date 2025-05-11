const { db } = require('./firebase');

// Define the path for users in Realtime DB
const USERS_PATH = 'users';

// Create a user in Realtime Database
async function createUser(telegramUser) {
  const userRef = db.ref(`${USERS_PATH}/${telegramUser.id}`);
  console.log('Creating user:', telegramUser);
  try {
    await userRef.set({
      id: telegramUser.id,
      username: telegramUser.username || null,
      firstName: telegramUser.first_name || null,
      lastName: telegramUser.last_name || null,
      createdAt: Date.now(),
    });
    console.log('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update user information
async function updateUser(telegramUser) {
  const userRef = db.ref(`${USERS_PATH}/${telegramUser.id}`);
  try {
    await userRef.update({
      username: telegramUser.username || null,
      firstName: telegramUser.first_name || null,
      lastName: telegramUser.last_name || null,
      updatedAt: Date.now(),
    });
    console.log('User updated successfully.');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Get all users
async function getAllUsers() {
  const snapshot = await db.ref(USERS_PATH).once('value');
  return snapshot.exists() ? snapshot.val() : {}; // Return all users
}

// Delete a user
async function deleteUser(id) {
  const userRef = db.ref(`${USERS_PATH}/${id}`);
  try {
    await userRef.remove();
    console.log('User deleted successfully.');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}


async function saveAlert(alert) {
  const alertRef = db.ref('alerts');
  try {
    await alertRef.push(alert);
    console.log('Alert saved successfully. id:', alert.id);
  } catch (error) {
    console.error('Error saving alert:', error);
    throw error;
  }
  
}

async function deleteAlert(alertId) {
  const alertRef = db.ref(`alerts/${alertId}`);
  try {
    await alertRef.remove();
    console.log('Alert deleted successfully.');
  } catch (error) {
    console.error('Error deleting alert:', error);
    throw error;
  }
}

async function updateAlert(alertId, updatedAlert) {
  const alertRef = db.ref(`alerts/${alertId}`);
  try {
    await alertRef.update(updatedAlert);
    console.log('Alert updated successfully.');
  } catch (error) {
    console.error('Error updating alert:', error);
    throw error;
  }
}

async function getAlert(alertId) {
  const alertRef = db.ref(`alerts/${alertId}`);
  const snapshot = await alertRef.once('value');
  return snapshot.exists() ? snapshot.val() : null; // Return the alert if it exists
}

async function getAlerts() {
  const snapshot = await db.ref('alerts').once('value');
  return snapshot.exists() ? snapshot.val() : {}; // Return all alerts
}


//Admin functions
async function addAdmin(id) {
  const adminRef = db.ref(`admins/${id}`);
  try {
    await adminRef.set(true);
    console.log('Admin added successfully.');
  } catch (error) {
    console.error('Error adding admin:', error);
    throw error;
  }
}

async function getAllAdmins() {
  const snapshot = await db.ref('admins').once('value');

  return snapshot.exists() ? snapshot.val() : {}; // Return all admins

}

async function adminCheck(id) {
  const adminRef = db.ref(`admins/${id}`);
  const snapshot = await adminRef.once('value');
  return snapshot.exists(); // Return true if the admin exists
}

async function removeAdmin(id) {
  const adminRef = db.ref(`admins/${id}`);
  try {
    await adminRef.remove();
    console.log('Admin removed successfully.');
  } catch (error) {
    console.error('Error removing admin:', error);
    throw error;
  }
}


async function sendToAllAdmins(message, chatId, bot) {
  const adminRef =   db.ref('admins');
  const snapshot = await adminRef.once('value');
  const admins = snapshot.exists() ? snapshot.val() : {}; // Return all admins
  if (!admins || admins.length === 0) {
    console.log('No admin to send to.');
    return;
  }

  // Send message to all admins
  for (let admin of Object.keys(admins)) {
    try {
      await bot.sendMessage(admin, message);
    } catch (error) {
      console.error(`Error sending to admin ${admin.id}:`, error);
    }
  }

  // Acknowledge the sender of the command
  bot.sendMessage(chatId, 'Sent to all admins!');
}


module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,

  //Alert functions
  saveAlert,
  deleteAlert,
  updateAlert,
  getAlert,
  getAlerts,

  //Admin functions
  addAdmin,
  getAllAdmins,
  adminCheck,
  removeAdmin,
  sendToAllAdmins,
};
