# Setting up your own networked released tool 

![gif demonstrating the papernet system in use](https://www.2nd.systems/images/papernetDemo.gif)

## Materials:
- Raspberry Pi [RPI] w/ Raspberry Pi OS (full-version) 
- TTL Thermal Printer (adafruit mini thermal printer recommended) w/ paper refill rolls
- paper shredder (any shredder will do - you can find mini electric and mechinical ones online for less than $20)

## Process:
1. Secure a domain name (ex: website.com, internet.net, etc.) or sub-domain & certificate to enable HTTPS security for your server.
  - Students can recieve 1-year of a free domain name (& certificate as well) via the [GitHub Student Developer Pack](https://education.github.com/pack) offers.
  - Anyone can recieve a free certificate for their domain using [Certbot by the Electronic Frontier Foundation](https://certbot.eff.org/).
2. Once that is all settled, retrieve your certificate & generated key and place it in a non-public (very important) directory on your RPI
3. If this is your first time working with a RPI, see the linked guide to set up your Pi with Raspberry Pi OS.
4. with both the RPI and printer unpowered - attach the thermal printer. The ground, RX & TX pins pictured below are where you want to connect the two. Black to ground, Yellow to TX, Green to RX.
    ![RPI diagram](https://cdn.sparkfun.com/assets/learn_tutorials/1/5/9/5/GPIO.png)
5. Time to power it all on so you can configure & test your printer! If your printer came with a test printout in the box, look at it closely for voltage and baud rate. Either way follow steps in the [Adafruit tutorial linked here](https://learn.adafruit.com/networked-thermal-printer-using-cups-and-raspberry-pi/connect-and-configure-printer) to enable printing via lp & over the network on your printer. Be sure to only follow steps relevant for TTL printers - USB steps do not apply.
  - Note: if your printer is still printing gibberish try making sure the voltage is correct & rebooting.
6. Now that your pi cam and thermal printer are all set up, time to run the code! Navigate to the **tcpTest** directory. Run **reciever.py** to see our images & **sender.py** to send your own (or better yet - both at the same time to do both!).

That's the gist! Reach out with any Qs.
