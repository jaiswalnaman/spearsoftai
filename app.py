# from flask import Flask, request, jsonify, session,Response
# from flask_cors import CORS
# import pandas as pd
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict
# import os
# from datetime import datetime
# import pymongo
# from werkzeug.security import generate_password_hash, check_password_hash
# import secrets
# from functools import wraps
# import time
# import re

# app = Flask(__name__)
# CORS(app, supports_credentials=True)
# app.config['SECRET_KEY'] = secrets.token_hex(32)
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SECURE'] = False  # Enable in production with HTTPS
# app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'

# # MongoDB connection setup
# URI = "mongodb+srv://noreplyspearsoft:aHCc96K1lGXR3hOs@sst.avkqf.mongodb.net/?retryWrites=true&w=majority&appName=SS&TtlsAllowInvalidCertificates=true"
# client = pymongo.MongoClient(URI)
# db = client["SST_AI"]
# user_collection = db["Users"]
# session_collection = db["Sessions"]

# # Global variables to store data
# uploaded_data = None
# subject_template = ""
# body_template = ""
# column_mapping = {}


# def login_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         if 'user_id' not in session:
#             return jsonify({'error': 'Authentication required'}), 401
#         return f(*args, **kwargs)
#     return decorated

# # def login_required(f):
# #     def decorated(*args, **kwargs):
# #         if 'user_id' not in session:
# #             return jsonify({'error': 'Authentication required'}), 401
# #         return f(*args, **kwargs)
# #     return decorated

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Missing required fields'}), 400
        
#     if user_collection.find_one({'email': data['email']}):
#         return jsonify({'error': 'User already exists'}), 400
        
#     hashed_password = generate_password_hash(data['password'])
#     user = {
#         'email': data['email'],
#         'password': hashed_password,
#         'name': data.get('name', ''),
#         'created_at': datetime.utcnow()
#     }
    
#     result = user_collection.insert_one(user)
#     return jsonify({'message': 'User created successfully'}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
    
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Missing required fields'}), 400
        
#     user = user_collection.find_one({'email': data['email']})
    
#     if not user or not check_password_hash(user['password'], data['password']):
#         return jsonify({'error': 'Invalid credentials'}), 401

#     # Create session
#     session['user_id'] = str(user['_id'])
#     session['email'] = user['email']
    
#     return jsonify({
#         'message': 'Login successful',
#         'user': {
#             'email': user['email'],
#             'name': user.get('name', '')
#         }
#     }), 200

# @app.route('/logout', methods=['POST'])
# def logout():
#     session.clear()
#     return jsonify({'message': 'Logged out successfully'}), 200

# @app.route('/check-auth', methods=['GET'])
# def check_auth():
#     if 'user_id' in session:
#         user = user_collection.find_one({'_id': session['user_id']})
#         if user:
#             return jsonify({
#                 'authenticated': True,
#                 'user': {
#                     'email': user['email'],
#                     'name': user.get('name', '')
#                 }
#             }), 200
#     return jsonify({'authenticated': False}), 401

# @app.route('/upload_file', methods=['POST'])
# @login_required
# def upload_file():
#     global uploaded_data
#     file = request.files.get('file')
    
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')):
#             uploaded_data = pd.read_excel(file)
#         else:
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         preview_data = uploaded_data.head().to_dict('records')
        
#         return jsonify({
#             "message": "File uploaded successfully",
#             "columns": uploaded_data.columns.tolist(),
#             "preview_data": preview_data
#         }), 200
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500

# @app.route('/save_template', methods=['POST'])
# @login_required
# def save_template():
#     global subject_template, body_template
#     try:
#         data = request.get_json()
#         subject_template = data.get("subject")
#         body_template = data.get("body")
        
#         if not subject_template or not body_template:
#             return jsonify({"error": "Subject and body templates are required"}), 400
        
#         print(f"Template saved - Subject: {subject_template[:50]}...")
#         return jsonify({"message": "Templates saved successfully"}), 200
#     except Exception as e:
#         print(f"Template save error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/set_column_mapping', methods=['POST'])
# @login_required
# def set_column_mapping():
#     global column_mapping
#     try:
#         column_mapping = request.get_json()
#         print(f"Column mapping saved: {column_mapping}")
#         return jsonify({"message": "Column mapping saved successfully"}), 200
#     except Exception as e:
#         print(f"Column mapping error: {str(e)}")
#         return jsonify({"error": str(e)}), 500
# def send_email_gmail(recipient_email, subject, body, config):
#     """
#     Sends an email using Gmail's SMTP server.
#     """
#     try:
#         smtp_server = "smtp.gmail.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         # Set up the email message
#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         # Establish a connection to the Gmail SMTP server
#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()  # Upgrade the connection to secure
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Gmail.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Gmail to {recipient_email}: {str(e)}")
#         return False


# def send_email_outlook(recipient_email, subject, body, config):
#     """
#     Sends an email using Outlook's SMTP server.
#     """
#     try:
#         smtp_server = "smtp.office365.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         # Set up the email message
#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         # Establish a connection to the Outlook SMTP server
#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()  # Upgrade the connection to secure
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Outlook.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Outlook to {recipient_email}: {str(e)}")
#         return False

# # @app.route('/send_emails', methods=['POST'])
# # @login_required
# # def send_emails():
# #     global uploaded_data, subject_template, body_template, column_mapping
    
# #     if uploaded_data is None:
# #         return jsonify({"error": "No data uploaded"}), 400

# #     try:
# #         data = request.get_json()
# #         config = data.get('config')
        
# #         if not config:
# #             return jsonify({"error": "Email configuration is required"}), 400
            
# #         if not column_mapping:
# #             return jsonify({"error": "Column mapping not set"}), 400

# #         success_count = 0
# #         failed_count = 0
        
# #         if not os.path.exists('logs'):
# #             os.makedirs('logs')

# #         timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
# #         log_file = f'logs/email_log_{timestamp}.txt'
        
# #         with open(log_file, 'w') as log:
# #             for _, row in uploaded_data.iterrows():
# #                 try:
# #                     personalized_subject = subject_template
# #                     personalized_body = body_template

# #                     for column in uploaded_data.columns:
# #                         placeholder = f"{{{column}}}"
# #                         value = str(row[column])
# #                         personalized_subject = personalized_subject.replace(placeholder, value)
# #                         personalized_body = personalized_body.replace(placeholder, value)

# #                     recipient_email = row[column_mapping['email']]
                    
# #                     if config['provider'] == 'gmail':
# #                         success = send_email_gmail(
# #                             recipient_email,
# #                             personalized_subject,
# #                             personalized_body,
# #                             config
# #                         )
# #                     else:
# #                         success = send_email_outlook(
# #                             recipient_email,
# #                             personalized_subject,
# #                             personalized_body,
# #                             config
# #                         )

# #                     if success:
# #                         success_count += 1
# #                         log.write(f"SUCCESS: Email sent to {recipient_email}\n")
# #                     else:
# #                         failed_count += 1
# #                         log.write(f"FAILED: Could not send email to {recipient_email}\n")

# #                 except Exception as e:
# #                     failed_count += 1
# #                     log.write(f"ERROR: {str(e)} for {recipient_email}\n")
# #                     print(f"Error sending to {recipient_email}: {str(e)}")

# #         return jsonify({
# #             "message": "Email campaign completed",
# #             "success_count": success_count,
# #             "failed_count": failed_count,
# #             "log_file": log_file
# #         }), 200

# #     except Exception as e:
# #         print(f"Campaign error: {str(e)}")
# #         return jsonify({"error": str(e)}), 500
# # Send emails
# @app.route('/send_emails', methods=['POST'])
# def send_emails():
#     global uploaded_data, subject_template, body_template

#     if uploaded_data.empty:
#         return jsonify({"error": "No data uploaded. Please upload a file first."}), 400
#     if not subject_template or not body_template:
#         return jsonify({"error": "Templates not saved. Please save the templates first."}), 400

#     try:
#         request_data = request.get_json()  # Expecting JSON payload
#         email = request_data.get("email")
#         password = request_data.get("password")
#         email_type = request_data.get("type")  # Either "gmail" or "outlook"

#         if not email or not password:
#             return jsonify({"error": "Email and password are required for sending emails"}), 400

#         # Configure SMTP settings based on email type
#         if email_type == "gmail":
#             smtp_server = "smtp.gmail.com"
#             smtp_port = 587
#         elif email_type == "outlook":
#             smtp_server = "smtp.office365.com"
#             smtp_port = 587
#         else:
#             return jsonify({"error": "Invalid email type. Supported types are 'gmail' and 'outlook'."}), 400

#         # Function to replace placeholders
#         def replace_placeholders(template, row):
#             placeholders = re.findall(r"\{(.*?)\}", template)
#             for placeholder in placeholders:
#                 if placeholder in row:
#                     template = template.replace(f"{{{placeholder}}}", str(row[placeholder]))
#                 else:
#                     raise KeyError(f"Column '{placeholder}' not found in the table")
#             return template

#         # Connect to SMTP server
#         server = smtplib.SMTP(smtp_server, smtp_port)
#         server.starttls()
#         server.login(email, password)

#         # Generator for streaming the email-sent count
#         def stream_emails():
#             sent_count = 0
#             for _, row in uploaded_data.iterrows():
#                 try:
#                     subject = replace_placeholders(subject_template, row)
#                     body = replace_placeholders(body_template, row)

#                     msg = MIMEMultipart()
#                     msg['From'] = email
#                     msg['To'] = row.get('Email', "")  # Ensure 'Email' column exists in uploaded data
#                     msg['Subject'] = subject

#                     msg.attach(MIMEText(body, 'plain'))

#                     # Send the email
#                     server.send_message(msg)
#                     sent_count += 1
#                     yield f"data: Emails sent: {sent_count}\n\n"
#                     time.sleep(1)  # Simulate delay for testing
#                 except Exception as e:
#                     yield f"data: Failed to send email to {row.get('Email', '')}: {str(e)}\n\n"

#             server.quit()
#             yield "data: All emails sent.\n\n"

#         return Response(stream_emails(), content_type='text/event-stream')

#     except smtplib.SMTPAuthenticationError:
#         return jsonify({"error": "Authentication failed. Please check your email credentials."}), 401
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)

####FFFFFFFFSAFASFZ>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>?????????????????????????<<<<<<<<<<<<<<<<

# from flask import Flask, request, jsonify, session, Response
# from flask_cors import CORS
# import pandas as pd
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict
# import os
# from datetime import datetime
# import pymongo
# from werkzeug.security import generate_password_hash, check_password_hash
# import secrets
# from functools import wraps
# import time
# import re

# app = Flask(__name__)
# CORS(app, supports_credentials=True)
# app.config['SECRET_KEY'] = secrets.token_hex(32)
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SECURE'] = False  # Enable in production with HTTPS
# app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'

# # MongoDB connection setup
# URI = "mongodb+srv://noreplyspearsoft:aHCc96K1lGXR3hOs@sst.avkqf.mongodb.net/?retryWrites=true&w=majority&appName=SS&TtlsAllowInvalidCertificates=true"
# client = pymongo.MongoClient(URI)
# db = client["SST_AI"]
# user_collection = db["Users"]
# session_collection = db["Sessions"]

# # Global variables to store data
# uploaded_data = None
# subject_template = ""
# body_template = ""
# column_mapping = {}

# def login_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         if 'user_id' not in session:
#             return jsonify({'error': 'Authentication required'}), 401
#         return f(*args, **kwargs)
#     return decorated
# @app.route('/', methods=['GET'])
# def index():
#     return jsonify({'message': 'Welcome to SST AI'})
# @app.route('/register_AI', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Missing required fields'}), 400
        
#     if user_collection.find_one({'email': data['email']}):
#         return jsonify({'error': 'User already exists'}), 400
        
#     hashed_password = generate_password_hash(data['password'])
#     user = {
#         'email': data['email'],
#         'password': hashed_password,
#         'name': data.get('name', ''),
#         'created_at': datetime.utcnow()
#     }
    
#     result = user_collection.insert_one(user)
#     return jsonify({'message': 'User created successfully'}), 201

# @app.route('/login_AI', methods=['POST'])
# def login():
#     data = request.get_json()
    
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Missing required fields'}), 400
        
#     user = user_collection.find_one({'email': data['email']})
    
#     if not user or not check_password_hash(user['password'], data['password']):
#         return jsonify({'error': 'Invalid credentials'}), 401

#     # Create session
#     session['user_id'] = str(user['_id'])
#     session['email'] = user['email']
    
#     return jsonify({
#         'message': 'Login successful',
#         'user': {
#             'email': user['email'],
#             'name': user.get('name', '')
#         }
#     }), 200

# @app.route('/logout_AI', methods=['POST'])
# def logout():
#     session.clear()
#     return jsonify({'message': 'Logged out successfully'}), 200

# @app.route('/check-auth_AI', methods=['GET'])
# def check_auth():
#     if 'user_id' in session:
#         user = user_collection.find_one({'_id': session['user_id']})
#         if user:
#             return jsonify({
#                 'authenticated': True,
#                 'user': {
#                     'email': user['email'],
#                     'name': user.get('name', '')
#                 }
#             }), 200
#     return jsonify({'authenticated': False}), 401

# @app.route('/upload_file_AI', methods=['POST'])
# @login_required
# def upload_file():
#     global uploaded_data
#     # print(session['user_id'])
#     file = request.files.get('file')
    
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')):
#             uploaded_data = pd.read_excel(file)
#         else:
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         preview_data = uploaded_data.head().to_dict('records')
        
#         return jsonify({
#             "message": "File uploaded successfully",
#             "columns": uploaded_data.columns.tolist(),
#             "preview_data": preview_data
#         }), 200
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500

# @app.route('/save_template_AI', methods=['POST'])
# # @login_required
# def save_template():
#     global subject_template, body_template
#     try:
#         data = request.get_json()
#         subject_template = data.get("subject")
#         body_template = data.get("body")
        
#         if not subject_template or not body_template:
#             return jsonify({"error": "Subject and body templates are required"}), 400
        
#         print(f"Template saved - Subject: {subject_template[:50]}...")
#         return jsonify({"message": "Templates saved successfully"}), 200
#     except Exception as e:
#         print(f"Template save error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/set_column_mapping_AI', methods=['POST'])
# # @login_required
# def set_column_mapping():
#     global column_mapping
#     try:
#         column_mapping = request.get_json()
#         print(f"Column mapping saved: {column_mapping}")
#         return jsonify({"message": "Column mapping saved successfully"}), 200
#     except Exception as e:
#         print(f"Column mapping error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# def send_email_gmail(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.gmail.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Gmail.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Gmail to {recipient_email}: {str(e)}")
#         return False

# def send_email_outlook(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.office365.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Outlook.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Outlook to {recipient_email}: {str(e)}")
#         return False

# @app.route('/send_emails_AI', methods=['POST'])
# # @login_required
# def send_emails():
#     global uploaded_data, subject_template, body_template

#     if uploaded_data.empty:
#         return jsonify({"error": "No data uploaded"}), 400
#     if not subject_template or not body_template:
#         return jsonify({"error": "Templates not saved"}), 400

#     try:
#         data = request.get_json()
#         email = data.get("email")
#         password = data.get("password")
#         email_type = data.get("type")

#         if not email or not password:
#             return jsonify({"error": "Email and password are required"}), 400

#         if email_type == "gmail":
#             smtp_server = "smtp.gmail.com"
#         elif email_type == "outlook":
#             smtp_server = "smtp.office365.com"
#         else:
#             return jsonify({"error": "Invalid email type"}), 400

#         def replace_placeholders(template, row):
#             for column in row.keys():
#                 placeholder = f"{{{column}}}"
#                 value = str(row[column])
#                 template = template.replace(placeholder, value)
#             return template

#         def generate_stream():
#             sent_count = 0
#             total = len(uploaded_data)

#             for _, row in uploaded_data.iterrows():
#                 try:
#                     personalized_subject = replace_placeholders(subject_template, row)
#                     personalized_body = replace_placeholders(body_template, row)

#                     config = {
#                         'email': email,
#                         'password': password,
#                         'provider': email_type
#                     }

#                     success = False
#                     if email_type == 'gmail':
#                         success = send_email_gmail(row[column_mapping['email']], personalized_subject, personalized_body, config)
#                     else:
#                         success = send_email_outlook(row[column_mapping['email']], personalized_subject, personalized_body, config)

#                     if success:
#                         sent_count += 1
#                         yield f"data: Emails sent: {sent_count}\n\n"
                    
#                     time.sleep(0.5)  # Rate limiting

#                 except Exception as e:
#                     print(f"Error sending email: {str(e)}")
#                     yield f"data: Error: {str(e)}\n\n"

#             yield "data: Campaign completed\n\n"

#         return Response(generate_stream(), content_type='text/event-stream')

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

# @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
# from flask import Flask, request, jsonify, session, Response
# from flask_cors import CORS
# import pandas as pd
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict
# import os
# from datetime import datetime
# import pymongo
# from werkzeug.security import generate_password_hash, check_password_hash
# import secrets
# from functools import wraps
# import time
# import re

# app = Flask(__name__)
# CORS(app, supports_credentials=True, origins=['http://localhost:5173', 'http://localhost:3000'])
# app.config['SECRET_KEY'] = secrets.token_hex(32)
# app.config['SESSION_COOKIE_HTTPONLY'] = True
# app.config['SESSION_COOKIE_SECURE'] = False  # Enable in production with HTTPS
# app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Changed from 'Strict' to 'Lax'

# # MongoDB connection setup
# URI = "mongodb+srv://noreplyspearsoft:aHCc96K1lGXR3hOs@sst.avkqf.mongodb.net/?retryWrites=true&w=majority&appName=SS&TtlsAllowInvalidCertificates=true"
# client = pymongo.MongoClient(URI)
# db = client["SST_AI"]
# user_collection = db["Users"]
# session_collection = db["Sessions"]

# # Global variables to store data
# uploaded_data = None
# subject_template = ""
# body_template = ""
# column_mapping = {}

# def login_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         if 'user_id' not in session:
#             return jsonify({'error': 'Authentication required'}), 401
#         return f(*args, **kwargs)
#     return decorated

# @app.route('/register_AI', methods=['POST'])
# def register():
#     data = request.get_json()
    
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Missing required fields'}), 400
        
#     if user_collection.find_one({'email': data['email']}):
#         return jsonify({'error': 'User already exists'}), 400
        
#     hashed_password = generate_password_hash(data['password'])
#     user = {
#         'email': data['email'],
#         'password': hashed_password,
#         'name': data.get('name', ''),
#         'created_at': datetime.utcnow()
#     }
    
#     result = user_collection.insert_one(user)
#     return jsonify({'message': 'User created successfully'}), 201

# @app.route('/login_AI', methods=['POST'])
# def login():
#     data = request.get_json()
    
#     if not data or not data.get('email') or not data.get('password'):
#         return jsonify({'error': 'Missing required fields'}), 400
        
#     user = user_collection.find_one({'email': data['email']})
    
#     if not user or not check_password_hash(user['password'], data['password']):
#         return jsonify({'error': 'Invalid credentials'}), 401

#     # Create session
#     session['user_id'] = str(user['_id'])
#     session['email'] = user['email']
    
#     return jsonify({
#         'message': 'Login successful',
#         'user': {
#             'email': user['email'],
#             'name': user.get('name', '')
#         }
#     }), 200

# @app.route('/logout_AI', methods=['POST'])
# def logout():
#     session.clear()
#     return jsonify({'message': 'Logged out successfully'}), 200

# @app.route('/check-auth_AI', methods=['GET'])
# def check_auth():
#     if 'user_id' in session:
#         user = user_collection.find_one({'_id': session['user_id']})
#         if user:
#             return jsonify({
#                 'authenticated': True,
#                 'user': {
#                     'email': user['email'],
#                     'name': user.get('name', '')
#                 }
#             }), 200
#     return jsonify({'authenticated': False}), 401

# @app.route('/upload_file_AI', methods=['POST'])
# @login_required
# def upload_file():
#     global uploaded_data
#     file = request.files.get('file')
    
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')):
#             uploaded_data = pd.read_excel(file)
#         else:
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         preview_data = uploaded_data.head().to_dict('records')
        
#         return jsonify({
#             "message": "File uploaded successfully",
#             "columns": uploaded_data.columns.tolist(),
#             "preview_data": preview_data
#         }), 200
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500

# @app.route('/save_template_AI', methods=['POST'])
# @login_required
# def save_template():
#     global subject_template, body_template
#     try:
#         data = request.get_json()
#         subject_template = data.get("subject")
#         body_template = data.get("body")
        
#         if not subject_template or not body_template:
#             return jsonify({"error": "Subject and body templates are required"}), 400
        
#         print(f"Template saved - Subject: {subject_template[:50]}...")
#         return jsonify({"message": "Templates saved successfully"}), 200
#     except Exception as e:
#         print(f"Template save error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/set_column_mapping_AI', methods=['POST'])
# @login_required
# def set_column_mapping():
#     global column_mapping
#     try:
#         column_mapping = request.get_json()
#         print(f"Column mapping saved: {column_mapping}")
#         return jsonify({"message": "Column mapping saved successfully"}), 200
#     except Exception as e:
#         print(f"Column mapping error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# def send_email_gmail(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.gmail.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Gmail.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Gmail to {recipient_email}: {str(e)}")
#         return False

# def send_email_outlook(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.office365.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Outlook.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Outlook to {recipient_email}: {str(e)}")
#         return False

# @app.route('/send_emails_AI', methods=['POST'])
# @login_required
# def send_emails():
#     global uploaded_data, subject_template, body_template, column_mapping

#     if uploaded_data is None:
#         return jsonify({"error": "No data uploaded"}), 400
#     if not subject_template or not body_template:
#         return jsonify({"error": "Templates not saved"}), 400
#     if not column_mapping:
#         return jsonify({"error": "Column mapping not set"}), 400

#     try:
#         data = request.get_json()
#         email = data.get("email")
#         password = data.get("password")
#         email_type = data.get("type")

#         if not email or not password:
#             return jsonify({"error": "Email and password are required"}), 400

#         def generate_stream():
#             sent_count = 0
#             total = len(uploaded_data)

#             for _, row in uploaded_data.iterrows():
#                 try:
#                     # Replace placeholders in templates
#                     personalized_subject = subject_template
#                     personalized_body = body_template
#                     for col in uploaded_data.columns:
#                         placeholder = f"{{{col}}}"
#                         value = str(row[col])
#                         personalized_subject = personalized_subject.replace(placeholder, value)
#                         personalized_body = personalized_body.replace(placeholder, value)

#                     config = {
#                         'email': email,
#                         'password': password
#                     }

#                     success = False
#                     if email_type == 'gmail':
#                         success = send_email_gmail(row[column_mapping['email']], personalized_subject, personalized_body, config)
#                     else:
#                         success = send_email_outlook(row[column_mapping['email']], personalized_subject, personalized_body, config)

#                     if success:
#                         sent_count += 1
#                         yield f"data: Emails sent: {sent_count}\n\n"
                    
#                     time.sleep(0.5)  # Rate limiting

#                 except Exception as e:
#                     print(f"Error sending email: {str(e)}")
#                     yield f"data: Error: {str(e)}\n\n"

#             yield "data: Campaign completed\n\n"

#         return Response(generate_stream(), content_type='text/event-stream')

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


#@@@@@@@@@!#@#@##@

# from flask import Flask, request, jsonify, session, Response
# from flask_cors import CORS
# import pandas as pd
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from typing import Dict
# import os
# from datetime import datetime, timedelta
# import pymongo
# from werkzeug.security import generate_password_hash, check_password_hash
# import secrets
# from functools import wraps
# import time
# import re

# app = Flask(__name__)

# # Configure CORS with specific origins
# CORS(app, 
#      resources={r"/*": {
#          "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
#          "methods": ["GET", "POST", "OPTIONS"],
#          "allow_headers": ["Content-Type", "Authorization"],
#          "expose_headers": ["Content-Type", "Authorization"],
#          "supports_credentials": True,
#          "max_age": 600
#      }})

# # Session configuration
# app.config.update(
#     SECRET_KEY=secrets.token_hex(32),
#     SESSION_COOKIE_HTTPONLY=True,
#     SESSION_COOKIE_SECURE=False,  # Set to True in production with HTTPS
#     SESSION_COOKIE_SAMESITE='Lax',
#     PERMANENT_SESSION_LIFETIME=timedelta(days=7)
# )

# # MongoDB connection setup
# URI = "mongodb+srv://noreplyspearsoft:aHCc96K1lGXR3hOs@sst.avkqf.mongodb.net/?retryWrites=true&w=majority&appName=SS&TtlsAllowInvalidCertificates=true"
# client = pymongo.MongoClient(URI)
# db = client["SST_AI"]
# user_collection = db["Users"]
# session_collection = db["Sessions"]

# # Global variables to store data
# uploaded_data = None
# subject_template = ""
# body_template = ""
# column_mapping = {}

# def login_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         print("Session data:", dict(session))  # Debug print
#         if 'user_id' not in session:
#             return jsonify({'error': 'Authentication required'}), 401
#         return f(*args, **kwargs)
#     return decorated

# @app.route('/register_AI', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()
#         print("Received registration data:", data)  # Debug print
        
#         if not data or not data.get('email') or not data.get('password'):
#             return jsonify({'error': 'Missing required fields'}), 400
            
#         if user_collection.find_one({'email': data['email']}):
#             return jsonify({'error': 'User already exists'}), 400
            
#         hashed_password = generate_password_hash(data['password'])
#         user = {
#             'email': data['email'],
#             'password': hashed_password,
#             'name': data.get('name', ''),
#             'created_at': datetime.utcnow()
#         }
        
#         result = user_collection.insert_one(user)
#         print("User created successfully:", str(result.inserted_id))  # Debug print
#         return jsonify({'message': 'User created successfully'}), 201
#     except Exception as e:
#         print("Registration error:", str(e))  # Debug print
#         return jsonify({'error': str(e)}), 500

# @app.route('/login_AI', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()
#         print("Received login data:", data)  # Debug print
        
#         if not data or not data.get('email') or not data.get('password'):
#             return jsonify({'error': 'Missing required fields'}), 400
            
#         user = user_collection.find_one({'email': data['email']})
        
#         if not user or not check_password_hash(user['password'], data['password']):
#             return jsonify({'error': 'Invalid credentials'}), 401

#         # Make session permanent
#         session.permanent = True
        
#         # Create session
#         session['user_id'] = str(user['_id'])
#         session['email'] = user['email']
        
#         # Store session in database
#         session_data = {
#             'user_id': str(user['_id']),
#             'created_at': datetime.utcnow(),
#             'expires_at': datetime.utcnow() + app.permanent_session_lifetime
#         }
#         session_collection.insert_one(session_data)
        
#         print("Login successful. Session:", dict(session))  # Debug print
#         return jsonify({
#             'message': 'Login successful',
#             'user': {
#                 'email': user['email'],
#                 'name': user.get('name', '')
#             }
#         }), 200
#     except Exception as e:
#         print("Login error:", str(e))  # Debug print
#         return jsonify({'error': str(e)}), 500

# @app.route('/logout_AI', methods=['POST'])
# def logout():
#     try:
#         if 'user_id' in session:
#             # Remove session from database
#             session_collection.delete_many({'user_id': session['user_id']})
#         session.clear()
#         return jsonify({'message': 'Logged out successfully'}), 200
#     except Exception as e:
#         print("Logout error:", str(e))  # Debug print
#         return jsonify({'error': str(e)}), 500

# @app.route('/check-auth_AI', methods=['GET'])
# def check_auth():
#     try:
#         print("Checking auth. Session:", dict(session))  # Debug print
#         if 'user_id' in session:
#             # Verify session in database
#             session_exists = session_collection.find_one({
#                 'user_id': session['user_id'],
#                 'expires_at': {'$gt': datetime.utcnow()}
#             })
            
#             if session_exists:
#                 user = user_collection.find_one({'_id': session['user_id']})
#                 if user:
#                     return jsonify({
#                         'authenticated': True,
#                         'user': {
#                             'email': user['email'],
#                             'name': user.get('name', '')
#                         }
#                     }), 200
                    
#         return jsonify({'authenticated': False}), 401
#     except Exception as e:
#         print("Auth check error:", str(e))  # Debug print
#         return jsonify({'error': str(e)}), 500
# @app.route('/upload_file_AI', methods=['POST'])
# @login_required
# def upload_file():
#     global uploaded_data
#     print(session['user_id'])
#     file = request.files.get('file')
    
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')):
#             uploaded_data = pd.read_excel(file)
#         else:
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         preview_data = uploaded_data.head().to_dict('records')
        
#         return jsonify({
#             "message": "File uploaded successfully",
#             "columns": uploaded_data.columns.tolist(),
#             "preview_data": preview_data
#         }), 200
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500

# @app.route('/save_template_AI', methods=['POST'])
# @login_required
# def save_template():
#     global subject_template, body_template
#     try:
#         data = request.get_json()
#         subject_template = data.get("subject")
#         body_template = data.get("body")
        
#         if not subject_template or not body_template:
#             return jsonify({"error": "Subject and body templates are required"}), 400
        
#         print(f"Template saved - Subject: {subject_template[:50]}...")
#         return jsonify({"message": "Templates saved successfully"}), 200
#     except Exception as e:
#         print(f"Template save error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# @app.route('/set_column_mapping_AI', methods=['POST'])
# @login_required
# def set_column_mapping():
#     global column_mapping
#     try:
#         column_mapping = request.get_json()
#         print(f"Column mapping saved: {column_mapping}")
#         return jsonify({"message": "Column mapping saved successfully"}), 200
#     except Exception as e:
#         print(f"Column mapping error: {str(e)}")
#         return jsonify({"error": str(e)}), 500

# def send_email_gmail(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.gmail.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Gmail.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Gmail to {recipient_email}: {str(e)}")
#         return False

# def send_email_outlook(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.office365.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Outlook.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Outlook to {recipient_email}: {str(e)}")
#         return False

# @app.route('/send_emails_AI', methods=['POST'])
# @login_required
# def send_emails():
#     global uploaded_data, subject_template, body_template

#     if uploaded_data.empty:
#         return jsonify({"error": "No data uploaded"}), 400
#     if not subject_template or not body_template:
#         return jsonify({"error": "Templates not saved"}), 400

#     try:
#         data = request.get_json()
#         email = data.get("email")
#         password = data.get("password")
#         email_type = data.get("type")

#         if not email or not password:
#             return jsonify({"error": "Email and password are required"}), 400

#         if email_type == "gmail":
#             smtp_server = "smtp.gmail.com"
#         elif email_type == "outlook":
#             smtp_server = "smtp.office365.com"
#         else:
#             return jsonify({"error": "Invalid email type"}), 400

#         def replace_placeholders(template, row):
#             for column in row.keys():
#                 placeholder = f"{{{column}}}"
#                 value = str(row[column])
#                 template = template.replace(placeholder, value)
#             return template

#         def generate_stream():
#             sent_count = 0
#             total = len(uploaded_data)

#             for _, row in uploaded_data.iterrows():
#                 try:
#                     personalized_subject = replace_placeholders(subject_template, row)
#                     personalized_body = replace_placeholders(body_template, row)

#                     config = {
#                         'email': email,
#                         'password': password,
#                         'provider': email_type
#                     }

#                     success = False
#                     if email_type == 'gmail':
#                         success = send_email_gmail(row[column_mapping['email']], personalized_subject, personalized_body, config)
#                     else:
#                         success = send_email_outlook(row[column_mapping['email']], personalized_subject, personalized_body, config)

#                     if success:
#                         sent_count += 1
#                         yield f"data: Emails sent: {sent_count}\n\n"
                    
#                     time.sleep(0.5)  # Rate limiting

#                 except Exception as e:
#                     print(f"Error sending email: {str(e)}")
#                     yield f"data: Error: {str(e)}\n\n"

#             yield "data: Campaign completed\n\n"

#         return Response(generate_stream(), content_type='text/event-stream')

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
#Srish aasdasdasdasdas asdasd

from flask import Flask, request, jsonify, session, Response
from flask_cors import CORS
import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
import time
import pymongo
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import logging
import re

# logging.basicConfig(level=logging.DEBUG)


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = secrets.token_hex(32)
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False  # Enable in production with HTTPS
app.config['SESSION_COOKIE_SAMESITE'] = 'Strict'
# app.logger.setLevel(logging.DEBUG)

# MongoDB connection setup
URI = "mongodb+srv://noreplyspearsoft:aHCc96K1lGXR3hOs@sst.avkqf.mongodb.net/?retryWrites=true&w=majority&appName=SS&TtlsAllowInvalidCertificates=true"
client = pymongo.MongoClient(URI)
db = client["SST_AI"]
user_collection = db["Users"]
session_collection = db["Sessions"]

# Global variables to store data
uploaded_data = None
subject_template = ""
body_template = ""
column_mapping = {}

@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'Welcome to SST AI'})

@app.route('/register_AI', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
        
    if user_collection.find_one({'email': data['email']}):
        return jsonify({'error': 'User already exists'}), 400
        
    hashed_password = generate_password_hash(data['password'])
    user = {
        'email': data['email'],
        'password': hashed_password,
        'name': data.get('name', ''),
        'created_at': datetime.utcnow()
    }
    
    result = user_collection.insert_one(user)
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login_AI', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
        
    user = user_collection.find_one({'email': data['email']})
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Create session
    session['user_id'] = str(user['_id'])
    session['email'] = user['email']
    
    return jsonify({
        'message': 'Login successful',
        'user': {
            'email': user['email'],
            'name': user.get('name', '')
        }
    }), 200

@app.route('/logout_AI', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/check-auth_AI', methods=['GET'])
def check_auth():
    if 'user_id' in session:
        user = user_collection.find_one({'_id': session['user_id']})
        if user:
            return jsonify({
                'authenticated': True,
                'user': {
                    'email': user['email'],
                    'name': user.get('name', '')
                }
            }), 200
    return jsonify({'authenticated': False}), 401

# @app.route('/upload_file_AI', methods=['POST'])
# def upload_file():
#     global uploaded_data
#     file = request.files.get('file')
    
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')): 
#             uploaded_data = pd.read_excel(file)
#         else:
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         preview_data = uploaded_data.head().to_dict('records')
        
#         return jsonify({
#             "message": "File uploaded successfully",
#             "columns": uploaded_data.columns.tolist(),
#             "preview_data": preview_data
#         }), 200
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500
# @app.route('/upload_file_AI', methods=['POST'])
# def upload_file():
#     global uploaded_data
#     file = request.files.get('file')
    
#     if not file:
#         app.logger.error("No file uploaded in request.")
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')):
#             uploaded_data = pd.read_excel(file)
#         else:
#             app.logger.error(f"Unsupported file format: {file.filename}")
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         preview_data = uploaded_data.head().to_dict('records')
#         app.logger.info("File uploaded successfully123.")
#         app.logger.info(f"Preview data: {preview_data}")
        
#         return jsonify({
#             "message": "File uploaded successfully",
#             "columns": uploaded_data.columns.tolist(),
#             "preview_data": preview_data
#         }), 200
#     except Exception as e:
#         app.logger.error(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500
#srish main
# @app.route('/upload_file_AI', methods=['POST'])
# # @login_required
# def upload_file():
#     global uploaded_data
#     file = request.files.get('file')
    
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     try:
#         if file.filename.endswith('.csv'):
#             uploaded_data = pd.read_csv(file)
#         elif file.filename.endswith(('.xlsx', '.xls')):
#             uploaded_data = pd.read_excel(file)
#         else:
#             return jsonify({"error": "Unsupported file format"}), 400

#         # Replace null values with 'NA'
#         uploaded_data = uploaded_data.fillna('NA')
        
#         # Store the data in session
#         session['file_uploaded'] = True
#         preview_data = uploaded_data.head().to_dict('records')
#         app.logger.info("File uploaded successfully123.")
#         # app.logger.info(f"Preview data: {preview_data}")
#         return jsonify({"message": "File uploaded successfully"}), 200
#     except Exception as e:
#         print(f"Upload error: {str(e)}")
#         return jsonify({"error": f"Failed to read file: {str(e)}"}), 500

# @app.route('/get_file_data_AI', methods=['GET'])
# # @login_required
# def get_file_data():
#     global uploaded_data
#     # uploaded_data = session.get('file_uploaded')
    
#     if uploaded_data is None or 'file_uploaded' not in session:
#         return jsonify({"error": "No file data available"}), 400
        
#     try:
#         preview_data = uploaded_data.head().to_dict('records')
#         columns = uploaded_data.columns.tolist()
#         app.logger.info(f"Columns: {columns}")
        
#         return jsonify({
#             "columns": columns,
#             "preview_data": preview_data,
#             "total_rows": len(uploaded_data)
#         }), 200
#     except Exception as e:
#         app.logger.info(f"Get file data error: {str(e)}")
#         return jsonify({"error": f"Failed to get file data: {str(e)}"}), 500

@app.route('/upload_file_AI', methods=['POST'])
def upload_file():
    global uploaded_data
    file = request.files.get('file')
    
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        if file.filename.endswith('.csv'):
            uploaded_data = pd.read_csv(file)
        elif file.filename.endswith(('.xlsx', '.xls')):
            uploaded_data = pd.read_excel(file)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        # Replace null values with 'NA'
        uploaded_data = uploaded_data.fillna('NA')
        
        # Store the data in session
        session['file_uploaded'] = True
        
        # Return preview data immediately
        preview_data = uploaded_data.head().to_dict('records')
        columns = uploaded_data.columns.tolist()
        total_rows = len(uploaded_data)
        
        return jsonify({
            "message": "File uploaded successfully",
            "columns": columns,
            "preview_data": preview_data,
            "total_rows": total_rows
        }), 200
        
    except Exception as e:
        app.logger.error(f"Upload error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/get_file_data_AI', methods=['GET'])
def get_file_data():
    global uploaded_data
    
    if uploaded_data is None or 'file_uploaded' not in session:
        return jsonify({"error": "No file data available"}), 400
        
    try:
        preview_data = uploaded_data.head().to_dict('records')
        columns = uploaded_data.columns.tolist()
        total_rows = len(uploaded_data)
        
        return jsonify({
            "columns": columns,
            "preview_data": preview_data,
            "total_rows": total_rows
        }), 200
    except Exception as e:
        app.logger.error(f"Get file data error: {str(e)}")
        return jsonify({"error": str(e)}), 500
@app.route('/save_template_AI', methods=['POST'])
def save_template():
    global subject_template, body_template
    try:
        data = request.get_json()
        subject_template = data.get("subject")
        body_template = data.get("body")
        
        if not subject_template or not body_template:
            return jsonify({"error": "Subject and body templates are required"}), 400
        
        print(f"Template saved - Subject: {subject_template[:50]}... Body: {body_template[:50]}...")
        return jsonify({"message": "Templates saved successfully"}), 200
    except Exception as e:
        print(f"Template save error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/set_column_mapping_AI', methods=['POST'])
def set_column_mapping():
    global column_mapping
    try:
        column_mapping = request.get_json()
        print(f"Column mapping saved: {column_mapping}")
        return jsonify({"message": "Column mapping saved successfully"}), 200
    except Exception as e:
        print(f"Column mapping error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# def send_email_gmail(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.gmail.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Gmail.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Gmail to {recipient_email}: {str(e)}")
#         return False

# def send_email_outlook(recipient_email, subject, body, config):
#     try:
#         smtp_server = "smtp.office365.com"
#         smtp_port = 587

#         sender_email = config['email']
#         sender_password = config['password']

#         message = MIMEMultipart()
#         message['From'] = sender_email
#         message['To'] = recipient_email
#         message['Subject'] = subject
#         message.attach(MIMEText(body, 'html'))

#         with smtplib.SMTP(smtp_server, smtp_port) as server:
#             server.starttls()
#             server.login(sender_email, sender_password)
#             server.send_message(message)

#         print(f"Email sent to {recipient_email} via Outlook.")
#         return True
#     except Exception as e:
#         print(f"Error sending email via Outlook to {recipient_email}: {str(e)}")
#         return False

# @app.route('/send_emails_AI', methods=['POST'])
# def send_emails():
#     global uploaded_data, subject_template, body_template

#     if uploaded_data.empty:
#         return jsonify({"error": "No data uploaded"}), 400
#     if not subject_template or not body_template:
#         return jsonify({"error": "Templates not saved"}), 400

#     try:
#         data = request.get_json()
#         app.logger.info(data)
#         email = data.get("email")
#         password = data.get("appPassword")
#         email_type = data.get("type")

#         if not email or not password:
#             return jsonify({"error": "Email and password are required"}), 400

#         if email_type == "gmail":
#             smtp_server = "smtp.gmail.com"
#         elif email_type == "outlook":
#             smtp_server = "smtp.office365.com"
#         else:
#             return jsonify({"error": "Invalid email type"}), 400

#         def replace_placeholders(template, row):
#             for column in row.keys():
#                 placeholder = f"{{{column}}}"
#                 value = str(row[column])
#                 template = template.replace(placeholder, value)
#             return template

#         def generate_stream():
#             sent_count = 0
#             total = len(uploaded_data)

#             for _, row in uploaded_data.iterrows():
#                 try:
#                     personalized_subject = replace_placeholders(subject_template, row)
#                     personalized_body = replace_placeholders(body_template, row)

#                     config = {
#                         'email': email,
#                         'password': password,
#                         'provider': email_type
#                     }

#                     success = False
#                     if email_type == 'gmail':
#                         success = send_email_gmail(row[column_mapping['email']], personalized_subject, personalized_body, config)
#                     else:
#                         success = send_email_outlook(row[column_mapping['email']], personalized_subject, personalized_body, config)

#                     if success:
#                         sent_count += 1
#                         yield f"data: Emails sent: {sent_count}\n\n"
                    
#                     time.sleep(0.5)  # Rate limiting

#                 except Exception as e:
#                     print(f"Error sending email: {str(e)}")
#                     yield f"data: Error: {str(e)}\n\n"

#             yield "data: Campaign completed\n\n"

#         return Response(generate_stream(), mimetype='text/event-stream')

#     except Exception as e:
#         print(f"Send emails error: {str(e)}")
#         return jsonify({"error": str(e)}), 500
def send_email_gmail(recipient_email, subject, body, config):
    try:
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        
        # Clean up the app password by removing non-breaking spaces
        password = re.sub(r'\xa0', '', config['password'])

        message = MIMEMultipart()
        message['From'] = config['email']
        message['To'] = recipient_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'html'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(config['email'], password)
            server.send_message(message)

        return True
    except Exception as e:
        app.logger.error(f"Error sending email via Gmail to {recipient_email}: {str(e)}")
        return False

def send_email_outlook(recipient_email, subject, body, config):
    try:
        smtp_server = "smtp.office365.com"
        smtp_port = 587

        # Clean up the app password by removing non-breaking spaces
        password = re.sub(r'\xa0', '', config['password'])

        message = MIMEMultipart()
        message['From'] = config['email']
        message['To'] = recipient_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'html'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(config['email'], password)
            server.send_message(message)

        return True
    except Exception as e:
        app.logger.error(f"Error sending email via Outlook to {recipient_email}: {str(e)}")
        return False

@app.route('/send_emails_AI', methods=['POST'])
def send_emails():
    global uploaded_data, subject_template, body_template, column_mapping

    if uploaded_data is None or uploaded_data.empty:
        return jsonify({"error": "No data uploaded"}), 400
    if not subject_template or not body_template:
        return jsonify({"error": "Templates not saved"}), 400
    if not column_mapping:
        return jsonify({"error": "Column mapping not set"}), 400

    try:
        data = request.get_json()
        app.logger.info(f"Received email config: {data}")
        
        email = data.get("email")
        password = data.get("appPassword")
        email_type = data.get("provider")
        app.logger.info(f"Email: {email}, Password: {password}, Email Type: {email_type}")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        if email_type not in ["gmail", "outlook"]:
            return jsonify({"error": "Invalid email type"}), 400

        def replace_placeholders(template, row):
            result = template
            for column in row.keys():
                placeholder = f"{{{column}}}"
                value = str(row[column])
                result = result.replace(placeholder, value)
            return result

        def generate_stream():
            sent_count = 0
            total = len(uploaded_data)

            for _, row in uploaded_data.iterrows():
                try:
                    recipient_email = row[column_mapping['email']]
                    if not recipient_email or pd.isna(recipient_email):
                        continue

                    personalized_subject = replace_placeholders(subject_template, row)
                    personalized_body = replace_placeholders(body_template, row)

                    config = {
                        'email': email,
                        'password': password
                    }

                    success = False
                    if email_type == 'gmail':
                        success = send_email_gmail(recipient_email, personalized_subject, personalized_body, config)
                    else:
                        success = send_email_outlook(recipient_email, personalized_subject, personalized_body, config)

                    if success:
                        sent_count += 1
                        yield f"data: Emails sent: {sent_count}\n\n"
                    
                    time.sleep(0.5)  # Rate limiting

                except Exception as e:
                    app.logger.error(f"Error sending email: {str(e)}")
                    yield f"data: Error: {str(e)}\n\n"

            yield "data: Campaign completed\n\n"

        return Response(generate_stream(), mimetype='text/event-stream')

    except Exception as e:
        app.logger.error(f"Send emails error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
    