import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract

# Set the path to Tesseract-OCR
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/image-to-text', methods=['POST'])
def image_to_text():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    try:
        # Save the uploaded image temporarily
        temp_path = "temp_image.jpg"
        image_file.save(temp_path)

        # Open the image and extract text
        img = Image.open(temp_path)
        extracted_text = pytesseract.image_to_string(img)

        # Clean up the temporary file
        os.remove(temp_path)

        return jsonify({'text': extracted_text})
    except Exception as e:
        # Clean up temp file in case of error
        if os.path.exists("temp_image.jpg"):
            os.remove("temp_image.jpg")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)