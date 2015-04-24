## Python

Below a small code sample to authenticate and retrieve data about an
application on wercker in Python using the
[requests library](http://docs.python-requests.org/en/latest/).

```python
import requests
import json

url = 'https://app.wercker.com/api/v3/applications/wercker/docs'
headers = {'Authorization':'Bearer <TOKEN>'}
r = requests.get(url, headers=headers, verify=True)
print r.json()
```
