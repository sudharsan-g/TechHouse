import subprocess


def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


try:
    import pywhatkit

except ImportError:
    install("pywhatkit")
    import pywhatkit

import sys

script = sys.argv[1]
phn = sys.argv[2]
pywhatkit.sendwhatmsg_instantly("+91" + phn, script, wait_time=30, tab_close=True)
