import json
import numpy
import os

# Pass a payload of { "number": 12 }

payload = json.loads(os.getenv("SST_PAYLOAD"))
number = payload["number"]
print(f"Square root of {number} is {numpy.sqrt(number)}")
