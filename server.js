const https = require('https');
const fs = require('fs');
const app = require('express')();
const server = https.createServer({
    key: fs.readFileSync('papernet.simsam.me.key'),
    cert: fs.readFileSync('papernet_simsam_me.crt')
}, app);
const io = require('socket.io')(server);

const ipp = require('ipp');
const printerURI = 'http://localhost:631/printers/thermal'; // replace PRINTER_NAME with your printer name

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('text', (text) => {
        console.log(`Received text: ${text}`);

        const bufferToBePrinted = Buffer.from(text);

        const printer = ipp.Printer(printerURI);
        printer.execute('Print-Job', {
          'operation-attributes-tag': {
            'requesting-user-name': 'nap',
            'job-name': 'testing'
          },
          'job-attributes-tag': {},
          data: bufferToBePrinted
        }, function (err, res) {
          if (err) {
            console.error(err);
            return;
          }
          if (res.statusCode === 'successful-ok') {
            console.log('Print job successful');
          } else {
            console.error('Error sending job to printer');
          }
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(443, () => {
    console.log('Server listening on port 443');
});
