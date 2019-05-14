# -*- coding: utf-8 -*-

import subprocess
from subprocess import getoutput
import time
import socket
import xml.etree.ElementTree as et


getoutput('export ALSADEV="plughw:1,0"')
givePowerCommand = 'chmod +r /home/pi/ORIZIN_Agent/juliusStart.sh'
givePower = subprocess.Popen(givePowerCommand.split())
juliusStarter = subprocess.Popen('/home/pi/ORIZIN_Agent/juliusStart.sh', shell=True)
juliusStarter.wait()
time.sleep(10)
print('ready')

host = 'localhost'
port = 10500

julius = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
julius.connect((host, port))

try:
    data = ''
    while 1:
        if '</RECOGOUT>\n.' in data:
            root = et.fromstring('<?xml version="1.0"?>\n' + data[data.find('<RECOGOUT>'):].replace('\n.', ''))
            for whypo in root.findall('./SHYPO/WHYPO'):
                command = whypo.get('WORD')
                #print(command)
            #data = ''
        #else:
            #data = data + client.recv(1024)
except KeyboardInterrupt:
    julius.close()