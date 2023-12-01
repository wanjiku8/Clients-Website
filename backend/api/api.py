from flask import Flask, request, jsonify
from flask_cors import  cross_origin
import smtplib
from email.message import EmailMessage
import json

from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
@app.get('/')
def show_home():
  return jsonify({"message":"welcome"}),200

@app.route("/send_email", methods=["POST"])
@cross_origin()
def send_email():
    """
    {
    data: example
    message:str
    name:str
    email:str
    }
    """
    email = os.getenv('email')
    email_key = os.getenv('email_key')
    receiver_email = os.getenv('receiver_email')
    data =request.get_json()
    print(data)
    subject = f"Eventify Feedback - {datetime.now()}"
    message = f'{data["message"]}\n\nFrom {data["name"]} - {data["email"]}'

    mailer = smtplib.SMTP('smtp.elasticemail.com',2525)
    mailer.ehlo()
    mailer.starttls() 
    
    print(email,email_key)
    mailer.login(f'{email}',f'{email_key}')

    msg = EmailMessage()
    msg['Subject'] = subject 
    msg['From'] = f'Newsletter <{email}>'
    msg['To'] = [f'{receiver_email}']  
    msg.set_content(f'{message}')

    mailer.send_message(msg)
    mailer.quit()

    return {"status": "success"}

if __name__ == "__main__":
    app.run(host='0.0.0.0')
