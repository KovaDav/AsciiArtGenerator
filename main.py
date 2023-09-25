import PIL.Image
import html

def main():
    path = input("Enter the path to the image : \n")
    try:
        image = PIL.Image.open(path)

    except:
        print(path, "Unable to find image ");
        return

    if(input("Braille or Ascii?") == "a"):
        image = resize(image)
        image = to_greyscale(image)
        ascii_string = pixel_to_ascii(image)
        ascii_img = ""

        for i in range(0, len(ascii_string), image.width*2):
            ascii_img += ascii_string[i:i+image.width*2] + "\n"
        print(ascii_img)
    else:
        image = to_greyscale(image)
        pixels = image.getdata()
        pixel_array = create_pixel_array(image,pixels)

ASCII_CHARS = ["@", "#", "%", "?", "*", "+", "!", ";", ":", ",", "`"]

BRAILLE_CHARS = [
  '⠀', '⠁', '⠂', '⠃', '⠄', '⠅', '⠆', '⠇', '⠈', '⠉', '⠊', '⠋', '⠌', '⠍', '⠎', '⠏',
  '⠐', '⠑', '⠒', '⠓', '⠔', '⠕', '⠖', '⠗', '⠘', '⠙', '⠚', '⠛', '⠜', '⠝', '⠞', '⠟',
  '⠠', '⠡', '⠢', '⠣', '⠤', '⠥', '⠦', '⠧', '⠨', '⠩', '⠪', '⠫', '⠬', '⠭', '⠮', '⠯',
  '⠰', '⠱', '⠲', '⠳', '⠴', '⠵', '⠶', '⠷', '⠸', '⠹', '⠺', '⠻', '⠼', '⠽', '⠾', '⠿',
  '⡀', '⡁', '⡂', '⡃', '⡄', '⡅', '⡆', '⡇', '⡈', '⡉', '⡊', '⡋', '⡌', '⡍', '⡎', '⡏',
  '⡐', '⡑', '⡒', '⡓', '⡔', '⡕', '⡖', '⡗', '⡘', '⡙', '⡚', '⡛', '⡜', '⡝', '⡞', '⡟',
  '⡠', '⡡', '⡢', '⡣', '⡤', '⡥', '⡦', '⡧', '⡨', '⡩', '⡪', '⡫', '⡬', '⡭', '⡮', '⡯',
  '⡰', '⡱', '⡲', '⡳', '⡴', '⡵', '⡶', '⡷', '⡸', '⡹', '⡺', '⡻', '⡼', '⡽', '⡾', '⡿',
  '⢀', '⢁', '⢂', '⢃', '⢄', '⢅', '⢆', '⢇', '⢈', '⢉', '⢊', '⢋', '⢌', '⢍', '⢎', '⢏',
  '⢐', '⢑', '⢒', '⢓', '⢔', '⢕', '⢖', '⢗', '⢘', '⢙', '⢚', '⢛', '⢜', '⢝', '⢞', '⢟',
  '⢠', '⢡', '⢢', '⢣', '⢤', '⢥', '⢦', '⢧', '⢨', '⢩', '⢪', '⢫', '⢬', '⢭', '⢮', '⢯',
  '⢰', '⢱', '⢲', '⢳', '⢴', '⢵', '⢶', '⢷', '⢸', '⢹', '⢺', '⢻', '⢼', '⢽', '⢾', '⢿',
  '⣀', '⣁', '⣂', '⣃', '⣄', '⣅', '⣆', '⣇', '⣈', '⣉', '⣊', '⣋', '⣌', '⣍', '⣎', '⣏',
  '⣐', '⣑', '⣒', '⣓', '⣔', '⣕', '⣖', '⣗', '⣘', '⣙', '⣚', '⣛', '⣜', '⣝', '⣞', '⣟',
  '⣠', '⣡', '⣢', '⣣', '⣤', '⣥', '⣦', '⣧', '⣨', '⣩', '⣪', '⣫', '⣬', '⣭', '⣮', '⣯',
  '⣰', '⣱', '⣲', '⣳', '⣴', '⣵', '⣶', '⣷', '⣸', '⣹', '⣺', '⣻', '⣼', '⣽', '⣾', '⣿'
]


def resize(image, new_width=50):

    width, height = image.size
    new_height = new_width * height / width
    return image.resize((int(new_width), int(new_height)))


def to_greyscale(image):
    return image.convert("L")


def pixel_to_ascii(image):

    pixels = image.getdata()
    ascii_str = ""
    for pixel in pixels:
        ascii_str += ASCII_CHARS[pixel//25];
        ascii_str += ASCII_CHARS[pixel//25];

    return ascii_str


def create_pixel_array(image, pixels):

    pixel_array = []
    row = 0
    column = 1

    for i in range(0, int(image.height)):
        pixel_array += [],
    print(image.width)
    print(pixel_array)

    for pixel in pixels:
        if column % (image.width + 1) == 0:
            row += 1
            column = 1
        pixel_array[row].append(pixel)
        column += 1

    return pixel_array


def pixel_array_row_creator(pixel_array):

    black_row = []
    for i in range(0, len(pixel_array[0])):
        black_row.append(0)
    return black_row


def pixel_array_extender(pixel_array):

    for i in range(0, (4-(len(pixel_array) % 4))):
        pixel_array.append(pixel_array_row_creator(pixel_array))

    if len(pixel_array[0]) % 2 != 0:
        for row in pixel_array:
            row.append(0)

    return pixel_array

def binary_array_creator(pixel_array):

    binary_array = []
    for pixel in pixel_array:
        if pixel < 128:
            binary_array.append(0)
        elif pixel >= 128:
            binary_array.append(1)

    return binary_array

def braille_character_printer(binary_array):

    unicode_array = [1,2,4,40,8,10,20,80]
    html_entity = 10240
    for i in range(0, 8):
        if binary_array[i] == 0:
            html_entity += unicode_array[i]

    return html_entity


def pixel_array_divider(pixel_array):

    binary_array_container = []



main()