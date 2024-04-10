import PIL.Image
import html
from flask import Flask, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_pymongo import PyMongo, MongoClient
import json

app = Flask(__name__)
CORS(app)

load_dotenv()

client = MongoClient(f"mongodb+srv://{os.getenv("DBUSER")}:{os.getenv("DBPASSWORD")}@cluster0.kqamisi.mongodb.net/")



@app.post('/register')
def register_user():
    if client.AsciiArtGenerator.Users.find_one({"UserId" : request.headers["UserId"]}) == None :
        client.AsciiArtGenerator.Users.insert_one({
        "UserId": request.headers["UserId"], 
        "UserName": request.headers["UserName"]
        })
    return json.dumps({"response": "ok"})


@app.post('/braille')
def get_braille():
    image = PIL.Image.open(request.files['File'])
    image = resize(image, int(request.args['width'])*2)
    image = to_greyscale(image)
    
    pixels = image.getdata()
    pixel_array = create_pixel_array(image, pixels)
    extended_pixel_array = pixel_array_extender(pixel_array,request.args['inverted'])
    binary_array = binary_array_creator(extended_pixel_array, int(request.args['brightness']))

    if request.args['inverted'] == 'true':
        binary_array = color_inverter(binary_array)

    binary_array_container = pixel_array_divider(binary_array)
    braille_string = braille_string_creator(binary_array_container, len(extended_pixel_array[0]), request.args['replace'])

    response = {"braille": braille_string}
    return json.dumps(response)

@app.post('/atkinson')
def get_atkinson():
    image = PIL.Image.open(request.files['File'])
    image = resize(image, int(request.args['width'])*2)
    image = to_greyscale(image)
    
    pixels = image.getdata()
    pixel_array = create_pixel_array(image, pixels)
    extended_pixel_array = pixel_array_extender(pixel_array,request.args['inverted'])
    binary_array = atkinson_binary_array_creator(extended_pixel_array, int(request.args['brightness']))

    if request.args['inverted'] == 'true':
        binary_array = color_inverter(binary_array)

    binary_array_container = pixel_array_divider(binary_array)
    braille_string = braille_string_creator(binary_array_container, len(extended_pixel_array[0]), request.args['replace'])

    response = {"atkinson": braille_string}
    return json.dumps(response)

@app.post('/ascii')
def get_ascii():
    image = PIL.Image.open(request.files['File'])
    image = resize(image, int(request.args['width']))
    image = to_greyscale(image)
    ascii_string = pixel_to_ascii(image, image.width)
    
    if request.args['inverted'] == 'true':
        ascii_string = inverted_pixel_to_ascii(image, image.width)
    
    response = {"ascii": ascii_string}
    return json.dumps(response)


ASCII_CHARS = ["@", "#", "$", "%", "?", "*", "+", ";", ":", ",", "."]


def resize(image, new_width):
    width, height = image.size
    new_height = new_width * height / width
    return image.resize((int(new_width), int(new_height)))


def to_greyscale(image):
    return image.convert("L")

def pixel_to_ascii(image, width):

    pixels = image.getdata()
    ascii_str = ""
    for pixel in pixels:
        ascii_str += ASCII_CHARS[(pixel//25)];
        ascii_str += ASCII_CHARS[(pixel//25)];

    ascii_img = ""

    for i in range(0, len(ascii_str), width * 2):
        ascii_img += ascii_str[i:i + width * 2] + "\n"

    return ascii_img

def inverted_pixel_to_ascii(image, width):

    pixels = image.getdata()
    ascii_str = ""
    for pixel in pixels:
        ascii_str += ASCII_CHARS[10-(pixel//25)];
        ascii_str += ASCII_CHARS[10-(pixel//25)];

    ascii_img = ""

    for i in range(0, len(ascii_str), width * 2):
        ascii_img += ascii_str[i:i + width * 2] + "\n"

    return ascii_img

def create_pixel_array(image, pixels):

    pixel_array = []
    row = 0
    column = 0

    for i in range(0, int(image.height)):
        pixel_array += [],

    for pixel in pixels:
        if column == image.width:
            row += 1
            column = 0
        pixel_array[row].append(pixel)
        column += 1
    return pixel_array


def pixel_array_row_creator(pixel_array, pixel_value):

    white_row = []
    for i in range(0, len(pixel_array[0])):
        white_row.append(pixel_value)
    return white_row


def pixel_array_extender(pixel_array, inverted):
    if inverted == 'true':
        pixel_value = 0
    else:
        pixel_value = 255

    for i in range(0, (4-(len(pixel_array) % 4))):
        pixel_array.append(pixel_array_row_creator(pixel_array,pixel_value))

    if len(pixel_array[0]) % 2 != 0:
        for row in pixel_array:
            row.append(pixel_value)

    return pixel_array


def binary_array_creator(pixel_array, brightness):

    binary_array = []

    for i in range(0, len(pixel_array)):
        binary_array.append([])

    for i in range(0, len(pixel_array)):
        for pixel in pixel_array[i]:
            if int(pixel) < brightness:
                binary_array[i].append(0)
            elif int(pixel) >= brightness:
                binary_array[i].append(1)

    return binary_array

def atkinson_binary_array_creator(pixel_array, brightness):

    binary_array = []

    for i in range(0, len(pixel_array)):
        binary_array.append([])

    for y in range(0, len(pixel_array)):
        for x in range(0,  len(pixel_array[y])):
            if int(pixel_array[y][x]) < brightness:
                binary_array[y].append(0)

                if len(pixel_array[y])-1 >= x+1:
                    pixel_array[y][x+1] += (1/8)*pixel_array[y][x]

                if len(pixel_array)-1 >= y+1:
                    pixel_array[y+1][x] += (1/8)*pixel_array[y][x]
                    pixel_array[y+1][x-1] += (1/8)*pixel_array[y][x] 
                    if len(pixel_array[y])-1 >= x+1:
                        pixel_array[y+1][x+1] += (1/8)*pixel_array[y][x]

                if len(pixel_array)-1 >= y+2:
                    pixel_array[y+2][x] += (1/8)*pixel_array[y][x]

                if len(pixel_array[y])-1 >= x+2:
                    pixel_array[y][x+2] += (1/8)*pixel_array[y][x]

            elif int(pixel_array[y][x]) >= brightness:
                binary_array[y].append(1)

                if len(pixel_array[y])-1 >= x+1:
                    pixel_array[y][x+1] += (1/8)*(255-pixel_array[y][x])

                if len(pixel_array)-1 >= y+1:    
                    pixel_array[y+1][x-1] += (1/8)*(255-pixel_array[y][x])
                    pixel_array[y+1][x] += (1/8)*(255-pixel_array[y][x])
                    if len(pixel_array[y])-1 >= x+1:
                        pixel_array[y+1][x+1] += (1/8)*(255-pixel_array[y][x])

                if len(pixel_array)-1 >= y+2:    
                    pixel_array[y+2][x] += (1/8)*(255-pixel_array[y][x])

                if len(pixel_array[y])-1 >= x+2:
                    pixel_array[y][x+2] += (1/8)*(255-pixel_array[y][x])

    return binary_array



def braille_character_printer(binary_array, replace_empty_char):

    html_entity_array = [1, 8, 2, 16, 4, 32, 64, 128]
    html_entity = 10240
    for i in range(0, 8):
        if binary_array[i] == 0:
            html_entity += html_entity_array[i]

    if replace_empty_char == 'true' and html_entity == 10240:
        html_entity= 10241

    return html.unescape("&#"+str(html_entity))


def pixel_array_divider(pixel_array):

    binary_array_container = []
    for r in range(0, len(pixel_array), 4):
        for c in range(0, len(pixel_array[r]), 2):
            counter = 0
            row = r
            while counter != 4:
                binary_array_container.append(pixel_array[row][c])
                binary_array_container.append(pixel_array[row][c+1])
                row += 1
                counter += 1
    return binary_array_container


def braille_string_creator(binary_array_container, width, replace_empty_char):
    braille_string = ""
    counter = 0
    for i in range(0, len(binary_array_container), 8):
        if counter == (width/2):
            braille_string += "\n"
            counter = 0
        braille_string += braille_character_printer(binary_array_container[i:i + 8], replace_empty_char)
        counter += 1
    return braille_string

def color_inverter(binary_array):
    
    inverted_binary_array = []

    for i in range(0, len(binary_array)):
        inverted_binary_array.append([])

    for i in range(0, len(binary_array)):
        for pixel in binary_array[i]:
            if pixel == 1 :
                inverted_binary_array[i].append(0)
            elif pixel == 0:
                inverted_binary_array[i].append(1)
    return  inverted_binary_array

if __name__ == '__main__':
    app.run(debug=True)

