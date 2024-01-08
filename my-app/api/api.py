from flask import Flask,request,json,jsonify,redirect, url_for,flash,send_file
import cv2
import numpy as np
from deepface import DeepFace

app = Flask(__name__)



@app.route('/api',methods=['GET'])
def index():
    return {
        'name':'Hello World'
    }


###################################
#image taking
@app.route('/api/upload', methods=['POST'])
def handle_form():
    files = request.files['image']
    # file = files.get('files')
    files.save('image.jpg')
    """
      CODE TO HANDLE FILE
    """
    return jsonify({
        'success': True,
        'file': 'Received'
    })
#################################
@app.route('/sharpen')
def sharpen_image():
    img=cv2.imread("image.jpg")
    output_gauss1=cv2.GaussianBlur(img,(7,7),2)
    image=cv2.addWeighted(img,7.5,output_gauss1,-6.5,0)
    filename='saveimage.jpg'
    cv2.imwrite(filename,image)
    return None
#################################
@app.route('/greyimage')
def grey_image():
    img=cv2.imread("image.jpg")
    image=cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    filename='saveimage.jpg'
    cv2.imwrite(filename,image)
    return None
#####################################
@app.route('/blurimage')
def blur_image():
    img=cv2.imread("image.jpg")
    k=int(10)
    kernel1=np.ones((k,k),dtype=np.float32)/float(k*k)
    image=cv2.filter2D(img,-1,kernel1)
    filename='saveImage.jpg'
    cv2.imwrite(filename,image)
    return None
#####################################
@app.route('/smootherimage')
def smoother_image():
    img=cv2.imread("image.jpg")
    image=cv2.GaussianBlur(img,(3,3),0)
    filename='saveimage.jpg'
    cv2.imwrite(filename,image)
    return None
####################################
@app.route('/get_image')
def get_image():
    filename = './saveimage.jpg'
    return send_file(filename, mimetype='image/jpeg')
#############################pridict#################
express=''
per=0
@app.route('/api/pridict', methods=['GET','POST'])
def handle_image():
    files = request.files['image']
    # file = files.get('files')
    files.save('image1.jpg')
    """
      CODE TO HANDLE FILE
    """
    filename = './image.jpg'
    result=DeepFace.analyze(filename)
    abc=result[0]['dominant_emotion']
    percent=result[0]['emotion'][abc]
    express=abc
    per=percent
    return jsonify({
        'success': True,
        'file': 'Received',
        'result':abc,
        'percent':percent
    })
@app.route('/pridict',methods=['GET'])
def pridict_image():
    
    return {
        'result':express,
        'percent':per
    }



if __name__=='__main__':
    app.run(debug=True)