import PIL.Image

def main():
    path = input("Enter the path to the image : \n")
    try:
        image = PIL.Image.open(path)

    except:
        print(path, "Unable to find image ");

    image = resize(image)
    image = to_greyscale(image)
    ascii_string = pixel_to_ascii(image)
    ascii_img = ""

    for i in range(0, len(ascii_string), image.width*2):
        ascii_img += ascii_string[i:i+image.width*2] + "\n"
    print(ascii_img)

ASCII_CHARS = ["@", "#", "%", "?", "*", "+", "!", ";", ":", ",", "`"]

def resize(image, new_width = 75):
    width, height = image.size
    new_height = new_width * height / width
    return image.resize((int(new_width), int(new_height)))

def to_greyscale(image):
    return image.convert("L")

def pixel_to_ascii(image):
    pixels = image.getdata()
    ascii_str = "";
    for pixel in pixels:
        ascii_str += ASCII_CHARS[pixel//25];
        ascii_str += ASCII_CHARS[pixel//25];
    return ascii_str


main()