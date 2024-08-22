const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
let memoryLeak = [];

app.get('/', (req, res) => {
    // Get the server's IPv4 address
    const networkInterfaces = os.networkInterfaces();
    let serverIp = 'IP not found';

    // Iterate over network interfaces to find the IPv4 address
    for (let interfaceName in networkInterfaces) {
        for (let interface of networkInterfaces[interfaceName]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                serverIp = interface.address;
                break;
            }
        }
    }

    for (let i = 0; i < 100; i++) {
        memoryLeak.push(new Array(10000).fill('*'));
    }

    // Log the server's IP address to the console
    console.log(`Server IP: ${serverIp}`);

    // Send the server's IP address in the response
    res.send(`Server IP address is: ${serverIp}`);
});
app.get('/:loader_id', (req, res) => {
    const filePath = path.join(__dirname, 'loader.txt');

    res.sendFile(filePath, err => {
      if (err) {
        res.status(500).send('Internal Server Error');
      }
    }); 
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
