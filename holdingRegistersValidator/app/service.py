from pyModbusTCP.client import ModbusClient as pyModbus
import paho.mqtt.client as paho
import sys
from pymongo import MongoClient

################################################################################
# DATABASE
################################################################################

mongo_host = "mongo"
mongo_client = MongoClient(mongo_host)
db = mongo_client['gador']
devices = db['devices']


def getAddr(id):
    global devices
    d = devices.find_one({"tag": id})
    if d is None:
        return -1
    if 'modbus' in d:
        return int(d['modbus'])
    return -1


################################################################################
# MODBUS
################################################################################
slave = 'modbus-server'
port = 5020
master = pyModbus(host=slave, port=port,
                  auto_open=True, auto_close=True)


def write_slave(addr, value):
    global master
    if master.write_single_register(addr, value):
        print('writing successful')
    else:
        print('writing error')

################################################################################
# MQTT
################################################################################
# msg.payload -> 'esp32,24'


def onMessage(client, userdata, msg):
    data = msg.payload.decode().split(",")
    addr = getAddr(data[0])
    if addr != -1:
        val = int(data[1])
        write_slave(addr, val)


client = paho.Client()
client.on_message = onMessage

if client.connect("mosquitto", 1883, 60) != 0:
    print("Could not connect to MQTT Broker")
    sys.exit(-1)

client.subscribe("data/#")

try:
    print("Press CTRL+C to exit...")
    client.loop_forever()
except:
    print("Disconnecting from Broker")
client.disconnect()
