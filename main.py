import PIL.Image
import html


def main():
    path = input("Enter the path to the image : \n")
    try:
        image = PIL.Image.open(path)

    except:
        print(path, "Unable to find image ");
        return

    width = int(input("What should be the image width?"))

    if input("Braille or Ascii?") == "a":
        image = resize(image,width)
        image = to_greyscale(image)
        ascii_string = pixel_to_ascii(image)
        ascii_img = ""

        for i in range(0, len(ascii_string), image.width*2):
            ascii_img += ascii_string[i:i+image.width*2] + "\n"
        print(ascii_img)
        print("Use monospaceTypewriter font for it.")
    else:
        image = resize(image,width)
        image = to_greyscale(image)
        pixels = image.getdata()
        pixel_array = create_pixel_array(image,pixels)
        extended_pixel_array = pixel_array_extender(pixel_array)
        binary_array = binary_array_creator(extended_pixel_array)
        binary_array_container = pixel_array_divider(binary_array)
        braille_string = braille_string_creator(binary_array_container, len(extended_pixel_array[0]))

        print(braille_string)
        print("Use BlistaBraille font for it.")


ASCII_CHARS = ["@", "#", "$", "%", "?", "*", "+", ";", ":", ",", "."]


def resize(image, new_width):

    width, height = image.size
    new_height = new_width * height / width
    return image.resize((int(new_width), int(new_height)))


def to_greyscale(image):
    return image.convert("L")


def pixel_to_ascii(image):

    pixels = image.getdata()
    ascii_str = ""
    for pixel in pixels:
        ascii_str += ASCII_CHARS[(pixel//25)];
        ascii_str += ASCII_CHARS[(pixel//25)];

    return ascii_str


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


def pixel_array_row_creator(pixel_array):

    white_row = []
    for i in range(0, len(pixel_array[0])):
        white_row.append(255)
    return white_row


def pixel_array_extender(pixel_array):

    for i in range(0, (4-(len(pixel_array) % 4))):
        pixel_array.append(pixel_array_row_creator(pixel_array))

    if len(pixel_array[0]) % 2 != 0:
        for row in pixel_array:
            row.append(255)

    return pixel_array


def binary_array_creator(pixel_array):

    binary_array = []

    for i in range(0, len(pixel_array)):
        binary_array.append([])

    for i in range(0, len(pixel_array)):
        for pixel in pixel_array[i]:
            if int(pixel) < 128:
                binary_array[i].append(0)
            elif int(pixel) >= 128:
                binary_array[i].append(1)

    return binary_array


def braille_character_printer(binary_array):

    html_entity_array = [1, 8, 2, 16, 4, 32, 64, 128]
    html_entity = 10240
    for i in range(0, 8):
        if binary_array[0][i] == 0:
            html_entity += html_entity_array[i]

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


def braille_string_creator(binary_array_container, width):
    braille_string = ""
    counter = 0
    for i in range(0, len(binary_array_container), 8):
        if counter == (width/2):
            braille_string += "\n"
            counter = 0
        braille_string += braille_character_printer([binary_array_container[i:i + 8]])
        counter += 1
    return braille_string


main()

