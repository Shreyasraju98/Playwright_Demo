const jsonString = '{ "name": "Shreyas", "age": 25 }';

try {
  const user = JSON.parse(jsonString);
  console.log("User name:", user.name);
} catch (error) {
  if (error instanceof Error) {
    console.log("Invalid JSON:", error.message);
  } else {
    console.log("Invalid JSON:", error);
  }
}