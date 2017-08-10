import machine
pins = [machine.Pin(i, machine.Pin.IN) for i in (0, 2, 4, 5, 12, 13, 14, 15)]
pin = machine.Pin(0)
pin = machine.Pin(0, machine.Pin.IN, machine.Pin.PULL_UP)
pin = machine.Pin(0, machine.Pin.OUT)
pin.value()

import dht

def weather():
    d = dht.DHT11(machine.Pin(4))
    d.measure()
    d.temperature()
    d.humidity()
    print('listening on', addr)
    print('temperature', d.temperature())
    print('humidity', d.humidity())



html = """<!DOCTYPE html>
<html>
    <head> <title>ESP8266 Pins</title> </head>
    <body> <h1>ESP8266 Pins</h1>
        <table border="1"> <tr><th>Temperatura</th><th> X </th></tr><tr><th>Pin</th><th>Value</th></tr> %s </table>
    </body>
</html>
"""

import socket
addr = socket.getaddrinfo('192.168.43.142', 80)[0][-1]

s = socket.socket()
s.bind(addr)
s.listen(1)




while True:

    weather()
    cl, addr = s.accept()
    print('client connected from', addr)
    cl_file = cl.makefile('rwb', 0)
    while True:
        line = cl_file.readline()
        if not line or line == b'\r\n':
            break
    rows = ['<tr><td>%s</td><td>%d</td></tr>' % (str(p), p.value()) for p in pins]
    response = html % '\n'.join(rows)
    cl.send(response)
    cl.close()





# def pulse(l, t):
#      for i in range(20):
#          l.duty(int(math.sin(i / 10 * math.pi) * 500 + 500))
#          time.sleep_ms(t)
