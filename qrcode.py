import cv2
from pyzbar import pyzbar
import json
import requests
import time

def postRequestAPI(url, body) :
    req = requests.post(url, data=body)
    time.sleep(1)
    return req


def read_barcodes(frame):
    barcodes = pyzbar.decode(frame)
    for barcode in barcodes: 
        
        x, y , w, h = barcode.rect
        #1
        barcode_info = barcode.data.decode('utf-8')
        cv2.rectangle(frame, (x, y),(x+w, y+h), (0, 255, 0), 2)
        # parses info to dictionary
        
        #2
        font = cv2.FONT_HERSHEY_DUPLEX
        #3
        url = 'http://localhost:8000/item'

        # req = requests.post(url, data = barcode_info)
        res = postRequestAPI(url, barcode_info)
        print(res)
        # cv2.putText(frame, res, (x + 6, y - 6), font, 1.0, (255, 255, 255), 1)

    return frame

def main():
    #1
    camera = cv2.VideoCapture(0)
    ret, frame = camera.read()
    #2
    while ret:
        ret, frame = camera.read()
        frame = read_barcodes(frame)
        cv2.imshow('Barcode/QR code reader', frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break
    #3
    camera.release()
    cv2.destroyAllWindows()
#4
if __name__ == '__main__':
    main()