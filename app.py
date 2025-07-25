import os, shutil
from flask import Flask, send_file

app = Flask(__name__)

@app.route('/download-zip')
def download_zip():
    folder = os.path.abspath(os.path.dirname(__file__))  # your project root
    zip_path = shutil.make_archive('course_catalyst_pro', 'zip', folder)
    return send_file(zip_path,
                     mimetype='application/zip',
                     as_attachment=True,
                     download_name='course_catalyst_pro.zip')
