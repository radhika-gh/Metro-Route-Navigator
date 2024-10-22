// here i have added a additional distance from saket to new delhi with distance 5
const stations = {
  "Noida_Sector_62~B": { "Botanical_Garden~B": 8 },
  "Botanical_Garden~B": { "Noida_Sector_62~B": 8, "Yamuna_Bank~B": 10 },
  "Yamuna_Bank~B": {
    "Botanical_Garden~B": 10,
    "Vaishali~B": 8,
    "Rajiv_Chowk~BY": 6,
  },
  "Rajiv_Chowk~BY": {
    "Yamuna_Bank~B": 6,
    "Moti_Nagar~B": 9,
    "AIIMS~Y": 7,
    "New_Delhi~YO": 1,
  },
  "Vaishali~B": { "Yamuna_Bank~B": 8 },
  "Moti_Nagar~B": {
    "Rajiv_Chowk~BY": 9,
    "Janak_Puri_West~BO": 7,
    "Rajouri_Garden~BP": 2,
  },
  "Janak_Puri_West~BO": { "Moti_Nagar~B": 7, "Dwarka_Sector_21~B": 6 },
  "Dwarka_Sector_21~B": { "Janak_Puri_West~BO": 6 },
  "Huda_City_Center~Y": { "Saket~Y": 15 },
  "Saket~Y": { "Huda_City_Center~Y": 15, "AIIMS~Y": 6, "Shivaji_Stadium~O": 5 }, // Added connection to Shivaji_Stadium
  "Vishwavidyalaya~Y": { "Chandni_Chowk~Y": 5 },
  "Chandni_Chowk~Y": { "New_Delhi~YO": 2, "Vishwavidyalaya~Y": 5 },
  "New_Delhi~YO": {
    "Rajiv_Chowk~BY": 1,
    "Chandni_Chowk~Y": 2,
    "Shivaji_Stadium~O": 2,
  },
  "AIIMS~Y": { "Rajiv_Chowk~BY": 7, "Saket~Y": 6 },
  "Shivaji_Stadium~O": { "New_Delhi~YO": 2, "DDS_Campus~O": 7, "Saket~Y": 5 }, // Added connection to Saket
  "DDS_Campus~O": { "Shivaji_Stadium~O": 7, "IGI_Airport~O": 8 },
  "IGI_Airport~O": { "DDS_Campus~O": 8 },
  "Rajouri_Garden~BP": { "Moti_Nagar~B": 2, "Punjabi_Bagh_West~P": 2 },
  "Netaji_Subhash_Place~PR": { "Punjabi_Bagh_West~P": 3 },
  "Punjabi_Bagh_West~P": {
    "Rajouri_Garden~BP": 2,
    "Netaji_Subhash_Place~PR": 3,
  },
};

function findShortestDistance(source, destination) {
  const distances = {};
  const visited = {};
  const previous = {};
  const queue = [];

  for (let station in stations) {
    distances[station] = Infinity;
    visited[station] = false;
    previous[station] = null;
  }

  distances[source] = 0;
  queue.push([source, 0]);

  while (queue.length > 0) {
    queue.sort((a, b) => a[1] - b[1]);
    const [currentStation, currentDistance] = queue.shift();

    if (visited[currentStation]) continue;
    visited[currentStation] = true;

    for (let neighbor in stations[currentStation]) {
      const distance = currentDistance + stations[currentStation][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = currentStation;
        queue.push([neighbor, distance]);
      }
    }
  }

  return {
    distance: distances[destination],
    path: reconstructPath(previous, source, destination),
  };
}

function reconstructPath(previous, source, destination) {
  const path = [];
  let currentStation = destination;

  while (currentStation !== null) {
    path.unshift(currentStation);
    currentStation = previous[currentStation];
  }

  return path.length > 1 ? path : null;
}

function findShortestTime(source, destination) {
  const result = findShortestDistance(source, destination);
  document.getElementById("output").innerText = `Shortest time: ${
    result.distance
  } minutes\nPath: ${result.path.join(" -> ")}`;
}

function getFare(distance) {
  return distance * 1; // Placeholder: fare calculation logic
}

function handleOption() {
  const option = document.getElementById("options").value;
  const source = document.getElementById("source").value.trim();
  const destination = document.getElementById("destination").value.trim();

  switch (option) {
    case "shortestDistance":
      const shortestDistanceResult = findShortestDistance(source, destination);
      document.getElementById("output").innerText = `Shortest distance: ${
        shortestDistanceResult.distance
      } KM\n\nPath: ${shortestDistanceResult.path.join(" -> ")}`;
      break;
    case "shortestTime":
      findShortestTime(source, destination);
      break;
    case "shortestPathDistance":
      const shortestPathDistanceResult = findShortestDistance(
        source,
        destination
      );
      document.getElementById(
        "output"
      ).innerText = `Shortest path (distance): ${shortestPathDistanceResult.path.join(
        " -> "
      )}\nDistance: ${shortestPathDistanceResult.distance} KM`;
      break;
    case "shortestPathTime":
      const shortestPathTimeResult = findShortestDistance(source, destination);
      document.getElementById(
        "output"
      ).innerText = `Shortest path (time): ${shortestPathTimeResult.path.join(
        " -> "
      )}\nTime: ${shortestPathTimeResult.distance} minutes`;
      break;
    case "fareDistance":
      const fareDistanceResult = findShortestDistance(source, destination);
      document.getElementById(
        "output"
      ).innerText = `Fare for shortest path (distance): ${getFare(
        fareDistanceResult.distance
      )} INR`;
      break;
    case "fareTime":
      const fareTimeResult = findShortestDistance(source, destination);
      document.getElementById(
        "output"
      ).innerText = `Fare for shortest path (time): ${getFare(
        fareTimeResult.distance
      )} INR`;
      break;
    default:
      document.getElementById("output").innerText = "Invalid option.";
  }
}
