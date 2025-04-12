from PIL import Image
import pytesseract

# Set the path to tesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Load your image
img = Image.open("./public/img/pic.jpg")

# Extract text
extracted_text = pytesseract.image_to_string(img)

# Print the result
print("Extracted Text:\n")
print(extracted_text)