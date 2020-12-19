from pyModbusTCP.client import ModbusClient
import random


def r():
    return random.randint(0, 65535)


client = ModbusClient(host='0.0.0.0', port=10502,
                      auto_open=True, auto_close=True)

regs = client.read_holding_registers(0, 10)

if regs:
    print('Holding Registers: ' + str(regs))
else:
    print('reading error')

if client.write_multiple_registers(0, [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()]):
    print('writing successful')
else:
    print('writing error')

