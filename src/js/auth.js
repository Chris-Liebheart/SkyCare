const API_URL = "http://localhost:3000/users";

// ESTA PARTE ES DEL REGISTER.JS , It is the register.js file

// Register new user (default role: "user")
export async function registerUser(newUser) {
if (!newUser.name || !newUser.identify || !newUser.phone || !newUser.address || !newUser.city || !newUser.email || !newUser.password) {
throw new Error("All fields are required.");
}

// Check if email is already in use
const existingUser = await fetch(`${API_URL}?email=${newUser.email}`);
const users = await existingUser.json();
if (users.length > 0) {
throw new Error("Email is already registered.");
}

const userToSave = {
name: newUser.name,
identify: newUser.identify,
phone: newUser.phone,
address: newUser.address,
city: newUser.city,
email: newUser.email,
password: newUser.password,
role: "user"
};

const response = await fetch(API_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(userToSave),
});

if (!response.ok) throw new Error("Error registering user.");
return await response.json();
}


// ESTA PARTE ES DEL LOGIN.JS , It is the 