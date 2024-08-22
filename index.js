const express = require('express');
const os = require('os');
const app = express();

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

    // Log the server's IP address to the console
    console.log(`Server IP: ${serverIp}`);

    // Send the server's IP address in the response
    res.send(`Server IP address is: ${serverIp}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
