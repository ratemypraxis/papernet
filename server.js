const https = require('https');
const fs = require('fs');
const app = require('express')();
// PLEASE NOTE: In order to run this server securley with HTTPS you will need a domain name & certificate. 
// replace values in {PATHTOKEY} & {PATHTOCERT} with the path to your certificate and key on the server machine.
const server = https.createServer({
    key: fs.readFileSync('{PATHTOKEY}'),
    cert: fs.readFileSync('{PATHTOCERT}')
}, app);
const io = require('socket.io')(server);
const ipp = require('ipp');

// replace {PRINTER_NAME} with the name you chose or default name of your printer
const printerURI = 'http://localhost:631/printers/{PRINTER_NAME}'; 

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
